import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type Props = {
  companyName: string;
  companyIndustry: string;
  companySize: string;
  companyWebsite: string;
  companyDescription: string;
  companyValueProposition: string;
};

export default function CompanyProfile({
  companyName,
  companyIndustry,
  companySize,
  companyWebsite,
  companyDescription,
  companyValueProposition,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
        <CardDescription>
          This information will be used to personalize your outreach content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Company Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Acme Inc."
            required
            defaultValue={companyName}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              name="industry"
              placeholder="Technology, Healthcare, Finance, etc."
              defaultValue={companyIndustry}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="size">Company Size</Label>
            <Input
              id="size"
              name="size"
              placeholder="1-10, 11-50, 51-200, 201-500, 500+"
              defaultValue={companySize}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            placeholder="https://example.com"
            defaultValue={companyWebsite}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Company Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Brief description of what your company does"
            rows={3}
            defaultValue={companyDescription}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="valueProposition">Value Proposition</Label>
          <Textarea
            id="valueProposition"
            name="valueProposition"
            placeholder="What makes your product/service unique and valuable to customers"
            rows={3}
            defaultValue={companyValueProposition}
          />
        </div>
      </CardContent>
    </Card>
  );
}
