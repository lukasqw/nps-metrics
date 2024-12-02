import { Toaster } from "@/components/ui/toaster";
import { AuthPage } from "./_components/auth-page";

export default function Page() {
  return (
    <div>
      <AuthPage />
      <Toaster />
    </div>
  );
}
