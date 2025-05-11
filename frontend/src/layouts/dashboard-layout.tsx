import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { Outlet } from "react-router-dom";

import { Logo } from "@/components/logo";

export function DashboardLayout() {
  return (
    <div className="grid grid-rows-[max-content_1fr_max-content] min-h-dvh">
      <header className="border-b border-muted py-4 flex">
        <div className="container">
          <Logo />
        </div>
      </header>
      <main className="py-10 lg:py-12 relative w-full overflow-hidden">
        <div className="container relative z-10">
          <Outlet />
        </div>

        <AnimatedGridPattern maxOpacity={0.07} duration={2} />

      </main>
      <footer className="bg-muted/50 py-2.5 border-t border-muted">
        <div className="container">
          <p className="text-xs text-center">&copy; {new Date().getFullYear()} - All rights reseverd</p>
        </div>
      </footer>
    </div>

  );
}
