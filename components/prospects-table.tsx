"use client";
import { Trash2 } from "lucide-react";
import React, { useOptimistic } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Prospect } from "@/types/prospect";
import { deleteProspect } from "@/lib/supabase/prospects";

type Props = {
  prospects: Prospect[];
};

export default function ProspectsTable({ prospects }: Props) {
  const [optimisticProspects, deleteOptimisticProspect] = useOptimistic(
    prospects,
    (prevProspects: Prospect[], id: string) => [
      ...prevProspects.filter((prospect) => prospect.id !== id),
    ]
  );

  return (
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
        {optimisticProspects.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No prospects found. Add your first prospect to get started.
            </TableCell>
          </TableRow>
        ) : (
          optimisticProspects.map((prospect) => (
            <TableRow key={prospect.id}>
              <TableCell className="font-medium">{prospect.name}</TableCell>
              <TableCell>{prospect.industry}</TableCell>
              <TableCell>{prospect.contact_person}</TableCell>
              <TableCell>{prospect.contact_email}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <form
                    action={(formData: FormData) => {
                      deleteOptimisticProspect(prospect.id);
                      deleteProspect(formData);
                    }}
                  >
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
  );
}
