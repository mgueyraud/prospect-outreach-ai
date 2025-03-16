import Link from "next/link";
import { ArrowLeft, PlusCircle, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteProspect, getProspects } from "@/lib/supabase/prospects";

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prospects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No prospects found. Add your first prospect to get started.
                </TableCell>
              </TableRow>
            ) : (
              prospects.map((prospect) => (
                <TableRow key={prospect.id}>
                  <TableCell className="font-medium">{prospect.name}</TableCell>
                  <TableCell>{prospect.industry}</TableCell>
                  <TableCell>{prospect.contact_person}</TableCell>
                  <TableCell>{prospect.contact_email}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <form action={deleteProspect}>
                        <Button
                          variant="ghost"
                          size="icon"
                          name="prospectId"
                          value={prospect.id}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
