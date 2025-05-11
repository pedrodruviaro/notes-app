import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Lock, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { login } from "@/api/auth/login";
import { FormError } from "@/components/form-error";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: searchParams.get("email") || "",
    },
  });

  async function handleLogin(data: LoginSchema) {
    try {
      const { token } = await login({ email: data.email, password: data.password });

      localStorage.setItem("token", JSON.stringify(token));

      toast.success("Logged in!");
      navigate("/notes");
    }
    catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  }

  return (
    <section>
      <Card className="max-w-[40rem] mx-auto">
        <Logo className="mb-6 mx-auto" />
        <CardHeader>
          <h1 className="font-bold text-xl lg:text-2xl">Login</h1>
          <p className="text-muted-foreground">Welcome back!</p>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email*
              </Label>
              <div className="space-y-1">
                <Input autoFocus type="email" id="email" {...register("email")} />
                {errors.email?.message && <FormError message={errors.email.message} />}
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

            <Button disabled={isSubmitting} variant="secondary">
              Login
              <LogIn />
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <Link to="/register" className="text-sm text-muted-foreground hover:underline">Don't have an account? Create one for free</Link>
        </CardFooter>
      </Card>
    </section>
  );
}
