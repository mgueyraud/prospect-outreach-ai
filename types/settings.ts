export type UserConfiguration = {
    clerk_user_id: string;
    company_name?: string | null;
    company_industry?: string | null;
    company_size?: string | null;
    company_description?: string | null;
    company_value_proposition?: string | null;
    company_website?: string | null;
    email_tone?: "professional" | string;
    linkedin_tone?: "conversational" | string;
    twitter_tone?: "casual" | string;
    message_tone?: "friendly" | string;
    created_at?: string; // ISO 8601 timestamp
    updated_at?: string; // ISO 8601 timestamp
};