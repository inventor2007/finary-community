export interface Credentials {
    password?: string;
    token?: string;
    refreshUrl?: string;
    headers?: Record<string, string>;
    clerkSession?: string;
    cookieHeader?: string;
}

export interface AuthConfig {
    credentialsPath: string;
}

export * from './common';
export * from './user';
export * from './user';
export * from './organization';
export * from './checking';
export * from './timeseries';
export * from './distribution';
export * from './transaction';
export * from './benchmark';
export * from './investment';
export * from './savings';
