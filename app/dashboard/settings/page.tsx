import type React from "react";

import { LoaderCircle, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  createOrUpdateSettings,
  getUserSettings,
} from "@/lib/supabase/prospects";
import ToneSetting from "@/components/tone-setting";
import CompanyProfile from "@/components/company-profile";
import SubmitButton from "@/components/submit-button";

export default async function GeneralSettings() {
  const settings = await getUserSettings();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">General Settings</h1>
        <p className="text-muted-foreground">
          Manage your company profile and content generation preferences
        </p>
      </div>

      <form action={createOrUpdateSettings}>
        <Tabs defaultValue="company" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="company">Company Profile</TabsTrigger>
            <TabsTrigger value="tone">Tone of Voice</TabsTrigger>
          </TabsList>

          <TabsContent
            value="company"
            className="mt-6 hidden data-[state=active]:block"
            forceMount
          >
            <CompanyProfile
              companyName={settings?.company_name ?? ""}
              companyIndustry={settings?.company_industry ?? ""}
              companySize={settings?.company_size ?? ""}
              companyWebsite={settings?.company_website ?? ""}
              companyDescription={settings?.company_description ?? ""}
              companyValueProposition={
                settings?.company_value_proposition ?? ""
              }
            />
          </TabsContent>

          <TabsContent
            value="tone"
            className="mt-6 hidden data-[state=active]:block"
            forceMount
          >
            <ToneSetting
              emailTone={settings?.email_tone ?? ""}
              linkedinTone={settings?.linkedin_tone ?? ""}
              twitterTone={settings?.twitter_tone ?? ""}
              messageTone={settings?.message_tone ?? ""}
            />
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <SubmitButton
            className="ml-auto mt-6 disabled:opacity-50"
            idle={
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </>
            }
            pending={
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            }
          />
        </div>
      </form>
    </div>
  );
}
