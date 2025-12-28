import { FinaryResponse, SavingsPortfolio, FinaryPeriod, Timeseries, TimeseriesType, Distribution, DistributionType, SavingsAccount, Transaction } from "../interfaces";
import { RequestHandler } from "./checkings";

export class SavingsClient {
    constructor(private requestHandler: RequestHandler) { }

    public async getPortfolio(organizationId: string, membershipId: string, period: FinaryPeriod = FinaryPeriod.YTD): Promise<SavingsPortfolio> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<SavingsPortfolio>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/savings?period=${period}`
        );
        return response.result;
    }

    public async getAccounts(organizationId: string, membershipId: string, period: FinaryPeriod = FinaryPeriod.YTD): Promise<SavingsAccount[]> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<SavingsAccount[]>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/savings/accounts?period=${period}`
        );
        return response.result;
    }

    public async getAccount(organizationId: string, membershipId: string, accountId: string, period: FinaryPeriod = FinaryPeriod.YTD): Promise<SavingsAccount> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<SavingsAccount>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/savings/accounts/${accountId}?period=${period}`
        );
        return response.result;
    }

    public async getAccountTimeseries(organizationId: string, membershipId: string, accountId: string, period: FinaryPeriod = FinaryPeriod.YTD, type: TimeseriesType = TimeseriesType.SUM): Promise<Timeseries[]> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<Timeseries[]>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/savings/accounts/${accountId}/timeseries?period=${period}&timeseries_type=${type}`
        );
        return response.result;
    }

    public async getTimeseries(organizationId: string, membershipId: string, period: FinaryPeriod = FinaryPeriod.YTD, type: TimeseriesType = TimeseriesType.SUM): Promise<Timeseries[]> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<Timeseries[]>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/savings/timeseries?period=${period}&timeseries_type=${type}`
        );
        return response.result;
    }

    public async getDistribution(organizationId: string, membershipId: string, type: DistributionType = DistributionType.ACCOUNT): Promise<Distribution> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<Distribution>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/savings/distribution?type=${type}`
        );
        return response.result;
    }
    public async getTransactions(organizationId: string, membershipId: string, page: number = 1, perPage: number = 50, query: string = '', accountId?: string): Promise<Transaction[]> {
        let url = `/organizations/${organizationId}/memberships/${membershipId}/portfolio/savings/transactions?page=${page}&per_page=${perPage}`;
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
