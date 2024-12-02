/* eslint-disable @typescript-eslint/no-explicit-any */
// components/FormFields.tsx
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export const UserNameField = ({ control }: { control: Control<any> }) => (
  <FormField
    control={control}
    name="userName"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Usuário</FormLabel>
        <FormControl>
          <Input placeholder="usuário" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const PasswordField = ({ control }: { control: Control<any> }) => (
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

export const RememberMeField = ({ control }: { control: Control<any> }) => (
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
