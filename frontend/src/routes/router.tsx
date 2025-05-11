import { createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "@/layouts/auth-layout";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { LoginPage } from "@/pages/auth/login";
import { RegisterPage } from "@/pages/auth/register";
import { NotesPage } from "@/pages/notes/notes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [

      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [

      {
        path: "notes",
        element: <NotesPage />,
      },
    ],
  },
]);
