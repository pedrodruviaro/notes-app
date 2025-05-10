import { api } from "@/lib/axios";

type RegisterBody = { fullname: string; email: string; password: string; username: string };

type RegisterResponse = {
  createdAt: string;
  email: string;
  fullname: string;
  updatedAt: string;
  username: string;
};

export async function register({ fullname, email, password, username }: RegisterBody) {
  const response = await api.post<RegisterResponse>("/register", { fullname, email, password, username });
  return response.data;
}
