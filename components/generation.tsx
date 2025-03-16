"use client";
import React, { useActionState } from "react";
import GenerationForm from "./generation-form";
import GeneratedContent from "./generated-content";
import { generateContent } from "@/lib/supabase/generation";

type Props = {
  companies: {
    id: string;
    name: string;
  }[];
};

export default function Generation({ companies }: Props) {
  const [state, formAction, isPending] = useActionState(generateContent, {
    twitter: "",
    linkedin: "",
    message: "",
    email: "",
  });

  return (
    <>
      <form action={formAction}>
        <GenerationForm companies={companies} isPending={isPending} />
      </form>
      <GeneratedContent content={state} />
    </>
  );
}
