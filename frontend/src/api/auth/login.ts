import { api } from "@/lib/axios";

type LoginBody = { email: string; password: string };

type LoginResponse = {
  token: string;
};

export async function login({ email, password }: LoginBody) {
  const response = await api.post<LoginResponse>("/login", { email, password });
  return response.data;
}
