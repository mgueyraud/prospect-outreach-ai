import {
  Check,
  Copy,
  Linkedin,
  Mail,
  MessageSquare,
  Twitter,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";

type Props = {
  content: {
    email: string;
    twitter: string;
    linkedin: string;
    message: string;
  };
};

export default function GeneratedContent({ content }: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const [tab, setTab] = useState("email");

  const handleCopy = () => {
    if (isCopied) return;
    setIsCopied(true);
    navigator.clipboard.writeText(content[tab as keyof Props["content"]]);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Content</CardTitle>
        <CardDescription>
          Preview and copy your personalized outreach content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="email" value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="email">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="linkedin">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </TabsTrigger>
            <TabsTrigger value="twitter">
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </TabsTrigger>
            <TabsTrigger value="message">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </TabsTrigger>
          </TabsList>
          <TabsContent value="email" className="mt-4">
            <Textarea
              readOnly
              rows={10}
              className="font-mono text-sm h-[300px]"
              defaultValue={content.email}
            />
          </TabsContent>
          <TabsContent value="linkedin" className="mt-4">
            <Textarea
              readOnly
              rows={10}
              className="font-mono text-sm h-[300px]"
              defaultValue={content.linkedin}
            />
          </TabsContent>
          <TabsContent value="twitter" className="mt-4">
            <Textarea
              readOnly
              rows={10}
              className="font-mono text-sm h-[300px]"
              defaultValue={content.twitter}
            />
          </TabsContent>
          <TabsContent value="message" className="mt-4">
            <Textarea
              readOnly
              rows={10}
              className="font-mono text-sm h-[300px]"
              defaultValue={content.message}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={handleCopy} disabled={isCopied}>
          {isCopied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
