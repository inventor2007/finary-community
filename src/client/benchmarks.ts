import { FinaryResponse, BenchmarkAsset, FinaryPeriod } from "../interfaces";
import { RequestHandler } from "./checkings";

export class BenchmarkClient {
    constructor(private requestHandler: RequestHandler) { }

    public async getAvailableAssets(organizationId: string, membershipId: string, period: FinaryPeriod = FinaryPeriod.YTD): Promise<BenchmarkAsset[]> {
        const response = await this.requestHandler.authenticatedRequest<FinaryResponse<BenchmarkAsset[]>>(
            `/organizations/${organizationId}/memberships/${membershipId}/benchmarks/available_assets?period=${period}`
        );
        return response.result;
    }
}
