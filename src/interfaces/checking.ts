import { DisplayCurrency } from './user';

export interface CheckingAccount {
    id: string;
    slug: string;
    name: string;
    manual_type: string | null;
    balance: number;
    display_balance: number;
    organization_balance: number;
    display_organization_balance: number;
    share: number;
    last_sync_at: string;
    is_manual: boolean;
    currency: DisplayCurrency;
    display_currency: DisplayCurrency;
    transactions_count: number;
    bank_account_type: BankAccountType;
    bank: Institution;
    institution: Institution;
    fiats: FiatAsset[];
    ownership_repartition: OwnershipRepartition[];
}

export interface CheckingPortfolio {
    total: PortfolioTotal;
    accounts: CheckingAccount[];
    ownership_repartition: OwnershipRepartition[];
}

export interface PortfolioTotal {
    amount: number;
    evolution: number;
    period_evolution: number;
    display_amount: number;
    display_upnl_difference: number;
    display_value_difference: number;
    display_value_evolution: number | null;
    evolution_percent: number;
    period_evolution_percent: number | null;
    display_upnl_percent: number;
}

export interface BankAccountType {
    id: string;
    slug: string;
    account_type: string;
    subtype: string;
    name: string;
    display_name: string;
}

export interface Institution {
    id: string;
    slug: string;
    name: string;
    countries: string[];
    logo_url: string;
    is_finary_plus_only: boolean;
    is_international: boolean;
}

export interface FiatAsset {
    id: string;
    current_value: number;
    display_current_value: number;
    quantity: number;
    current_price: number;
    fiat: DisplayCurrency;
}

export interface OwnershipRepartition {
    share: number;
    is_indirect: boolean;
    membership: {
        id: string;
        member_type: string;
        member: {
            slug: string;
            firstname: string;
            lastname: string;
            fullname: string;
        };
    };
}
