export type Prospect = {
    clerk_user_id: string;
    contact_email: string;
    contact_person: string;
    contact_phone: string;
    contact_title: string;
    created_at: string; // ISO 8601 timestamp
    id: string; // UUID
    industry: string;
    name: string;
    notes?: string | null;
    size: string;
    updated_at: string; // ISO 8601 timestamp
    website?: string | null;
};