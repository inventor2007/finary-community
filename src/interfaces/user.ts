export interface FinaryResponse<T> {
    result: T;
    message: string;
    error: any;
}

export interface UserProfile {
    slug: string;
    firstname: string;
    lastname: string;
    fullname: string;
    email: string;
    country: string;
    birthdate: string | null;
    age: number | null;
    intercom_secure_hash: string;
    push_token: string | null;
    is_otp_enabled: boolean;
    is_beta_tester: boolean;
    last_user_sync_triggered_at: string;
    last_user_sync_at: string;
    last_asset_updated_at: string;
    referral_id: string;
    registration_platform: string;
    newsletter_subscribed: boolean;
    is_crowdfunding_preregistered: boolean;
    finary_investor_status: any | null;
    is_finary_crypto_client: boolean;
    is_finary_life_client: boolean;
    finary_one_status: any | null;
    finary_one_status_updated_at: any | null;
    bank_requests: any[];
    crypto_exchange_requests: any[];
    investor_profile: InvestorProfile;
    devices: any[];
    has_bi_account: boolean;
    is_organization_owner: boolean;
    verification_blocked_until: any | null;
    created_at: string;
    has_assets_ownership: boolean;
    has_indirect_assets_ownership: boolean;
    has_sync_accounts: boolean;
    has_transaction_accounts: boolean;
    access_level: string;
    plus_access: boolean;
    pro_access: boolean;
    lite_access: boolean;
    free_access: boolean;
    trial_access: boolean;
    subscription_status: string;
    is_a_godson: boolean;
    remaining_linked_institutions_count: number;
    webapp_emails_subscribed: boolean;
    is_crowdfunding_open: boolean;
    referral_status: any | null;
    can_connect_institution: boolean;
    restricted_holdings_account_manual_types: RestrictedHoldingsAccountManualTypes;
    credits: number;
    is_free_trial_available: boolean;
    onboarding_steps: OnboardingStep[];
    is_onboarding_completed: boolean;
    ui_configuration: UiConfiguration;
    questionnaires: Questionnaire[];
}

export interface InvestorProfile {
    monthly_salary: number;
    monthly_expenses: number;
    income_tax_rate: number;
    age: number | null;
    goal: string;
    wealth_range: string;
    asset_tracked: string[];
    investor_type: any | null;
    investor_level: string;
    employment_status: any | null;
    preferred_risk_rating: any | null;
    investments_lose_value_reaction: any | null;
    is_eligible_to_lep: boolean | null;
}

export interface RestrictedHoldingsAccountManualTypes {
    crypto: boolean;
    stocks: boolean;
    scpi: boolean;
    real_estate: boolean;
    other: boolean;
    commodities: boolean;
    startup: boolean;
    loan: boolean;
    crowdlending: boolean;
}

export interface OnboardingStep {
    step: string;
    state: string;
}

export interface UiConfiguration {
    information_banner_seen_version: number;
    wealth_display_mode: string;
    display_new_webapp_modal: boolean;
    konami_code: any | null;
    is_crypto_currency_display_enabled: boolean;
    has_seen_free_referral_modal: boolean;
    has_seen_download_app_modal: boolean;
    has_filled_invest_form: boolean;
    period_display_mode: string;
    display_mode: string;
    has_seen_family_onboarding: boolean;
    has_seen_finary_plus_onboarding: boolean;
    has_seen_invest_waitinglist_bottom_sheet: boolean;
    has_seen_ai_waitinglist_bottom_sheet: boolean;
    has_seen_assets_leaderboard_bottom_sheet: boolean;
    has_seen_life_insurance_waiting_list_bottom_sheet: boolean;
    has_seen_godson_reward_granted: boolean;
    hide_dust: boolean;
    financial_projection_parameters: any;
    investment_plans_count: number;
    selected_membership: SelectedMembership;
    is_membership_recursive: boolean;
    display_language: string;
    display_currency: DisplayCurrency;
    secret_mode: boolean;
}

export interface SelectedMembership {
    id: string;
    member_type: string;
    user: UserShortProfile;
    member: UserShortProfile;
}

export interface UserShortProfile {
    slug: string;
    firstname: string;
    lastname: string;
    fullname: string;
    email: string;
    country: string;
    intercom_secure_hash: string;
    is_organization_owner: boolean;
    verification_blocked_until: any | null;
    created_at: string;
    has_assets_ownership: boolean;
    has_indirect_assets_ownership: boolean;
    has_sync_accounts: boolean;
    has_transaction_accounts: boolean;
    access_level: string;
    plus_access: boolean;
    pro_access: boolean;
    lite_access: boolean;
    free_access: boolean;
    trial_access: boolean;
}

export interface DisplayCurrency {
    id: number;
    name: string;
    code: string;
    symbol: string;
    correlation_id: string;
    is_degraded: boolean;
    logo_url: string;
}

export interface Questionnaire {
    updated_at: string;
    id: number;
    questionnaire_type: string;
    questionnaire_attributes: any;
}
