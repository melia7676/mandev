import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { toast } from "sonner";
import {
  Loader2,
  LogOut,
  Mail,
  Users,
  Eye,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Monitor,
  Smartphone,
  RefreshCw,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

type Contact = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  project_type: string | null;
  message: string;
  created_at: string;
  read: boolean;
  ip_address: string | null;
};

type Visitor = {
  id: string;
  ip_address: string | null;
  city: string | null;
  country: string | null;
  region: string | null;
  user_agent: string | null;
  device_type: string | null;
  visit_timestamp: string;
};

function AdminDashboard() {
  const { session, loading: authLoading, signOut, isAuthenticated } = useAdminAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"contacts" | "visitors">("contacts");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalVisitors: 0,
    uniqueIps: 0,
    unreadContacts: 0,
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.navigate({ to: "/admin/login" });
    }
  }, [authLoading, isAuthenticated, router]);

  const fetchData = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const [{ data: cData, error: cErr }, { data: vData, error: vErr }] = await Promise.all([
        supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
        supabase.from("visitors").select("*").order("visit_timestamp", { ascending: false }),
      ]);

      if (cErr) throw cErr;
      if (vErr) throw vErr;

      const contactList: Contact[] = cData || [];
      const visitorList: Visitor[] = vData || [];

      setContacts(contactList);
      setVisitors(visitorList);

      const uniqueIps = new Set(visitorList.map((v) => v.ip_address).filter(Boolean)).size;
      const unread = contactList.filter((c) => !c.read).length;

      setStats({
        totalContacts: contactList.length,
        totalVisitors: visitorList.length,
        uniqueIps,
        unreadContacts: unread,
      });
    } catch (err) {
      toast.error("Failed to load dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAuthenticated]);

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .update({ read: true })
        .eq("id", id);
      if (error) throw error;

      setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, read: true } : c)));
      setStats((s) => ({ ...s, unreadContacts: Math.max(0, s.unreadContacts - 1) }));
      toast.success("Marked as read");
    } catch {
      toast.error("Failed to update");
    }
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.company?.toLowerCase().includes(search.toLowerCase()) ||
      c.project_type?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredVisitors = visitors.filter(
    (v) =>
      v.ip_address?.includes(search) ||
      v.city?.toLowerCase().includes(search.toLowerCase()) ||
      v.country?.toLowerCase().includes(search.toLowerCase()) ||
      v.device_type?.toLowerCase().includes(search.toLowerCase())
  );

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-charcoal">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-charcoal text-background">
      {/* Header */}
      <header className="border-b border-background/10 bg-charcoal/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-xl text-background">M&D Admin</h1>
            <span className="inline-flex items-center rounded-md border border-gold/30 px-2.5 py-0.5 text-xs font-semibold text-gold">
              {session?.user?.email}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="inline-flex items-center gap-2 rounded-md border border-background/20 px-3 py-2 text-sm text-background transition-colors hover:bg-background/10"
              title="Refresh data"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-md border border-background/20 px-4 py-2 text-sm text-background transition-colors hover:bg-background/10"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-background/10 bg-charcoal text-background">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gold" />
                <span className="text-2xl font-bold">{stats.totalContacts}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-background/10 bg-charcoal text-background">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Unread Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-gold" />
                <span className="text-2xl font-bold">{stats.unreadContacts}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-background/10 bg-charcoal text-background">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Visits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gold" />
                <span className="text-2xl font-bold">{stats.totalVisitors}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-background/10 bg-charcoal text-background">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Unique IPs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gold" />
                <span className="text-2xl font-bold">{stats.uniqueIps}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs & Search */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("contacts")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "contacts"
                  ? "bg-gold text-accent-foreground"
                  : "text-background/60 hover:text-background"
              }`}
            >
              Contact Submissions
            </button>
            <button
              onClick={() => setActiveTab("visitors")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "visitors"
                  ? "bg-gold text-accent-foreground"
                  : "text-background/60 hover:text-background"
              }`}
            >
              Visitors
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-background/20 bg-transparent py-2 pl-9 pr-4 text-sm text-background placeholder:text-background/40 focus:border-gold focus:outline-none sm:w-72"
            />
          </div>
        </div>

        {/* Tables */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        ) : activeTab === "contacts" ? (
          <div className="rounded-xl border border-background/10 bg-charcoal overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-background/10 hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Name</TableHead>
                    <TableHead className="text-muted-foreground">Email</TableHead>
                    <TableHead className="text-muted-foreground">Company</TableHead>
                    <TableHead className="text-muted-foreground">Project</TableHead>
                    <TableHead className="text-muted-foreground">Message</TableHead>
                    <TableHead className="text-muted-foreground">Date</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                        No contact submissions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredContacts.map((contact) => (
                      <TableRow key={contact.id} className="border-background/10">
                        <TableCell className="font-medium text-background">{contact.name}</TableCell>
                        <TableCell className="text-background/80">{contact.email}</TableCell>
                        <TableCell className="text-background/80">{contact.company || "—"}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-background/10 text-background/80">
                            {contact.project_type || "—"}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-background/80">
                          {contact.message}
                        </TableCell>
                        <TableCell className="text-background/60 text-xs">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {contact.read ? (
                            <span className="inline-flex items-center gap-1 text-xs text-gold">
                              <CheckCircle2 className="h-3 w-3" /> Read
                            </span>
                          ) : (
                            <button
                              onClick={() => markAsRead(contact.id)}
                              className="inline-flex items-center gap-1 text-xs text-background/60 hover:text-gold transition-colors"
                            >
                              <Clock className="h-3 w-3" /> Mark read
                            </button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-background/10 bg-charcoal overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-background/10 hover:bg-transparent">
                    <TableHead className="text-muted-foreground">IP Address</TableHead>
                    <TableHead className="text-muted-foreground">Location</TableHead>
                    <TableHead className="text-muted-foreground">Device</TableHead>
                    <TableHead className="text-muted-foreground">User Agent</TableHead>
                    <TableHead className="text-muted-foreground">Visit Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVisitors.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                        No visitor data found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredVisitors.map((visitor) => (
                      <TableRow key={visitor.id} className="border-background/10">
                        <TableCell className="font-mono text-sm text-background">
                          {visitor.ip_address || "—"}
                        </TableCell>
                        <TableCell className="text-background/80">
                          {visitor.city && visitor.country
                            ? `${visitor.city}, ${visitor.country}`
                            : visitor.country || visitor.city || "—"}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1 text-xs text-background/80">
                            {visitor.device_type === "Mobile" ? (
                              <Smartphone className="h-3 w-3" />
                            ) : (
                              <Monitor className="h-3 w-3" />
                            )}
                            {visitor.device_type || "—"}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-xs text-background/60">
                          {visitor.user_agent || "—"}
                        </TableCell>
                        <TableCell className="text-background/60 text-xs">
                          {new Date(visitor.visit_timestamp).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}