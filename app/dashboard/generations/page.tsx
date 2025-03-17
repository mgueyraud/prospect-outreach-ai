import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getProspects } from "@/lib/supabase/prospects";
import Generation from "@/components/generation";

export default async function GenerationsPage() {
  const companies = await getProspects();

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Generate Outreach</h1>
          <p className="text-muted-foreground">
            Create personalized outreach content for your prospects
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/prospects/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Prospect
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Generation companies={companies} />
      </div>
    </div>
  );
}
