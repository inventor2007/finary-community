import { readFileSync, existsSync } from "node:fs";
import { AuthConfig, Credentials } from "../interfaces";

export class AuthManager {
    private token: string | null = null;
    private credentialsPath: string;
    private cachedCredentials: Credentials | null = null;

    constructor(config: AuthConfig) {
        this.credentialsPath = config.credentialsPath;
    }

    private loadCredentials(): Credentials {
        if (this.cachedCredentials) return this.cachedCredentials;

        if (existsSync(this.credentialsPath)) {
            try {
                const data = readFileSync(this.credentialsPath, "utf-8");
                this.cachedCredentials = JSON.parse(data) as Credentials;
                return this.cachedCredentials;
            } catch (e) {
                console.error(`Failed to parse credentials at ${this.credentialsPath}: ${e}`);
            }
        }

        throw new Error(`credentials.json not found at ${this.credentialsPath}`);
    }

    public async getToken(): Promise<string> {
        if (this.token) return this.token;

        const creds = this.loadCredentials();
        if (creds.token) {
            this.token = creds.token;
            return this.token;
        }

        throw new Error("No token found in credentials.");
    }

    public getCredentials(): Credentials {
        return this.loadCredentials();
    }

    public async refreshToken(): Promise<string> {
        const creds = this.loadCredentials();

        // 1. Clerk Refresh
        if (creds.clerkSession && this.token) {
            try {
                const decoded = this.parseJwt(this.token);
                const sessionId = decoded ? decoded.sid : null;

                if (sessionId) {
                    const clerkUrl = `https://clerk.finary.com/v1/client/sessions/${sessionId}/tokens?__clerk_api_version=2025-11-10&_clerk_js_version=5.117.0`;
                    const cookieHeader = creds.cookieHeader || `__session=${creds.clerkSession}`;

                    const response = await fetch(clerkUrl, {
                        method: "POST",
                        headers: {
                            "Cookie": cookieHeader,
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Origin": "https://app.finary.com",
                            "Referer": "https://app.finary.com/",
                            "User-Agent": creds.headers?.['user-agent'] || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36"
                        },
                        body: "organization_id="
                    });

                    if (response.ok) {
                        const data = (await response.json()) as any;
                        if (data && data.jwt) {
                            this.token = data.jwt;
                            return this.token as string;
                        }
                    } else {
                        console.warn(`Clerk refresh failed: ${response.status}`);
                    }
                }
            } catch (e) {
                console.error(`Clerk refresh error: ${e}`);
            }
        }

        // 2. Legacy Refresh
        if (!creds.refreshUrl || !creds.headers) {
            throw new Error("Missing info to refresh token (legacy).");
        }

        try {
            const headers: Record<string, string> = { ...creds.headers };
            // Cleanup headers manually since we can't use arbitrary types easily on headers object
            delete headers['content-length'];
            delete headers['host'];
            delete headers['connection'];
            delete headers['origin'];
            delete headers['referer'];
            delete headers['cookie'];

            Object.keys(headers).forEach(key => { if (key.startsWith(':')) delete headers[key]; });

            const response = await fetch(creds.refreshUrl, {
                method: "POST",
                headers: headers,
            });

            if (!response.ok) {
                throw new Error(`Legacy refresh failed: ${response.status}`);
            }

            const data = (await response.json()) as any;
            if (data && data.jwt) {
                this.token = data.jwt;
                return this.token as string;
            }
            throw new Error("No JWT in refresh response");

        } catch (e) {
            console.error(`Token Refresh Error: ${e}`);
            throw e;
        }
    }

    private parseJwt(token: string): any {
        try {
            return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        } catch {
            return null;
        }
    }
}
