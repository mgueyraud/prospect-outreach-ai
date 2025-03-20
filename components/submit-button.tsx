"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function SubmitButton({
  idle,
  pending,
  className = "",
}: {
  idle: React.ReactNode;
  pending: React.ReactNode;
  className?: string;
  pendingClassName?: string;
}) {
  const status = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={status.pending}
      className={cn("cursor-pointer", className)}
    >
      {status.pending ? pending : idle}
    </Button>
  );
}
