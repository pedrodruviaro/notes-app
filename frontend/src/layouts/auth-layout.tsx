import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <main className="min-h-dvh flex justify-center items-center py-10 lg:py-16">
      <div className="container">
        <Outlet />
      </div>
    </main>
  );
}
