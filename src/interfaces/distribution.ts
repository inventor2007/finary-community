export interface DistributionItem {
    amount: number;
    label: string;
    share: number;
}

export interface Distribution {
    total: number;
    distribution: DistributionItem[];
}
