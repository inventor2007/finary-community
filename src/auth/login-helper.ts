import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';

export interface CreateSessionOptions {
    headless?: boolean;
    outputPath?: string;
}

export async function createSession(options: CreateSessionOptions = {}) {
    const { headless = false, outputPath } = options;

    console.log("------------------------------------------");
    console.log("   Finary Setup - Browser Login");
    console.log("------------------------------------------");

    if (outputPath) {
        // Ensure directory exists
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) {
            try {
                fs.mkdirSync(dir, { recursive: true });
            } catch (e: any) {
                throw new Error(`Error creating directory ${dir}: ${e.message}`);
            }
        }
        console.log(`Will save to: ${outputPath}`);
    }

    console.log("Launching browser for authentication...");

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: headless,
            defaultViewport: null,
            args: ['--start-maximized'] // Find browser window easier
        });
    } catch (e: any) {
        console.error("Failed to launch browser. Make sure you installed puppeteer: npm install puppeteer");
        throw e;
    }

    try {
        const page = await browser.newPage();

        await page.setRequestInterception(false); // Ensure interception does not block unless intended
        page.on('request', request => {
            const url = request.url();
            if (url.includes('clerk.finary.com')) {
                // Optional: log or handle clerk requests
            }
        });

        console.log("Navigating to Finary login page...");
        await page.goto('https://app.finary.com/v2', { waitUntil: 'domcontentloaded' });

        console.log("\nACTION REQUIRED: Please log in to your Finary account in the opened browser window.\n");
        console.log("Scanning network traffic for authentication token...");

        // Promise that resolves when the valid token is found
        const waitForToken = new Promise<{ token: string, headers: Record<string, string> }>((resolve) => {
            page.on('response', response => {
                const request = response.request();
                const url = request.url();

                // Filter API requests
                if (url.includes('api.finary.com') || url.includes('clerk.finary.com')) {
                    // We only want successful requests to ensure the token is valid
                    if (response.status() === 200) {
                        const headers = request.headers();
                        const auth = headers['authorization'];

                        if (auth && auth.startsWith('Bearer ey')) {
                            const token = auth.replace('Bearer ', '');
                            console.log("✅ Valid token successfully detected from successful request!");
                            resolve({ token, headers });
                        }
                    }
                }
            });
        });

        const { token, headers } = await waitForToken;

        console.log("Token detected! capturing cookies...");
        // Capture cookies for both the main app and the clerk subdomain to ensure we get __client, __session, etc.
        const cookies = await page.cookies('https://app.finary.com', 'https://clerk.finary.com');
        const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');

        const sessionCookie = cookies.find(c => c.name === '__session');
        const clerkSession = sessionCookie ? sessionCookie.value : null;

        if (cookieHeader) {
            console.log("✅ Cookies captured!");
        } else {
            console.warn("⚠️ No cookies found. Refresh verify might fail.");
        }

        console.log("Fetching user details...");

        // Use the token to identify the user
        let email = "unknown_user@example.com";
        try {
            const meResp = await fetch("https://api.finary.com/users/me", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "User-Agent": "Mozilla/5.0"
                }
            });

            if (meResp.ok) {
                const data = await meResp.json();
                if (data.result && data.result.email) {
                    email = data.result.email;
                    console.log(`Identified as: ${email}`);
                }
            }
        } catch (e: any) {
            console.warn("Could not fetch user email (minor issue), proceeding anyway.");
        }

        // Filter headers based on user request ("only these specific headers")
        const allowedHeaderKeys = [
            "sec-ch-ua-platform",
            "x-client-api-version",
            "referer",
            "accept-language",
            "sec-ch-ua",
            "sec-ch-ua-mobile",
            "user-agent",
            "x-finary-client-id",
            ":authority",
            ":method",
            ":scheme",
            "accept",
            "accept-encoding",
            "origin",
            "priority",
            "sec-fetch-dest",
            "sec-fetch-mode",
            "sec-fetch-site"
        ];

        const filteredHeaders: Record<string, string> = {};
        for (const key of allowedHeaderKeys) {
            if (headers[key]) {
                filteredHeaders[key] = headers[key];
            }
        }

        const credentialsData = {
            token: token,
            refreshUrl: "https://clerk.finary.com/v1/client/sessions",
            headers: filteredHeaders,
            clerkSession: clerkSession, // Kept for backward compatibility
            cookieHeader: cookieHeader,
        };

        if (outputPath) {
            const jsonContent = JSON.stringify(credentialsData, null, 4);
            try {
                fs.writeFileSync(outputPath, jsonContent);
                console.log(`[OK] Saved credentials to: ${outputPath}`);
            } catch (e: any) {
                console.error(`[ERR] Failed to save to ${outputPath}: ${e.message}`);
                throw e;
            }
        }

        console.log("\n------------------------------------------");
        console.log("SUCCESS! Setup complete.");
        console.log("------------------------------------------");

        return credentialsData;

    } finally {
        if (browser) await browser.close();
    }
}
