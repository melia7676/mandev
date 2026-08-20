import { useState, useEffect } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { toast } from "sonner";
import { Loader2, Shield } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const [email, setEmail] = useState("MDDevelopment2026@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAdminAuth();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.navigate({ to: "/admin" });
    }
  }, [authLoading, isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Welcome back, admin.");
    router.navigate({ to: "/admin" });
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-charcoal">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
            <Shield className="h-8 w-8 text-gold" />
          </div>
          <h1 className="mt-6 font-display text-3xl text-background">Admin Portal</h1>
          <p className="mt-2 text-sm text-muted-foreground">M&D Development Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin Email"
                className="w-full border border-background/25 bg-transparent px-4 py-3 text-sm text-background placeholder:text-background/45 focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full border border-background/25 bg-transparent px-4 py-3 text-sm text-background placeholder:text-background/45 focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-accent-foreground transition-colors hover:bg-gold-soft disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="text-center">
          <a href="/" className="text-sm text-gold hover:text-gold-soft transition-colors">
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}