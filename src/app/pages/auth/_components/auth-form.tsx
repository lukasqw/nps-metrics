"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { HttpAuthService } from "@/services/http/http-auth.service";
import { z } from "zod";
import { PasswordField, RememberMeField, UserNameField } from "./formFields";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

// Form schema definition
const formSchema = z.object({
  userName: z.string().min(1, {
    message: "Por favor insira um usuário válido.",
  }),
  password: z.string().min(1, {
    message: "Por favor insira sua senha.",
  }),
  rememberMe: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(data: FormSchema) {
    setIsLoading(true);
    try {
      const result = await HttpAuthService.login({
        username: data.userName,
        password: data.password,
      });

      setCookie("auth-token", result.accessToken, { maxAge: 60 * 60 * 24 });
      sessionStorage.setItem("companyId", result.companyId);
      sessionStorage.setItem("userId", result.userId);

      toast({
        title: "Login efetuado com sucesso",
      });
      router.push("/protected/dashboard");
    } catch {
      toast({
        title: "Tivemos um erro inesperado",
        description: "Por favor tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto grid lg:w-[400px] gap-6 py-10">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">Bem vindo de volta</h1>
        <p className="text-muted-foreground">
          Insira seu e-mail abaixo para fazer login em sua conta
        </p>
      </div>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <UserNameField control={form.control} />
          <PasswordField control={form.control} />
          <div className="flex items-center">
            <RememberMeField control={form.control} />
            <Link
              href="/forgot-password"
              className="ml-auto inline-block text-sm underline"
            >
              esqueceu a senha?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <LoaderCircle className="animate-spin" /> : "Entrar"}
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        <Link href="#" className="underline">
          Não tem uma conta?
        </Link>
      </div>
    </div>
  );
}
