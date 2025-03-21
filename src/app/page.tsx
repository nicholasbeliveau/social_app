import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ModeToggle";
import { SignedIn, SignedOut, SignIn, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="m-4">
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton/>
      </SignedIn>

      <ModeToggle/>

      <Button variant={"secondary"}>Click Me</Button>
    </div>
  );
}
