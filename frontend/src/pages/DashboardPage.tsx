import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Drawer,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import AddLinkIcon from "@mui/icons-material/AddLink";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import SearchIcon from "@mui/icons-material/Search";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { useAuth } from "../hook/auth";
import { API_URL, getShortUrlApiUrl, getUserUrls } from "../api/URL";
import { copyToClipboard } from "../components.tsx/UrlResult";
import type { ShortUrl } from "../types/index";
import { StatCard } from "../components.tsx/StatCard";
import {
  SidebarContent,
  type NavId,
  type SidebarProps,
} from "../components.tsx/SidebarContent";
import {
  MONO,
  MUTED_TEXT,
  OUTLINE,
  PAGE_BG,
  SURFACE_MUTED,
} from "../lib/tokens";

/* ----------------------------- Design tokens ----------------------------- */

const SIDEBAR_WIDTH = 240;

/* ----------------------------- Helpers ----------------------------- */

const shortLink = (url: ShortUrl) => `${API_URL}/${url.shortId}`;
const stripProtocol = (value: string) => value.replace(/^https?:\/\//, "");
const clicksOf = (url: ShortUrl) => url.visitHistory?.length ?? 0;
const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : format(date, "MMM dd, yyyy");
};

/* ----------------------------- Small components ----------------------------- */

const iconButtonSx = {
  width: 32,
  height: 32,
  borderRadius: "8px",
  border: 1,
  borderColor: OUTLINE,
  color: MUTED_TEXT,
  "&:hover": { color: "text.primary", bgcolor: SURFACE_MUTED },
};

const headCellSx = {
  py: 1.5,
  px: 2,
  fontSize: 12,
  fontWeight: 500,
  color: MUTED_TEXT,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  borderColor: OUTLINE,
  bgcolor: PAGE_BG,
} as const;

/* ----------------------------- Page ----------------------------- */

export default function DashboardPage() {
  const { user, ready, signOut } = useAuth();
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavId>("overview");

  const [url, setUrl] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createdLink, setCreatedLink] = useState("");

  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [loadingUrls, setLoadingUrls] = useState(true);
  const [listError, setListError] = useState("");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (ready && !user) void navigate("/");
  }, [ready, user, navigate]);

  const userId = user?.id;
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    (async () => {
      try {
        const result = await getUserUrls();
        if (cancelled) return;
        setUrls(result.data ?? []);
        setListError("");
      } catch (err) {
        if (!cancelled)
          setListError(
            err instanceof Error
              ? err.message
              : "Could not load your links. Please try again."
          );
      } finally {
        if (!cancelled) setLoadingUrls(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, refreshKey]);

  const totalClicks = useMemo(
    () => urls.reduce((sum, item) => sum + clicksOf(item), 0),
    [urls]
  );

  const filteredUrls = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return urls;
    return urls.filter(
      (item) =>
        shortLink(item).toLowerCase().includes(q) ||
        item.originalUrl.toLowerCase().includes(q)
    );
  }, [urls, search]);

  const copy = async (value: string) => {
    const ok = await copyToClipboard(value);
    setToast(
      ok
        ? `Copied ${stripProtocol(value)} to clipboard`
        : "Unable to copy. Please copy the link manually."
    );
  };

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreateError("");
    setCreatedLink("");
    setCreating(true);
    try {
      const result = await getShortUrlApiUrl(url);
      if (!result?.shortId)
        throw new Error("Failed to shorten the URL. Please try again.");
      setCreatedLink(`${API_URL}/${result.shortId}`);
      setUrl("");
      setToast("Short link created");
      setRefreshKey((key) => key + 1);
    } catch (err) {
      setCreateError(
        err instanceof Error
          ? err.message
          : "Could not shorten that URL. Please try again."
      );
    } finally {
      setCreating(false);
    }
  };

  const focusCreateInput = () => {
    const input = document.getElementById("dashboard-url-input");
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
      <Box
        sx={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          bgcolor: PAGE_BG,
        }}
      >
        <CircularProgress size={28} />
      </Box>
    );
  }

  const firstName = user.name?.split(" ")[0] || user.email.split("@")[0];
  const sidebarProps: SidebarProps = {
    active: activeNav,
    onNavigate: (id) => {
      setActiveNav(id);
      setDrawerOpen(false);
      scrollToSection(id);
    },
    name: user.name,
    email: user.email,
    onSignOut: signOut,
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: PAGE_BG,
        color: "text.primary",
      }}
    >
      {/* Desktop sidebar */}
      <Box
        component="aside"
        sx={{
          display: { xs: "none", lg: "block" },
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          height: "100vh",
          position: "sticky",
          top: 0,
          borderRight: 1,
          borderColor: OUTLINE,
        }}
      >
        <SidebarContent {...sidebarProps} />
      </Box>

      {/* Mobile drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { lg: "none" }, "& .MuiDrawer-paper": { width: 256 } }}
      >
        <Box sx={{ position: "absolute", top: 12, right: 12, zIndex: 1 }}>
          <IconButton
            aria-label="Close navigation"
            size="small"
            onClick={() => setDrawerOpen(false)}
            sx={iconButtonSx}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <SidebarContent {...sidebarProps} />
      </Drawer>

      {/* Main shell */}
      <Box
        sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}
      >
        <Box
          component="header"
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            height: 64,
            px: { xs: 2, sm: 3 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            bgcolor: "#fff",
            borderBottom: 1,
            borderColor: OUTLINE,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", minWidth: 0 }}
          >
            <IconButton
              aria-label="Open navigation menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ ...iconButtonSx, display: { lg: "none" } }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
            <Typography
              component="h1"
              noWrap
              sx={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.2px" }}
            >
              Dashboard
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Chip
              icon={
                <PersonOutlinedIcon
                  sx={{ fontSize: 16, color: "primary.main !important" }}
                />
              }
              label={user.email}
              variant="outlined"
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                bgcolor: PAGE_BG,
                borderColor: OUTLINE,
                color: MUTED_TEXT,
                fontSize: 13,
              }}
            />
            <Button
              variant="contained"
              startIcon={<AddLinkIcon />}
              onClick={focusCreateInput}
              sx={{
                textTransform: "none",
                height: 40,
                px: 2,
                borderRadius: "12px",
                boxShadow: "none",
                fontWeight: 500,
              }}
            >
              Create Link
            </Button>
          </Stack>
        </Box>

        <Stack
          component="main"
          id="overview"
          tabIndex={-1}
          spacing={3}
          sx={{
            outline: "none",
            flex: 1,
            width: "100%",
            maxWidth: 1152,
            mx: "auto",
            p: { xs: 2, sm: 3, lg: 4 },
            scrollMarginTop: 80,
          }}
        >
          <Box>
            <Typography
              component="h2"
              sx={{
                fontSize: 24,
                lineHeight: "32px",
                fontWeight: 600,
                letterSpacing: "-0.25px",
              }}
            >
              Welcome back, {firstName}
            </Typography>
            <Typography sx={{ fontSize: 14, color: MUTED_TEXT }}>
              Create new short links and monitor click performance across your
              workspace.
            </Typography>
          </Box>

          {/* Stats */}
          <Box
            component="section"
            aria-label="Overview statistics"
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: { xs: 2, sm: 3 },
            }}
          >
            <StatCard
              label="Total Links"
              value={urls.length}
              icon={<LinkIcon />}
            />
            <StatCard
              label="Total Clicks"
              value={totalClicks}
              icon={<AdsClickIcon />}
            />
          </Box>

          {/* Create short URL */}
          <Paper
            component="section"
            aria-label="Create short URL"
            variant="outlined"
            sx={{ p: 3, borderRadius: "16px", borderColor: OUTLINE }}
          >
            <Typography component="h2" sx={{ fontSize: 16, fontWeight: 600 }}>
              Create Short URL
            </Typography>
            <Typography sx={{ fontSize: 13, color: MUTED_TEXT, mb: 2 }}>
              Paste any long destination URL to generate a trackable Linkly
              link.
            </Typography>

            <Box component="form" onSubmit={handleCreate} noValidate>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <TextField
                  id="dashboard-url-input"
                  fullWidth
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/product/release-notes"
                  error={Boolean(createError)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: PAGE_BG,
                      borderRadius: "12px",
                      fontSize: 14,
                      "& fieldset": { borderColor: OUTLINE },
                    },
                    "& .MuiOutlinedInput-input": { py: "12px" },
                  }}
                  slotProps={{
                    htmlInput: { "aria-label": "Destination URL" },
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LanguageIcon
                            fontSize="small"
                            sx={{ color: MUTED_TEXT }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={creating}
                  sx={{
                    flexShrink: 0,
                    height: 44,
                    px: 2.5,
                    borderRadius: "12px",
                    boxShadow: "none",
                    textTransform: "none",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {creating ? "Shortening…" : "Shorten URL"}
                </Button>
              </Stack>
            </Box>

            {createError && (
              <Stack
                direction="row"
                spacing={0.5}
                role="alert"
                sx={{ alignItems: "center", mt: 1.5, color: "error.main" }}
              >
                <ErrorOutlinedIcon sx={{ fontSize: 16 }} />
                <Typography sx={{ fontSize: 13 }}>{createError}</Typography>
              </Stack>
            )}

            {createdLink && (
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 1.5,
                  p: 1.5,
                  borderRadius: "12px",
                  bgcolor: "#DCFCE7",
                  border: 1,
                  borderColor: OUTLINE,
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center", minWidth: 0 }}
                >
                  <CheckCircleIcon
                    sx={{ fontSize: 20, color: "#166534", flexShrink: 0 }}
                  />
                  <Typography
                    sx={{ fontSize: 13, color: "#166534", flexShrink: 0 }}
                  >
                    Link created:
                  </Typography>
                  <Typography
                    noWrap
                    sx={{
                      fontFamily: MONO,
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#166534",
                    }}
                  >
                    {stripProtocol(createdLink)}
                  </Typography>
                </Stack>
                <Button
                  size="small"
                  variant="outlined"
                  color="inherit"
                  startIcon={<ContentCopyIcon sx={{ fontSize: 14 }} />}
                  onClick={() => copy(createdLink)}
                  sx={{
                    flexShrink: 0,
                    textTransform: "none",
                    bgcolor: "#fff",
                    borderColor: OUTLINE,
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                >
                  Copy
                </Button>
              </Stack>
            )}
          </Paper>

          {/* My links */}
          <Paper
            component="section"
            id="my-links"
            tabIndex={-1}
            aria-label="My Links"
            variant="outlined"
            sx={{
              outline: "none",
              borderRadius: "16px",
              borderColor: OUTLINE,
              overflow: "hidden",
              scrollMarginTop: 80,
              transition: "border-color .15s, box-shadow .15s",
              // Same highlight as a focused text field: primary border + 1px ring
              "&:focus": {
                borderColor: "primary.main",
                boxShadow: (theme) => `0 0 0 1px ${theme.palette.primary.main}`,
              },
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{
                p: { xs: 2, sm: 3 },
                alignItems: { sm: "center" },
                justifyContent: "space-between",
                borderBottom: 1,
                borderColor: OUTLINE,
              }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Typography
                  component="h2"
                  sx={{ fontSize: 16, fontWeight: 600 }}
                >
                  My Links
                </Typography>
                <Chip
                  label={urls.length}
                  size="small"
                  sx={{
                    bgcolor: SURFACE_MUTED,
                    fontFamily: MONO,
                    fontSize: 12,
                    height: 22,
                  }}
                />
              </Stack>
              <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search short or original URL..."
                sx={{
                  width: { xs: "100%", sm: 288 },
                  "& .MuiOutlinedInput-root": {
                    bgcolor: PAGE_BG,
                    borderRadius: "12px",
                    fontSize: 14,
                    "& fieldset": { borderColor: OUTLINE },
                  },
                  "& .MuiOutlinedInput-input": { py: "9px" },
                }}
                slotProps={{
                  htmlInput: { "aria-label": "Search links" },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon
                          fontSize="small"
                          sx={{ color: MUTED_TEXT }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>

            {listError && (
              <Alert severity="error" sx={{ m: 2 }}>
                {listError}
              </Alert>
            )}

            {loadingUrls && urls.length === 0 ? (
              <Box sx={{ display: "grid", placeItems: "center", py: 6 }}>
                <CircularProgress size={24} />
              </Box>
            ) : filteredUrls.length === 0 ? (
              <Stack
                spacing={1}
                sx={{ alignItems: "center", textAlign: "center", p: 4 }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    bgcolor: SURFACE_MUTED,
                    color: MUTED_TEXT,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <LinkOffIcon />
                </Box>
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  {urls.length === 0 ? "No links yet" : "No links found"}
                </Typography>
                <Typography
                  sx={{ fontSize: 14, color: MUTED_TEXT, maxWidth: 360 }}
                >
                  {urls.length === 0
                    ? "Create your first short URL above and it will appear here."
                    : "Try a different search query or create a new short link above."}
                </Typography>
              </Stack>
            ) : (
              <>
                {/* Table (tablet and up) */}
                <TableContainer sx={{ display: { xs: "none", md: "block" } }}>
                  <Table
                    sx={{ "& .MuiTableCell-root": { borderColor: OUTLINE } }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell sx={headCellSx}>Shortened URL</TableCell>
                        <TableCell sx={headCellSx}>Original URL</TableCell>
                        <TableCell sx={headCellSx} align="right">
                          Clicks
                        </TableCell>
                        <TableCell sx={headCellSx}>Created</TableCell>
                        <TableCell sx={headCellSx} align="right">
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredUrls.map((item) => (
                        <TableRow
                          key={item.id}
                          hover
                          sx={{ "&:last-child td": { borderBottom: 0 } }}
                        >
                          <TableCell
                            sx={{ py: 1.75, px: 2, whiteSpace: "nowrap" }}
                          >
                            <Typography
                              component="a"
                              href={shortLink(item)}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                fontFamily: MONO,
                                fontSize: 13,
                                fontWeight: 500,
                                color: "primary.main",
                                textDecoration: "none",
                              }}
                            >
                              {stripProtocol(shortLink(item))}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 1.75, px: 2, maxWidth: 320 }}>
                            <Typography
                              noWrap
                              title={item.originalUrl}
                              sx={{ fontSize: 14, color: MUTED_TEXT }}
                            >
                              {item.originalUrl}
                            </Typography>
                          </TableCell>
                          <TableCell align="right" sx={{ py: 1.75, px: 2 }}>
                            <Typography
                              sx={{
                                fontFamily: MONO,
                                fontSize: 13,
                                fontWeight: 500,
                              }}
                            >
                              {clicksOf(item).toLocaleString("en-US")}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{ py: 1.75, px: 2, whiteSpace: "nowrap" }}
                          >
                            <Typography
                              sx={{ fontSize: 13, color: MUTED_TEXT }}
                            >
                              {formatDate(item.createdAt)}
                            </Typography>
                          </TableCell>
                          <TableCell align="right" sx={{ py: 1.75, px: 2 }}>
                            <IconButton
                              aria-label={`Copy ${stripProtocol(
                                shortLink(item)
                              )}`}
                              onClick={() => copy(shortLink(item))}
                              sx={iconButtonSx}
                            >
                              <ContentCopyIcon sx={{ fontSize: 15 }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Card list (mobile) */}
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                  {filteredUrls.map((item) => (
                    <Stack
                      key={item.id}
                      spacing={1}
                      sx={{
                        p: 2,
                        borderBottom: 1,
                        borderColor: OUTLINE,
                        "&:last-child": { borderBottom: 0 },
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          noWrap
                          sx={{
                            fontFamily: MONO,
                            fontSize: 13,
                            fontWeight: 500,
                            color: "primary.main",
                          }}
                        >
                          {stripProtocol(shortLink(item))}
                        </Typography>
                        <Typography
                          sx={{ fontFamily: MONO, fontSize: 12, flexShrink: 0 }}
                        >
                          {clicksOf(item).toLocaleString("en-US")} clicks
                        </Typography>
                      </Stack>
                      <Typography
                        noWrap
                        title={item.originalUrl}
                        sx={{ fontSize: 13, color: MUTED_TEXT }}
                      >
                        {item.originalUrl}
                      </Typography>
                      <Stack
                        direction="row"
                        sx={{
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography sx={{ fontSize: 13, color: MUTED_TEXT }}>
                          {formatDate(item.createdAt)}
                        </Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          color="inherit"
                          startIcon={<ContentCopyIcon sx={{ fontSize: 14 }} />}
                          onClick={() => copy(shortLink(item))}
                          sx={{
                            textTransform: "none",
                            borderColor: OUTLINE,
                            borderRadius: "8px",
                            color: MUTED_TEXT,
                            fontSize: 12,
                          }}
                        >
                          Copy
                        </Button>
                      </Stack>
                    </Stack>
                  ))}
                </Box>
              </>
            )}
          </Paper>
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
