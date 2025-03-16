import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="grid place-items-center w-screen h-screen">
      <SignIn />
    </div>
  );
}
