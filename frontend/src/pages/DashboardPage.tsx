import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Box, CircularProgress, Snackbar, Stack, Typography } from "@mui/material";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import LinkIcon from "@mui/icons-material/Link";

import { useAuth } from "../hooks/useAuth";
import { useUserUrls } from "../hooks/useUserUrls";
import { CREATE_URL_INPUT_ID, clicksOf, stripProtocol } from "../lib/links";
import { MUTED_TEXT, PAGE_BG } from "../theme/tokens";
import { copyToClipboard } from "../lib/clipboard";
import { StatCard } from "../components/dashboard/StatCard";
import type { NavId } from "../components/dashboard/SidebarContent";
import { CreateLinkCard } from "../components/dashboard/CreateLinkCard";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import { MyLinksCard } from "../components/dashboard/MyLinksCard";

export default function DashboardPage() {
  const { user, ready, signOut } = useAuth();
  const navigate = useNavigate();
  const { urls, loading, error, refresh } = useUserUrls(user?.id);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavId>("overview");
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (ready && !user) void navigate("/");
  }, [ready, user, navigate]);

  const totalClicks = useMemo(() => urls.reduce((sum, item) => sum + clicksOf(item), 0), [urls]);

  const copy = async (value: string) => {
    const ok = await copyToClipboard(value);
    setToast(ok ? `Copied ${stripProtocol(value)} to clipboard` : "Unable to copy. Please copy the link manually.");
  };

  const focusCreateInput = () => {
    const input = document.getElementById(CREATE_URL_INPUT_ID);
    input?.scrollIntoView({ behavior: "smooth", block: "center" });
    input?.focus();
  };

  const scrollToSection = (id: NavId) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth", block: "center" });
    section?.focus({ preventScroll: true });
  };

  if (!ready || !user) {
    return (
      <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", bgcolor: PAGE_BG }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  const firstName = user.name?.split(" ")[0] || user.email.split("@")[0];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: PAGE_BG, color: "text.primary" }}>
      <DashboardSidebar
        drawerOpen={drawerOpen}
        onCloseDrawer={() => setDrawerOpen(false)}
        active={activeNav}
        onNavigate={(id) => {
          setActiveNav(id);
          setDrawerOpen(false);
          scrollToSection(id);
        }}
        name={user.name}
        email={user.email}
        onSignOut={signOut}
      />

      <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <DashboardHeader email={user.email} onOpenMenu={() => setDrawerOpen(true)} onCreateLink={focusCreateInput} />

        <Stack
          component="main"
          id="overview"
          tabIndex={-1}
          spacing={3}
          sx={{ outline: "none", flex: 1, width: "100%", maxWidth: 1152, mx: "auto", p: { xs: 2, sm: 3, lg: 4 }, scrollMarginTop: 80 }}
        >
          <Box>
            <Typography component="h2" sx={{ fontSize: 24, lineHeight: "32px", fontWeight: 600, letterSpacing: "-0.25px" }}>
              Welcome back, {firstName}
            </Typography>
            <Typography sx={{ fontSize: 14, color: MUTED_TEXT }}>
              Create new short links and monitor click performance across your workspace.
            </Typography>
          </Box>

          <Box
            component="section"
            aria-label="Overview statistics"
            sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: { xs: 2, sm: 3 } }}
          >
            <StatCard label="Total Links" value={urls.length} icon={<LinkIcon />} />
            <StatCard label="Total Clicks" value={totalClicks} icon={<AdsClickIcon />} />
          </Box>

          <CreateLinkCard
            onCopy={copy}
            onCreated={() => {
              setToast("Short link created");
              refresh();
            }}
          />

          <MyLinksCard urls={urls} loading={loading} error={error} onCopy={copy} />
        </Stack>
      </Box>

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={2500}
        onClose={() => setToast("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setToast("")} severity="success" variant="filled">
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  );
}
