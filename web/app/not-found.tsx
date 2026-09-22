import { LinkButton } from "@/components/ui/button";
import { LogoMark } from "@/components/nav/sidebar";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-page px-6 text-center">
      <LogoMark size={28} />
      <div>
        <h1 className="text-2xl font-semibold text-ink-primary">404 — page not found</h1>
        <p className="mt-1 text-sm text-ink-muted">The page you&rsquo;re looking for doesn&rsquo;t exist in this demo.</p>
      </div>
      <LinkButton href="/">Back to home</LinkButton>
    </div>
  );
}
