import { AuthManager } from "../auth/auth-manager";
import { CheckingClient } from "./checkings";
import { BenchmarkClient } from "./benchmarks";
import { InvestmentClient } from "./investments";
import { SavingsClient } from "./savings";
import { AuthConfig, FinaryResponse, UserProfile, Organization, CheckingAccount, CheckingPortfolio, FinaryPeriod, Timeseries, TimeseriesType, Distribution, DistributionType, Transaction } from "../interfaces";

const API_BASE = "https://api.finary.com";

export class FinaryClient {
    private auth: AuthManager;
    public checkings: CheckingClient;
    public benchmarks: BenchmarkClient;
    public investments: InvestmentClient;
    public savings: SavingsClient;

    constructor(config: AuthConfig) {
        this.auth = new AuthManager(config);
        this.checkings = new CheckingClient(this);
        this.benchmarks = new BenchmarkClient(this);
        this.investments = new InvestmentClient(this);
        this.savings = new SavingsClient(this);
    }

    public async authenticatedRequest<T>(endpoint: string, method: string = "GET", body?: any): Promise<T> {
        let token = await this.auth.getToken();

        const makeReq = async (t: string) => {
            const creds = this.auth.getCredentials();
            const headers: Record<string, string> = {
                ...(creds.headers || {}),
                "Authorization": `Bearer ${t}`,
                "Content-Type": "application/json"
            };

            // Cleanup headers
            delete headers['content-length'];
            delete headers['host'];
            delete headers['connection'];
            delete headers['cookie'];
            Object.keys(headers).forEach(k => { if (k.startsWith(':')) delete headers[k]; });

            const options: RequestInit = {
                method: method,
                headers: headers
            };

            if (body) {
                options.body = JSON.stringify(body);
            }

            return await fetch(`${API_BASE}${endpoint}`, options);
        };

        let response = await makeReq(token);

        if (response.status === 401) {
            console.warn("401 Received, refreshing token...");
            try {
                token = await this.auth.refreshToken();
                response = await makeReq(token);
            } catch (e) {
                console.error(`Refresh failed: ${e}`);
                throw e;
            }
        }

        if (!response.ok) {
            throw new Error(`Request to ${endpoint} failed: ${response.status}`);
        }

        return (await response.json()) as T;
    }

    public async getUserProfile(): Promise<UserProfile> {
        const response = await this.authenticatedRequest<FinaryResponse<UserProfile>>('/users/me');
        return response.result;
    }

    public async getOrganizations(): Promise<Organization[]> {
        const response = await this.authenticatedRequest<FinaryResponse<Organization[]>>('/users/me/organizations');
        return response.result;
    }
}
