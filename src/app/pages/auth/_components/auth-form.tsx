"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Control } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

// Form schema definition
const formSchema = z.object({
  email: z.string().email({
    message: "Por favor insira um e-mail válido.",
  }),
  password: z.string().min(1, {
    message: "Por favor insira sua senha.",
  }),
  rememberMe: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

// Form field components
const EmailField = ({ control }: { control: Control<FormSchema> }) => (
  <FormField
    control={control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input placeholder="email@example.com" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

const PasswordField = ({ control }: { control: Control<FormSchema> }) => (
  <FormField
    control={control}
    name="password"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Senha</FormLabel>
        <FormControl>
          <Input type="password" placeholder="********" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

const RememberMeField = ({ control }: { control: Control<FormSchema> }) => (
  <FormField
    control={control}
    name="rememberMe"
    render={({ field }) => (
      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md shadow">
        <FormControl>
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>
        <div className="space-y-1 leading-none">
          <FormLabel>Lembrar de mim</FormLabel>
        </div>
      </FormItem>
    )}
  />
);

// API call function
async function authenticateUser(data: FormSchema) {
  try {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to authenticate");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function AuthForm() {
  const router = useRouter(); // Inicialize o useRouter
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(data: FormSchema) {
    try {
      // Supondo que authenticateUser retorne um token
      // const result = await authenticateUser(data);
      const result = {
        token: 123,
      };
      // Defina o cookie auth-token
      setCookie("auth-token", result.token, { maxAge: 60 * 60 * 24 }); // 1 dia de validade

      toast({
        title: "Success",
        description: (
          <pre className="mt-2 w-fit rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            <code>{result.token}</code>
          </pre>
        ),
      });

      // Navegue para a tela do dashboard
      router.push("/protected/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: (
          <pre className="mt-2 w-fit rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            <code>
              {error instanceof Error
                ? error.message
                : "An unknown error occurred"}
            </code>
          </pre>
        ),
      });
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
          <EmailField control={form.control} />
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
          <Button type="submit" className="w-full">
            Login
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
