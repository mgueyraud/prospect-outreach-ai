"use server";

import { getProspectById, getUserSettings } from "./prospects";
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import {  auth, currentUser } from "@clerk/nextjs/server";
import { Prospect } from "@/types/prospect";
import { cookies } from "next/headers";
import { createClient } from "./server";

// Define the schema for the AI response
const outreachContentSchema = z.object({
    email: z.string(),
    linkedin: z.string(),
    twitter: z.string(),
    message: z.string(),
  })
  
// Type for the AI response
type OutreachContent = z.infer<typeof outreachContentSchema>

export async function generateContent(_: OutreachContent, formData: FormData) {
    
    const settings = await getUserSettings();
    const user = await currentUser();
    
    const companyId = formData.get('companyId') as string;
    const additionalContext = formData.get('additionalContext') as string ?? '';

    if(!companyId){
        throw Error("No company id");
    }
    
    const prospect = await getProspectById(companyId)

    // Create the system prompt
  const systemPrompt = `You are an expert sales copywriter specializing in creating personalized outreach content.
  Your task is to generate outreach content for different platforms based on the provided information.
  The content should be personalized, concise, and effective at generating interest.
  
  For each platform, use the specified tone:
  - Email: ${settings?.email_tone} tone
  - LinkedIn: ${settings?.linkedin_tone} tone
  - Twitter: ${settings?.twitter_tone} tone
  - Direct Message: ${settings?.message_tone} tone
  
  Focus on creating value-driven content that highlights how the sender's company can solve problems for the prospect.
  Avoid generic language and make specific references to both companies when possible.`
  
    // Create the user prompt
    const userPrompt = `Create personalized outreach content for the following:
  
  SENDER COMPANY:
  Persons name: ${user?.fullName}
  Company Name: ${settings?.company_name}
  Industry: ${settings?.company_industry}
  Description: ${settings?.company_description}
  Value Proposition: ${settings?.company_value_proposition}
  
  TARGET PROSPECT:
  Company Name: ${prospect.name}
  Industry: ${prospect.industry}
  ${prospect.website ? `Website: ${prospect.website}` : ""}
  ${prospect.contact_person ? `Contact Person: ${prospect.contact_person}` : ""}
  ${prospect.contact_title ? `Job Title: ${prospect.contact_title}` : ""}
  ${prospect.notes ? `Additional Notes: ${prospect.notes}` : ""}
  (The additional notes you can use if necessary, it's not an obligation, as long as it makes sense for the outreach)

  
  ${additionalContext ? `ADDITIONAL CONTEXT:\n${additionalContext}` : ""}
  
  Generate personalized outreach content for email (with subject line), LinkedIn, Twitter, and direct message.`

  
    // Use the AI SDK to generate the content
    const { object } =  await generateObject({
      model: openai("o3-mini"),
      system: systemPrompt,
      prompt: userPrompt,
      schema: outreachContentSchema,
    })

    await saveGeneration({
      generation: object,
      prospect: prospect,
      additionalContext
    })


    return object
}

export async function getGenerations() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const { userId } = await auth();

  const { data, error } = await supabase
        .from('generations')
        .select()
        .eq('clerk_user_id', userId);

  if(error) {
    throw error;
  }
  
  return data;
}


async function saveGeneration({
  generation,
  prospect,
  additionalContext
}: {
  generation: OutreachContent,
  prospect: Prospect,
  additionalContext: string
}){
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const { userId } = await auth();

  const generationData = {
    clerk_user_id: userId,
    prospect_id: prospect.id,
    email_content: generation.email,
    linkedin_content: generation.linkedin,
    twitter_content: generation.twitter,
    message_content: generation.message,
    additional_context: additionalContext,
  };

  const { error } = await supabase
    .from('generations')
    .insert(generationData);

  if (error) {
    throw error;
  }
}