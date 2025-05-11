import { Card } from "@/components/ui/card";

export function NotesPage() {
    return (
        <article className="grid gap-6 md:grid-cols-[1fr_2fr]">
            <aside className="space-y-6">
                <Card className="min-h-44"></Card>
                <Card className="min-h-28"></Card>
            </aside>

            <main>
                <Card className="min-h-40"></Card>
            </main>
        </article>
    );
}
