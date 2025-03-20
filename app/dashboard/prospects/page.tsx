import Link from "next/link";
import { ArrowLeft, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getProspects } from "@/lib/supabase/prospects";
import ProspectsTable from "@/components/prospects-table";

export default async function ProspectsPage() {
  const prospects = await getProspects();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button asChild variant="outline" size="sm">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <Button asChild>
          <Link href="prospects/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Prospect
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <ProspectsTable prospects={prospects} />
      </div>
    </div>
  );
}
