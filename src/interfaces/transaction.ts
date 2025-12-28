import { DisplayCurrency } from './user';
import { Institution } from './checking';

export interface Transaction {
    id: number;
    name: string;
    simplified_name: string;
    stemmed_name: string;
    display_name: string;
    correlation_id: string;
    date: string;
    display_date: string;
    value: number;
    display_value: number;
    transaction_type: string;
    commission: number | null;
    external_id_category: number;
    currency: DisplayCurrency;
    institution: TransactionInstitution;
    account: TransactionAccount;
    include_in_analysis: boolean;
    is_internal_transfer: boolean;
    marked: boolean;
    transaction_rule: any | null;
    category: TransactionCategory;
    subcategory: TransactionCategory | null;
}

export interface TransactionInstitution extends Institution {
    providers: TransactionProvider[];
}

export interface TransactionProvider {
    correlation_id: string;
    id: string;
    capabilities: string[];
    status: string;
    is_synchronization_enabled: boolean;
    is_enabled: boolean;
    manual_sync: boolean;
    sources: string[];
    provider: {
        correlation_id: string;
        name: string;
    };
    account_types: any[];
    accounts: any[];
    cash_accounts_count: number;
    investment_accounts_count: number;
    incident: any | null;
    monitoring: {
        success_rate: number | null;
        warning_threshold: number;
        alert_threshold: number;
    };
}

export interface TransactionAccount {
    slug: string;
    name: string;
    connection_id: string;
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
}

export interface TransactionCategory {
    id: number;
    name: string;
    color: string;
    icon: string;
    is_custom: boolean;
    main_category_id: number | null;
    is_subcategory: boolean;
    subcategories: TransactionCategory[];
}
