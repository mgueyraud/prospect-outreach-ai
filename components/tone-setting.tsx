import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type Props = {
  emailTone: string;
  linkedinTone: string;
  twitterTone: string;
  messageTone: string;
};

export default function ToneSetting({
  emailTone,
  linkedinTone,
  twitterTone,
  messageTone,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tone of Voice</CardTitle>
        <CardDescription>
          Set the tone for your outreach content on different platforms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Email Tone</Label>
          <RadioGroup
            className="grid grid-cols-2 gap-4"
            defaultValue={emailTone}
            name="emailTone"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="professional" id="email-professional" />
              <Label htmlFor="email-professional" className="font-normal">
                Professional
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="conversational"
                id="email-conversational"
              />
              <Label htmlFor="email-conversational" className="font-normal">
                Conversational
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="friendly" id="email-friendly" />
              <Label htmlFor="email-friendly" className="font-normal">
                Friendly
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="formal" id="email-formal" />
              <Label htmlFor="email-formal" className="font-normal">
                Formal
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>LinkedIn Tone</Label>
          <RadioGroup
            className="grid grid-cols-2 gap-4"
            defaultValue={linkedinTone}
            name="linkedinTone"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="professional" id="linkedin-professional" />
              <Label htmlFor="linkedin-professional" className="font-normal">
                Professional
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="conversational"
                id="linkedin-conversational"
              />
              <Label htmlFor="linkedin-conversational" className="font-normal">
                Conversational
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="friendly" id="linkedin-friendly" />
              <Label htmlFor="linkedin-friendly" className="font-normal">
                Friendly
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="formal" id="linkedin-formal" />
              <Label htmlFor="linkedin-formal" className="font-normal">
                Formal
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>Twitter Tone</Label>
          <RadioGroup
            className="grid grid-cols-2 gap-4"
            defaultValue={twitterTone}
            name="twitterTone"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="professional" id="twitter-professional" />
              <Label htmlFor="twitter-professional" className="font-normal">
                Professional
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="conversational"
                id="twitter-conversational"
              />
              <Label htmlFor="twitter-conversational" className="font-normal">
                Conversational
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="casual" id="twitter-casual" />
              <Label htmlFor="twitter-casual" className="font-normal">
                Casual
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="friendly" id="twitter-friendly" />
              <Label htmlFor="twitter-friendly" className="font-normal">
                Friendly
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>Direct Message Tone</Label>
          <RadioGroup
            className="grid grid-cols-2 gap-4"
            defaultValue={messageTone}
            name="messageTone"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="professional" id="message-professional" />
              <Label htmlFor="message-professional" className="font-normal">
                Professional
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="conversational"
                id="message-conversational"
              />
              <Label htmlFor="message-conversational" className="font-normal">
                Conversational
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="friendly" id="message-friendly" />
              <Label htmlFor="message-friendly" className="font-normal">
                Friendly
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="casual" id="message-casual" />
              <Label htmlFor="message-casual" className="font-normal">
                Casual
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
