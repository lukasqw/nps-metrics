import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginImage from "@/assets/login-background.jpg";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Logo from "@/components/shared/logo";

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

const GoogleIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_13183_10121)">
      <path
        d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
        fill="#3F83F8"
      />
      <path
        d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
        fill="#34A853"
      />
      <path
        d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
        fill="#FBBC04"
      />
      <path
        d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
        fill="#EA4335"
      />
    </g>
    <defs>
      <clipPath id="clip0_13183_10121">
        <rect width="20" height="20" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);

const LoginForm = () => (
  <div className="mx-auto grid lg:w-[400px] gap-6">
    <div className="grid gap-2 ">
      <h1 className="text-3xl font-bold">Bem vindo de volta</h1>
      <p className="text-muted-foreground">
        Insira seu e-mail abaixo para fazer login em sua conta
      </p>
    </div>
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Senha</Label>
        <Input id="password" type="password" required />
        <div className="flex items-center">
          <input type="checkbox" id="remember" />
          <Label htmlFor="remember" className="ml-2">
            Lembrar de mim
          </Label>
          <Link
            href="/forgot-password"
            className="ml-auto inline-block text-sm underline"
          >
            esqueceu a senha?
          </Link>
        </div>
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
      <Button variant="outline" className="w-full gap-1">
        Continuar com Google <GoogleIcon />
      </Button>
    </div>
    <div className="mt-4 text-center text-sm">
      Não tem uma conta?{" "}
      <Link href="#" className="underline">
        cadastre-se
      </Link>
    </div>
  </div>
);

export function AuthForm() {
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
        <LoginForm />
        <SocialLinks />
      </div>
    </div>
  );
}