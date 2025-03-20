import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

type Props = {
  companies: {
    id: string;
    name: string;
  }[];
  isPending?: boolean;
};

export default function GenerationForm({
  companies,
  isPending = false,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Outreach Content</CardTitle>
        <CardDescription>
          Select companies and provide context to generate personalized outreach
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Target Prospect</label>
          <Select name="companyId">
            <SelectTrigger>
              <SelectValue placeholder="Select a prospect" />
            </SelectTrigger>
            <SelectContent>
              {companies
                .filter((c) => c.id !== "1")
                .map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Additional Context</label>
          <Textarea
            name="additionalContext"
            placeholder="Add specific details about your outreach goals, pain points you solve, or any other context that will help personalize the message"
            rows={5}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto" disabled={isPending}>
          {isPending ? "Generating..." : "Generate content"}
        </Button>
      </CardFooter>
    </Card>
  );
}
