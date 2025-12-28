import { PortfolioTotal } from './checking';
import { Institution, BankAccountType, FiatAsset, OwnershipRepartition } from './checking';
import { DisplayCurrency } from './user';

export enum InvestmentDistributionType {
    STOCK = 'stock'
}

export interface InvestmentPortfolio {
    total: PortfolioTotal;
    accounts: InvestmentAccount[];
    ownership_repartition: OwnershipRepartition[];
}

export interface DividendProjection {
    date: string;
    value: number;
}

export interface Dividend {
    amount: number;
    display_amount: number;
    payment_at: string;
    ex_dividend_at: string;
    currency: DisplayCurrency;
    display_currency: DisplayCurrency;
    status: string;
    asset: Security;
    asset_type: string;
    asset_subtype: string;
    type: string;
}


export interface DividendsResponse {
    annual_income: number;
    past_income: number;
    next_year: DividendProjection[];
    past_income_real_estate: number;
    annual_income_real_estate: number;
    past_income_etf: number;
    annual_income_etf: number;
    past_income_fund: number;
    annual_income_fund: number;
    past_income_equity: number;
    annual_income_equity: number;
    past_income_scpi: number;
    annual_income_scpi: number;
    yield: number;
    past_dividends: Dividend[];
    upcoming_dividends: Dividend[];
    yield_real_estate: number;
    next_year_real_estate: DividendProjection[];
    past_dividends_real_estate: Dividend[];
    upcoming_dividends_real_estate: Dividend[];
    yield_etf: number;
    next_year_etf: DividendProjection[];
    past_dividends_etf: Dividend[];
    upcoming_dividends_etf: Dividend[];
    yield_fund: number;
    next_year_fund: DividendProjection[];
    past_dividends_fund: Dividend[];
    upcoming_dividends_fund: Dividend[];
    yield_equity: number;
    next_year_equity: DividendProjection[];
    past_dividends_equity: Dividend[];
    upcoming_dividends_equity: Dividend[];
    yield_scpi: number;
    next_year_scpi: DividendProjection[];
    past_dividends_scpi: Dividend[];
    upcoming_dividends_scpi: Dividend[];
}

export interface SectorAllocationContribution {
    amount: number;
    asset: {
        id: number;
        correlation_id: string;
        name: string;
        logo_url: string;
    };
    asset_type: string;
    share: number;
}

export interface SectorAllocationDistribution {
    amount: number;
    label: string;
    share: number;
    distribution?: SectorAllocationDistribution[];
    contributions: SectorAllocationContribution[];
}

export interface SectorAllocationResponse {
    total: number;
    share: number;
    distribution: SectorAllocationDistribution[];
}

export interface GeographicalAllocationContribution {
    amount: number;
    asset: {
        id: number;
        correlation_id: string;
        name: string;
        logo_url: string;
    };
    asset_type: string;
    share: number;
}

export interface GeographicalAllocationDistribution {
    amount: number;
    label: string;
    share: number;
    distribution?: GeographicalAllocationDistribution[];
    contributions: GeographicalAllocationContribution[];
}

export interface GeographicalAllocationResponse {
    total: number;
    share: number;
    distribution: GeographicalAllocationDistribution[];
}

export interface FeeStructure {
    application_fees_ratio: number | null;
    initial_deposit_fees_ratio: number | null;
    additional_deposit_fees_ratio: number | null;
    planned_deposit_fees_ratio: number | null;
    management_fonds_euros_fees_ratio: number | null;
    management_securities_fees_ratio: number | null;
    management_scpis_fees_ratio: number | null;
    arbitration_fees_ratio: number | null;
    transaction_fees_ratio: number | null;
    annuity_fees_ratio: number | null;
    partial_buyback_fees_ratio: number | null;
    total_buyback_fees_ratio: number | null;
    planned_buyback_fees_ratio: number | null;
    profit_securing_fees_ratio: number | null;
    loss_limiting_fees_ratio: number | null;
    death_benefits_fees_ratio: number | null;
    management_style_change_fees_ratio: number | null;
    application_fees_percent: number | null;
    initial_deposit_fees_percent: number | null;
    additional_deposit_fees_percent: number | null;
    planned_deposit_fees_percent: number | null;
    management_fonds_euros_fees_percent: number | null;
    management_securities_fees_percent: number | null;
    management_scpis_fees_percent: number | null;
    arbitration_fees_percent: number | null;
    transaction_fees_percent: number | null;
    annuity_fees_percent: number | null;
    partial_buyback_fees_percent: number | null;
    total_buyback_fees_percent: number | null;
    planned_buyback_fees_percent: number | null;
    profit_securing_fees_percent: number | null;
    loss_limiting_fees_percent: number | null;
    death_benefits_fees_percent: number | null;
    management_style_change_fees_percent: number | null;
}

export interface FeeContract {
    id: string;
    name: string;
    correlation_id: string;
    insurer: string | null;
    management_style: string | null;
    management_offer: string | null;
    institution: Institution;
    bank_account_type: BankAccountType;
    fees: FeeStructure;
    maximum_deposit: number | null;
    interest_rate: number | null;
    is_degraded: boolean;
}

export interface FeesData {
    contract: FeeContract;
    timeseries: [string, number, number][];
    cumulated_potential_savings_amount: number;
    cumulated_potential_savings_percent: number;
    cumulated_potential_amount: number;
}

export interface FeesSummary {
    cumulated_fees_amount: number;
    cumulated_fees_percent: number;
    annual_fees_amount: number;
    annual_fees_percent: number;
    cumulated_amount: number;
}

export interface FeesResponse {
    total: FeesSummary;
    data: FeesData[];
    is_portfolio_optimized: boolean;
}

export interface AnnualFeesBreakdown {
    assets_fees: number;
    assets_fees_percent: number;
    securities_contract_fees: number;
    securities_contract_fees_percent: number;
    scpis_contract_fees: number | null;
    scpis_contract_fees_percent: number | null;
    fonds_euro_contract_fees: number | null;
    fonds_euro_contract_fees_percent: number | null;
}

export interface FeeAccountSummary {
    slug: string;
    name: string;
    connection_id: string | null;
    state: string | null;
    state_message: string | null;
    correlation_id: string;
    iban: string | null;
    bic: string | null;
    opened_at: string | null;
    id: string;
    manual_type: string | null;
    logo_url: string;
    created_at: string;
    annual_fees: number;
    annual_fees_percent: number;
    bank_account_type: BankAccountType;
    contract: FeeContract;
    has_lowest_fees_for_category: boolean;
    annual_fees_breakdown: AnnualFeesBreakdown;
}

export interface AccountFeesResponse {
    total: FeesSummary;
    data: FeesData[];
    account: FeeAccountSummary;
    is_portfolio_optimized: boolean;
}

export interface InvestmentAccount {
    slug: string;
    name: string;
    connection_id: string | null;
    state: string | null;
    state_message: string | null;
    correlation_id: string;
    iban: string | null;
    bic: string | null;
    opened_at: string | null;
    id: string;
    manual_type: string | null;
    logo_url: string;
    created_at: string;
    annual_yield: number | null;
    balance: number;
    display_balance: number;
    organization_balance: number;
    display_organization_balance: number;
    upnl: number;
    display_upnl: number;
    current_upnl: number;
    display_current_upnl: number;
    unrealized_pnl: number;
    display_unrealized_pnl: number;
    evolution: number;
    display_evolution: number;
    period_evolution: number;
    display_period_evolution: number;
    upnl_difference: number;
    display_upnl_difference: number;
    value_difference: number;
    display_value_difference: number;
    last_sync_at: string | null;
    last_successful_sync_at: string | null;
    last_provider_update_at: string | null;
    last_sync: string | null;
    is_manual: boolean;
    currency: DisplayCurrency;
    display_currency: DisplayCurrency;
    contract: any; // Simplified for now, can be detailed if needed
    transactions_count: number;
    bank_account_type: BankAccountType;
    current_upnl_percent: number;
    display_current_upnl_percent: number;
    unrealized_pnl_percent: number;
    evolution_percent: number;
    period_evolution_percent: number;
    upnl_evolution: number | null;
    display_upnl_evolution: number | null;
    upnl_percent: number;
    display_upnl_percent: number;
    value_evolution: number;
    display_value_evolution: number;
    ownership_repartition: OwnershipRepartition[];
    in_investment_plan: boolean;
    has_transactions: boolean;
    category: string;
    bank: Institution;
    institution: Institution;
    institution_connection: any | null;
    provider_connection: any | null;
    source: string | null;
    fiats: FiatAsset[];
    securities: InvestmentSecurity[];
    cryptos: any[];
    fonds_euro: any[];
    startups: any[];
    precious_metals: any[];
    scpis: any[];
    generic_assets: any[];
}

export interface InvestmentSecurity {
    correlation_id: string | null;
    current_value: number;
    display_current_value: number;
    current_upnl: number;
    display_current_upnl: number;
    unrealized_pnl: number;
    display_unrealized_pnl: number;
    evolution: number;
    display_evolution: number;
    period_evolution: number;
    display_period_evolution: number;
    upnl_difference: number;
    display_upnl_difference: number;
    value_difference: number;
    display_value_difference: number;
    buying_price: number;
    display_buying_price: number;
    buying_value: number;
    display_buying_value: number;
    id: number;
    current_upnl_percent: number;
    display_current_upnl_percent: number;
    evolution_percent: number;
    unrealized_pnl_percent: number;
    period_evolution_percent: number;
    upnl_evolution: number | null;
    display_upnl_evolution: number | null;
    upnl_percent: number;
    display_upnl_percent: number;
    value_evolution: number;
    display_value_evolution: number;
    in_investment_plan: boolean;
    quantity: number;
    security: Security;
    is_reported: boolean;
}

export interface Security {
    id: number;
    correlation_id: string;
    name: string;
    logo_url: string;
    isin: string;
    slug: string;
    symbol: string;
    security_type: string;
    current_price: number;
    display_current_price: number;
    subscription_fees_ratio: number | null;
    expense_ratio: number | null;
    currency: DisplayCurrency;
    display_currency: DisplayCurrency;
    has_lowest_fees_for_category: boolean | null;
    has_lowest_fees_for_category_in_pea: boolean | null;
    is_degraded: boolean;
}
