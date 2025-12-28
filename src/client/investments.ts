import { FinaryResponse, InvestmentPortfolio, FinaryPeriod, Timeseries, TimeseriesType, Distribution, InvestmentDistributionType, DividendsResponse, SectorAllocationResponse, GeographicalAllocationResponse, FeesResponse, InvestmentAccount, AccountFeesResponse } from "../interfaces";
import { RequestHandler } from "./checkings";

export class InvestmentClient {
    constructor(private requestHandler: RequestHandler) { }

    public async getPortfolio(organizationId: string, membershipId: string, period: FinaryPeriod = FinaryPeriod.YTD): Promise<InvestmentPortfolio> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<InvestmentPortfolio>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/investments?period=${period}`
        );
        return response.result;
    }

    public async getTimeseries(organizationId: string, membershipId: string, period: FinaryPeriod = FinaryPeriod.YTD, type: TimeseriesType = TimeseriesType.SUM): Promise<Timeseries[]> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<Timeseries[]>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/investments/timeseries?period=${period}&timeseries_type=${type}`
        );
        return response.result;
    }

    public async getDistribution(organizationId: string, membershipId: string, type: InvestmentDistributionType = InvestmentDistributionType.STOCK, period: FinaryPeriod = FinaryPeriod.YTD): Promise<Distribution> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<Distribution>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/investments/distribution?type=${type}&period=${period}`
        );
        return response.result;
    }

    public async getDividends(organizationId: string, membershipId: string, withRealEstate: boolean = true): Promise<DividendsResponse> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<DividendsResponse>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/investments/dividends?with_real_estate=${withRealEstate}`
        );
        return response.result;
    }

    public async getSectorAllocation(organizationId: string, membershipId: string): Promise<SectorAllocationResponse> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<SectorAllocationResponse>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/investments/sector_allocation`
        );
        return response.result;
    }

    public async getGeographicalAllocation(organizationId: string, membershipId: string): Promise<GeographicalAllocationResponse> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<GeographicalAllocationResponse>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/investments/geographical_allocation`
        );
        return response.result;
    }

    public async getFees(organizationId: string, membershipId: string): Promise<FeesResponse> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<FeesResponse>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/investments/fees?new_format=true`
        );
        return response.result;
    }

    public async getAccount(organizationId: string, membershipId: string, accountId: string, period: FinaryPeriod = FinaryPeriod.YTD): Promise<InvestmentAccount> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<InvestmentAccount>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/investments/accounts/${accountId}?period=${period}`
        );
        return response.result;
    }

    public async getAccountTimeseries(organizationId: string, membershipId: string, accountId: string, period: FinaryPeriod = FinaryPeriod.YTD, type: TimeseriesType = TimeseriesType.SUM): Promise<Timeseries[]> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<Timeseries[]>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/investments/accounts/${accountId}/timeseries?period=${period}&timeseries_type=${type}`
        );
        return response.result;
    }

    public async getAccountDistribution(organizationId: string, membershipId: string, accountId: string, type: InvestmentDistributionType = InvestmentDistributionType.STOCK, period: FinaryPeriod = FinaryPeriod.YTD): Promise<Distribution> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<Distribution>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/investments/accounts/${accountId}/distribution?type=${type}&period=${period}`
        );
        return response.result;
    }

    public async getAccountDividends(organizationId: string, membershipId: string, accountId: string, withRealEstate: boolean = true): Promise<DividendsResponse> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<DividendsResponse>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/investments/accounts/${accountId}/dividends?with_real_estate=${withRealEstate}`
        );
        return response.result;
    }

    public async getAccountSectorAllocation(organizationId: string, membershipId: string, accountId: string): Promise<SectorAllocationResponse> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<SectorAllocationResponse>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/investments/accounts/${accountId}/sector_allocation`
        );
        return response.result;
    }

    public async getAccountGeographicalAllocation(organizationId: string, membershipId: string, accountId: string): Promise<GeographicalAllocationResponse> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<GeographicalAllocationResponse>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/investments/accounts/${accountId}/geographical_allocation`
        );
        return response.result;
    }

    public async getAccountFees(organizationId: string, membershipId: string, accountId: string): Promise<AccountFeesResponse> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<AccountFeesResponse>>(
            `/organizations/${organizationId}/memberships/${membershipId}/portfolio/investments/accounts/${accountId}/fees?new_format=true`
        );
        return response.result;
    }
}
