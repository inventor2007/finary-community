import { FinaryResponse, CheckingAccount, CheckingPortfolio, FinaryPeriod, Timeseries, TimeseriesType, Distribution, DistributionType, Transaction } from "../interfaces";

export interface RequestHandler {
    authenticatedRequest<T>(endpoint: string, method?: string, body?: any): Promise<T>;
}

export class CheckingClient {
    constructor(private requestHandler: RequestHandler) { }

    public async getAccounts(organizationId: string, membershipId: string, period: FinaryPeriod = FinaryPeriod.ALL): Promise<CheckingAccount[]> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<CheckingAccount[]>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/checkings/accounts?period=${period}`
        );
        return response.result;
    }

    public async getAccount(organizationId: string, membershipId: string, accountId: string, period: FinaryPeriod = FinaryPeriod.ALL): Promise<CheckingAccount> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<CheckingAccount>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/checkings/accounts/${accountId}?period=${period}`
        );
        return response.result;
    }

    public async getPortfolio(organizationId: string, membershipId: string, period: FinaryPeriod = FinaryPeriod.ALL): Promise<CheckingPortfolio> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<CheckingPortfolio>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/checkings?period=${period}`
        );
        return response.result;
    }

    public async getTimeseries(organizationId: string, membershipId: string, period: FinaryPeriod = FinaryPeriod.YTD, type: TimeseriesType = TimeseriesType.SUM): Promise<Timeseries[]> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<Timeseries[]>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/checkings/timeseries?period=${period}&timeseries_type=${type}`
        );
        return response.result;
    }

    public async getAccountTimeseries(organizationId: string, membershipId: string, accountId: string, period: FinaryPeriod = FinaryPeriod.YTD, type: TimeseriesType = TimeseriesType.SUM): Promise<Timeseries[]> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<Timeseries[]>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/checkings/accounts/${accountId}/timeseries?period=${period}&timeseries_type=${type}`
        );
        return response.result;
    }

    public async getDistribution(organizationId: string, membershipId: string, type: DistributionType = DistributionType.ACCOUNT): Promise<Distribution> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<Distribution>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/checkings/distribution?type=${type}`
        );
        return response.result;
    }

    public async getTransactions(organizationId: string, membershipId: string, page: number = 1, perPage: number = 50, query: string = '', accountId?: string): Promise<Transaction[]> {
        let url = `/organizations/${organizationId}/memberships/${membershipId}/portfolio/checkings/transactions?page=${page}&per_page=${perPage}`;
        if (query) {
            url += `&query=${encodeURIComponent(query)}`;
        }
        if (accountId) {
            url += `&account_id=${accountId}`;
        }
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<Transaction[]>>(url);
        return response.result;
    }
}
