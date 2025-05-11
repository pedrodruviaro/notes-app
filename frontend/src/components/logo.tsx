import { Notebook } from "lucide-react";

import { cn } from "@/lib/utils";

type LogoProps = {
    className?: string;
};

export function Logo({ className }: LogoProps) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <Notebook />
            <span className="font-mono text-2xl font-bold tracking-tight">notes.app</span>
        </div>
    );
}
