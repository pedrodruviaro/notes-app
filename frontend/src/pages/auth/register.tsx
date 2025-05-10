import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { ArrowRight, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { register as registerFn } from "@/api/auth/register";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const registerSchema = z.object({
  fullname: z
    .string({
      required_error: "Fullname is required",
    })
    .min(5),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  username: z.string({
    required_error: "Username is required",
  }).min(2),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6),
  confirmPassword: z
    .string({
      required_error: "Password is required",
    })
    .min(6),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ["confirmPassword"],
    });
  }
});;

type RegisterSchema = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "teste",
      email: "teste@teste.com",
      username: "teste",
      password: "teste123",
      confirmPassword: "teste123",
    },
  });

  async function handleRegister(data: RegisterSchema) {
    try {
      const response = await registerFn({ email: data.email, fullname: data.fullname, password: data.password, username: data.username });

      toast.success("Registered successfully!", {
        action: {
          label: "Login in!",
          onClick: () => navigate(`/login?email=${response.email}`),
        },
      });
    }
    catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  }

  return (
    <section>
      <div className="mb-10">
        <p className="font-mono text-2xl font-bold tracking-tight block mx-auto max-w-max">notes.app</p>
      </div>

      <Card className="max-w-[40rem] mx-auto">
        <CardHeader>
          <h1 className="font-bold text-xl lg:text-2xl">Register</h1>
          <p className="text-muted-foreground">Create and account for free</p>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
            <div className="space-y-2">
              <Label htmlFor="fullname">
                Fullname*
              </Label>
              <div className="space-y-1">
                <Input id="fullname" autoFocus {...register("fullname")} />
                {errors.fullname?.message && <FormError message={errors.fullname.message} />}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email*
              </Label>
              <div className="space-y-1">
                <Input type="email" id="email" {...register("email")} />
                {errors.email?.message && <FormError message={errors.email.message} />}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">
                Username*
              </Label>
              <div className="space-y-1">
                <Input id="username" {...register("username")} />
                <p className="text-xs text-muted-foreground">This is your public display name.</p>
                {errors.username?.message && <FormError message={errors.username.message} />}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Password*
              </Label>
              <div className="space-y-1">
                <div className="relative">
                  <Lock size={12} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
                  <Input type="password" id="password" className="pl-8" {...register("password")} />
                </div>

                {errors.password?.message && <FormError message={errors.password.message} />}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Password confirmation*
              </Label>
              <div className="space-y-1">
                <div className="relative">
                  <Lock size={12} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
                  <Input type="password" id="confirmPassword" className="pl-8" {...register("confirmPassword")} />
                </div>
                {errors.confirmPassword?.message && <FormError message={errors.confirmPassword.message} />}
              </div>
            </div>

            <div className="flex justify-end">
              <Button disabled={isSubmitting}>
                Register
                <ArrowRight />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
