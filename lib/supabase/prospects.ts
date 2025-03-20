"use server";

import { auth } from "@clerk/nextjs/server";
import { createClient } from "./server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserConfiguration } from "@/types/settings";
import { Prospect } from "@/types/prospect";
import { revalidatePath } from "next/cache";

export async function getProspects(): Promise<Prospect[]> {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { userId } = await auth();

    const { data, error } = await supabase
        .from('prospects')
        .select()
        .eq('clerk_user_id', userId);

    if(error) {
        throw error;
    }

    return data;
}

export async function createProspect(formData: FormData) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { userId } = await auth();

    const prospectData = {
        clerk_user_id: userId,
        name: formData.get('name'),
        industry: formData.get('industry'),
        size: formData.get('size'),
        website: formData.get('website'),
        contact_person: formData.get('contactPerson'),
        contact_title: formData.get('contactTitle'),
        contact_email: formData.get('contactEmail'),
        contact_phone: formData.get('contactPhone'),
        notes: formData.get('notes'),
    };

    const { error } = await supabase
        .from('prospects')
        .insert(prospectData);

    if (error) {
        throw error;
    }

    revalidatePath('/dashboard/generations')
    redirect('/dashboard/prospects');
}

export async function getProspectById(prospectId: string): Promise<Prospect> {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { userId } = await auth();

    const { data, error } = await supabase
        .from('prospects')
        .select()
        .eq('id', prospectId)
        .eq('clerk_user_id', userId)
        .single();

    if (error) {
        throw error;
    }

    return data;
}


export async function deleteProspect(formData: FormData) {
    const id = formData.get('prospectId');
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    const { error } = await supabase
        .from('prospects')
        .delete()
        .eq('id', id);

    if (error) {
        throw error;
    }

    revalidatePath('/dashboard/prospects');
}

export async function getUserSettings(): Promise<UserConfiguration | null> {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { userId } = await auth();

    const { data, error } = await supabase
        .from('user_configuration')
        .select()
        .eq('clerk_user_id', userId)
        .maybeSingle()

    if(error) {
        throw error;
    }

    return data;
}

export async function createOrUpdateSettings(formData: FormData) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { userId } = await auth();
    console.log(formData);

    const settings = {
        clerk_user_id: userId,
        company_name: formData.get('name'),
        company_industry: formData.get('industry'),
        company_size: formData.get('size'),
        company_website: formData.get('website'),
        company_description: formData.get('description'),
        company_value_proposition: formData.get('valueProposition'),
        email_tone: formData.get('emailTone'),
        linkedin_tone: formData.get('linkedinTone'),
        twitter_tone: formData.get('twitterTone'),
        message_tone: formData.get('messageTone'),
    };

    const { error } = await supabase
        .from('user_configuration')
        .upsert(settings);

    if (error) {
        throw error;
    }

    revalidatePath('/dashboard/settings');
}