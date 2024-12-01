import Image from "next/image";
import Link from "next/link";
import loginImage from "@/assets/login-background.jpg";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Logo from "@/components/shared/logo";
import { AuthForm } from "./auth-form";

const SocialLinks = () => (
  <div className="flex gap-4 justify-end">
    {[
      { href: "#", icon: Instagram, label: "Instagram" },
      { href: "#", icon: Facebook, label: "Facebook" },
      { href: "#", icon: Linkedin, label: "LinkedIn" },
    ].map(({ href, icon: Icon, label }) => (
      <Link
        key={label}
        href={href}
        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <Icon className="w-5 h-5" />
        <span className="sr-only">{label}</span>
      </Link>
    ))}
  </div>
);

export function AuthPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="absolute top-4 right-4 z-10 shadow-lg">
        <ModeToggle />
      </div>
      <div className="hidden bg-muted lg:block">
        <div className="absolute top-6 left-6 z-10">
          <Logo size={48} titleSize="4xl" subtitleSize="2xl" theme="dark" />
        </div>
        <Image
          src={loginImage}
          alt="Image"
          width="1920"
          height="1080"
          className="h-screen w-full object-cover dark:brightness-[0.7] dark:grayscale-0"
        />
      </div>
      <div className="h-screen flex flex-col justify-between p-4">
        <div className="lg:invisible">
          <Logo size={38} titleSize="3xl" subtitleSize="2xl" />
        </div>
        <AuthForm />
        <SocialLinks />
      </div>
    </div>
  );
}
