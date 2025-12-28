export interface Timeseries {
    label: string;
    period_evolution_percent: number;
    timeseries: [string, number][];
    period_evolution: number;
    display_value_difference: number;
    display_value_evolution: number;
    balance: number;
}
