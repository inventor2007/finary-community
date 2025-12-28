#!/usr/bin/env node
import path from 'node:path';
import readline from 'node:readline';
import { createSession } from '../auth/login-helper';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query: string): Promise<string> => {
    return new Promise((resolve) => rl.question(query, resolve));
};

(async () => {
    console.log("------------------------------------------");
    console.log("   Finary Stream Deck Plugin Setup Wizard");
    console.log("------------------------------------------");

    const defaultPath = path.join(process.cwd(), 'credentials.json');
    const userPath = await question(`Where to save credentials.json? (default: ${defaultPath}): `);
    const PREFS_LOCAL = userPath.trim() || defaultPath;

    try {
        await createSession({
            outputPath: PREFS_LOCAL
        });
        console.log("You can close this window now.");
    } catch (error) {
        console.error("Setup failed:", error);
        process.exit(1);
    } finally {
        rl.close();
        process.exit(0);
    }
})();
