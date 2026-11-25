import { useState, type FormEvent, type ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LanguageIcon from "@mui/icons-material/Language";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BoltIcon from "@mui/icons-material/Bolt";
import BarChartIcon from "@mui/icons-material/BarChart";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import CheckIcon from "@mui/icons-material/Check";
import { getShortUrlApiUrlWithoutSignIn } from "../api/URL";
import { normalizeUrl } from "../lib/url";

/* ----------------------------- Types ----------------------------- */

interface LinklyLandingProps {
  loginPath?: string;
  signupPath?: string;
}

interface PreviewLink {
  short: string;
  original: string;
  clicks: string;
}

interface InfoItem {
  icon: ReactNode;
  title: string;
  text: string;
}

const API_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";
const PAGE_BG = "#FAFAFC";
const SURFACE_MUTED = "#F4F4F5";
const MONO = '"JetBrains Mono", ui-monospace, Consolas, monospace';

/* ----------------------------- Static data ----------------------------- */

const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
] as const;

const HERO_BULLETS = [
  "Free to start",
  "Real-time click counts",
  "Fast global redirects",
];

// Sample data for the illustrative dashboard preview
const PREVIEW_STATS: { label: string; value: string; icon: ReactNode }[] = [
  { label: "Total Links", value: "148", icon: <LinkIcon /> },
  { label: "Total Clicks", value: "12,480", icon: <AdsClickIcon /> },
];

const PREVIEW_LINKS: PreviewLink[] = [
  {
    short: "lnk.ly/q4-roadmap",
    original: "https://notion.so/acme/product-roadmap-2026",
    clicks: "4,210",
  },
  {
    short: "lnk.ly/pricing",
    original: "https://acme.io/enterprise-plans-and-tiers",
    clicks: "3,184",
  },
  {
    short: "lnk.ly/docs-api",
    original: "https://developers.acme.io/v2/reference",
    clicks: "1,895",
  },
];

const FEATURES: InfoItem[] = [
  {
    icon: <BoltIcon />,
    title: "Instant URL Shortening",
    text: "Convert long URLs into short, shareable links.",
  },
  {
    icon: <BarChartIcon />,
    title: "Click Analytics",
    text: "Monitor link activity and clicks.",
  },
  {
    icon: <FolderOpenIcon />,
    title: "Link Management",
    text: "Organize and manage all your shortened URLs.",
  },
  {
    icon: <RocketLaunchIcon />,
    title: "Fast Redirects",
    text: "Redirect users to their destination quickly and seamlessly.",
  },
];

const STEPS: InfoItem[] = [
  {
    icon: <ContentPasteIcon />,
    title: "Paste your long URL",
    text: "Drop any destination link from your browser, campaign, or documentation.",
  },
  {
    icon: <AutoFixHighIcon />,
    title: "Generate your short link",
    text: "Linkly creates a clean, reliable short URL ready to copy in one click.",
  },
  {
    icon: <TrendingUpIcon />,
    title: "Share and track",
    text: "Post your link anywhere and watch total clicks update in your dashboard.",
  },
];

/* ----------------------------- Helpers ----------------------------- */

const toAbsoluteUrl = (value: string) =>
  value.startsWith("http") ? value : `https://${value}`;

/* ----------------------------- Small components ----------------------------- */

function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        bgcolor: "primary.main",
        color: "primary.contrastText",
        borderRadius: 1.5,
        display: "grid",
        placeItems: "center",
      }}
    >
      <LinkIcon fontSize={size > 32 ? "medium" : "small"} />
    </Box>
  );
}

function IconBadge({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        width: 42,
        height: 42,
        bgcolor: "action.hover",
        color: "primary.main",
        borderRadius: 1.5,
        display: "grid",
        placeItems: "center",
      }}
    >
      {children}
    </Box>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <Box sx={{ maxWidth: 640, mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1.5 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ fontSize: 17 }}>
        {subtitle}
      </Typography>
    </Box>
  );
}

/* ----------------------------- Page ----------------------------- */

export default function LinklyLanding({
  loginPath = "/signin",
  signupPath = "/signup",
}: LinklyLandingProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(toAbsoluteUrl(value));
      setToast(`Copied ${value} to clipboard`);
    } catch {
      setToast("Unable to copy. Please copy the link manually.");
    }
  };

  const handleShorten = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setShortUrl("");

    const normalized = normalizeUrl(url);
    if (!normalized) {
      setError("Enter a valid URL, e.g. https://example.com");
      return;
    }

    setBusy(true);
    try {
      const result = await getShortUrlApiUrlWithoutSignIn(normalized);
      if (!result?.shortId)
        throw new Error("The API did not return a short URL.");
      console.log(API_URL);
      setShortUrl(`${API_URL}/${result.shortId}`);
      setToast("Your short link is ready!");
    } catch (e) {
      setError(
        e instanceof Error && e.message
          ? e.message
          : "Unable to shorten this URL. Please try again."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: PAGE_BG, color: "text.primary" }}>
      {/* HEADER */}
      <AppBar
        position="sticky"
        elevation={0}
        color="inherit"
        sx={{
          bgcolor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 64, gap: 2 }}>
            <Stack
              component={RouterLink}
              to="/"
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
                flex: 1,
              }}
            >
              <LogoMark />
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 18 }}>
                Linkly
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.href}
                  href={item.href}
                  color="inherit"
                  sx={{
                    color: "text.secondary",
                    textTransform: "none",
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: { xs: "none", md: "flex" },
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <Button
                component={RouterLink}
                to={loginPath}
                variant="outlined"
                color="inherit"
                sx={{
                  textTransform: "none",
                  borderColor: "divider",
                  bgcolor: "#fff",
                  px: 2,
                  fontSize: 14,
                  borderRadius: "10px",
                }}
              >
                Log in
              </Button>
              <Button
                component={RouterLink}
                to={signupPath}
                variant="contained"
                sx={{
                  textTransform: "none",
                  px: 2,
                  fontSize: 14,
                  borderRadius: "10px",
                  boxShadow: "none",
                }}
              >
                Get Started
              </Button>
            </Stack>

            <IconButton
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
            <IconButton
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <List>
            {NAV_ITEMS.map((item) => (
              <ListItemButton
                key={item.href}
                component="a"
                href={item.href}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </ListItemButton>
            ))}
            <Divider sx={{ my: 1 }} />
            <ListItemButton component={RouterLink} to={loginPath}>
              Log in
            </ListItemButton>
            <ListItemButton
              component={RouterLink}
              to={signupPath}
              sx={{ color: "primary.main", fontWeight: 700 }}
            >
              Get Started
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      {/* HERO */}
      <Box
        sx={{ py: { xs: 6, md: 10 }, borderBottom: 1, borderColor: "divider" }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={{ xs: 5, md: 7 }}
            sx={{ alignItems: "center" }}
          >
            <Grid size={{ xs: 12, lg: 6 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: 36, md: 48 },
                      lineHeight: 1.15,
                      letterSpacing: "-1.5px",
                      fontWeight: 700,
                      mb: 2,
                      color: "#18181B",
                    }}
                  >
                    Shorten your links.
                    <Box
                      component="span"
                      sx={{ display: "block", color: "primary.main" }}
                    >
                      Share them anywhere.
                    </Box>
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ fontSize: 16, lineHeight: 1.65, maxWidth: 440 }}
                  >
                    Turn long URLs into short, shareable links and track their
                    performance — all in one place.
                  </Typography>
                </Box>

                <Paper
                  variant="outlined"
                  sx={{
                    p: { xs: 2, sm: 3 },
                    borderRadius: "16px",
                    borderColor: "divider",
                  }}
                >
                  <Box component="form" onSubmit={handleShorten} noValidate>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1.5}
                    >
                      <TextField
                        fullWidth
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://your-long-url.com/campaign/spring"
                        type="url"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            bgcolor: SURFACE_MUTED,
                            borderRadius: "10px",
                            fontSize: 14,
                            "& fieldset": { borderColor: "divider" },
                          },
                          "& .MuiOutlinedInput-input": { py: "13px" },
                        }}
                        slotProps={{
                          htmlInput: { "aria-label": "Long URL" },
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <LanguageIcon fontSize="small" color="action" />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={busy}
                        sx={{
                          whiteSpace: "nowrap",
                          px: 3,
                          minHeight: 48,
                          borderRadius: "10px",
                          boxShadow: "none",
                          textTransform: "none",
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                      >
                        {busy ? "Shortening…" : "Shorten URL"}
                      </Button>
                    </Stack>
                  </Box>

                  {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {error}
                    </Alert>
                  )}

                  {shortUrl && (
                    <Paper
                      variant="outlined"
                      sx={{
                        mt: 2,
                        p: 1.5,
                        bgcolor: "action.hover",
                        borderColor: "primary.light",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <CheckCircleIcon color="primary" />
                      <Typography
                        sx={{
                          flex: 1,
                          color: "primary.dark",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {shortUrl}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<ContentCopyIcon />}
                        onClick={() => copy(shortUrl)}
                        sx={{ textTransform: "none" }}
                      >
                        Copy
                      </Button>
                    </Paper>
                  )}

                  <Stack
                    direction="row"
                    useFlexGap
                    sx={{ flexWrap: "wrap", gap: 2, mt: 2.5 }}
                  >
                    {HERO_BULLETS.map((text) => (
                      <Stack
                        key={text}
                        direction="row"
                        spacing={0.5}
                        sx={{ alignItems: "center" }}
                      >
                        <CheckIcon color="primary" sx={{ fontSize: 14 }} />
                        <Typography variant="caption" color="text.secondary">
                          {text}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Paper>
              </Stack>
            </Grid>

            {/* Static illustrative product preview (sample data) */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <Paper
                variant="outlined"
                sx={{
                  overflow: "hidden",
                  borderRadius: "16px",
                  boxShadow: "0 8px 32px rgba(24,24,27,.04)",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#fff",
                    px: 2,
                    py: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{ alignItems: "center" }}
                    spacing={1}
                  >
                    <LogoMark size={26} />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, fontSize: 13 }}
                    >
                      Linkly Dashboard
                    </Typography>
                  </Stack>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontFamily: MONO }}
                  >
                    app.linkly.io
                  </Typography>
                </Box>

                <Box sx={{ p: { xs: 2, sm: 2.5 }, bgcolor: PAGE_BG }}>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    {PREVIEW_STATS.map(({ label, value, icon }) => (
                      <Grid size={6} key={label}>
                        <Paper
                          variant="outlined"
                          sx={{ p: 2, bgcolor: "#fff", borderRadius: "16px" }}
                        >
                          <Stack
                            direction="row"
                            sx={{
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {label}
                            </Typography>
                            <Box
                              sx={{
                                color: "primary.main",
                                display: "flex",
                                "& svg": { fontSize: 15 },
                              }}
                            >
                              {icon}
                            </Box>
                          </Stack>
                          <Typography
                            variant="h5"
                            sx={{ fontWeight: 500, fontSize: 22, mt: 0.5 }}
                          >
                            {value}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>

                  <Paper
                    variant="outlined"
                    sx={{
                      overflow: "hidden",
                      borderRadius: "16px",
                      bgcolor: "#fff",
                    }}
                  >
                    <Box
                      sx={{
                        px: 2,
                        py: 1.25,
                        bgcolor: PAGE_BG,
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: 1,
                        borderColor: "divider",
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        Recent links
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Clicks
                      </Typography>
                    </Box>
                    {PREVIEW_LINKS.map((item) => (
                      <Box
                        key={item.short}
                        sx={{
                          px: 2,
                          py: 1.5,
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          borderBottom: 1,
                          borderColor: "divider",
                          "&:last-child": { borderBottom: 0 },
                        }}
                      >
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography
                            variant="body2"
                            noWrap
                            sx={{
                              color: "primary.main",
                              fontFamily: MONO,
                              fontSize: 12.5,
                            }}
                          >
                            {item.short}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            noWrap
                            sx={{ display: "block" }}
                          >
                            {item.original}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: MONO,
                            fontWeight: 500,
                            fontSize: 13,
                          }}
                        >
                          {item.clicks}
                        </Typography>
                        <IconButton
                          size="small"
                          aria-label={`Copy ${item.short}`}
                          onClick={() => copy(item.short)}
                          sx={{
                            border: 1,
                            borderColor: "divider",
                            borderRadius: "8px",
                            p: 0.75,
                          }}
                        >
                          <ContentCopyIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Box>
                    ))}
                  </Paper>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FEATURES */}
      <Box
        id="features"
        sx={{ py: { xs: 6, md: 9 }, borderBottom: 1, borderColor: "divider" }}
      >
        <Container maxWidth="lg">
          <SectionHeading
            title="Built for speed and clarity"
            subtitle="Everything you need to shorten, organize, and measure your links without bloated menus."
          />
          <Grid container spacing={2.5}>
            {FEATURES.map((item) => (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={item.title}>
                <Card
                  variant="outlined"
                  sx={{
                    height: "100%",
                    borderRadius: 2.5,
                    transition: "border-color .15s",
                    "&:hover": { borderColor: "primary.light" },
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ mb: 2 }}>
                      <IconBadge>{item.icon}</IconBadge>
                    </Box>
                    <Typography sx={{ fontWeight: 600, mb: 0.75 }}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {item.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* HOW IT WORKS */}
      <Box
        id="how-it-works"
        sx={{ py: { xs: 6, md: 9 }, borderBottom: 1, borderColor: "divider" }}
      >
        <Container maxWidth="lg">
          <SectionHeading
            title="How it works"
            subtitle="Go from a long, unwieldy URL to a clean, trackable link in three steps."
          />
          <Grid container spacing={2.5}>
            {STEPS.map((item, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={item.title}>
                <Card
                  variant="outlined"
                  sx={{ height: "100%", borderRadius: 2.5 }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack
                      direction="row"
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <IconBadge>{item.icon}</IconBadge>
                      <Chip
                        label={`0${index + 1}`}
                        size="small"
                        sx={{
                          bgcolor: "grey.100",
                          color: "text.secondary",
                          fontWeight: 600,
                        }}
                      />
                    </Stack>
                    <Typography sx={{ fontWeight: 600, mb: 0.75 }}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {item.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ py: { xs: 6, md: 9 } }}>
        <Container maxWidth="md">
          <Paper
            variant="outlined"
            sx={{
              bgcolor: "grey.100",
              borderRadius: 3,
              p: { xs: 3, md: 6 },
              textAlign: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1.5 }}>
              Ready to simplify your links?
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ maxWidth: 520, mx: "auto", mb: 3 }}
            >
              Create your free Linkly account and start managing your short URLs
              in seconds.
            </Typography>
            <Button
              component={RouterLink}
              to={signupPath}
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{ textTransform: "none", px: 3, py: 1.25 }}
            >
              Get Started — It’s Free
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box
        component="footer"
        sx={{ borderTop: 1, borderColor: "divider", py: 4 }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "center", mb: 1 }}
              >
                <LogoMark size={32} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Linkly
                </Typography>
              </Stack>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ maxWidth: 360 }}
              >
                A fast, minimal URL shortener and click analytics workspace
                built for modern teams.
              </Typography>
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Product
              </Typography>
              <Stack spacing={0.75} sx={{ alignItems: "flex-start" }}>
                {NAV_ITEMS.map((item) => (
                  <Button
                    key={item.href}
                    href={item.href}
                    sx={{
                      textTransform: "none",
                      color: "text.secondary",
                      p: 0,
                      minWidth: 0,
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                <Button
                  component={RouterLink}
                  to="/dashboard"
                  sx={{
                    textTransform: "none",
                    color: "text.secondary",
                    p: 0,
                    minWidth: 0,
                  }}
                >
                  Dashboard
                </Button>
              </Stack>
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Account
              </Typography>
              <Stack spacing={0.75} sx={{ alignItems: "flex-start" }}>
                <Button
                  component={RouterLink}
                  to={loginPath}
                  sx={{
                    textTransform: "none",
                    color: "text.secondary",
                    p: 0,
                    minWidth: 0,
                  }}
                >
                  Log in
                </Button>
                <Button
                  component={RouterLink}
                  to={signupPath}
                  sx={{
                    textTransform: "none",
                    color: "text.secondary",
                    p: 0,
                    minWidth: 0,
                  }}
                >
                  Get Started
                </Button>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} Linkly. All rights reserved.
          </Typography>
        </Container>
      </Box>

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={2600}
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
