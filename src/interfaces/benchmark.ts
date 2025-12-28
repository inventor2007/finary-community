export interface BenchmarkAsset {
    id: string;
    name: string;
    isin: string | null;
    url: string;
    period_evolution: number;
    period_evolution_percent: number;
    display_value_difference: number;
    display_value_evolution: number;
}
