import { Link2, MousePointerClick } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import Header from "../components.tsx/Header";
import { UrlResult } from "../components.tsx/UrlResult";
import { UrlInput } from "../components.tsx/UrlInput";
import { useNavigate } from "react-router-dom";
import { UrlTable } from "../components.tsx/UrlTable";
import { StatCard } from "../components.tsx/StatCard";
import { useAuth } from "../hook/auth";
import { getShortUrlApiUrl, getUserUrls } from "../api/URL";

export default function DashboardPage() {
  const { user, ready, signOut } = useAuth();
  console.log("DashboardPage user:", user);
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [loadingUrls, setLoadingUrls] = useState(false);
  const [urls, setUserUrls] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    if (ready && !user) {
      void navigate("/");
    }
  }, [ready, user, navigate]);

  async function handleCreate() {
    console.log("Creating short URL for:", url);
    setCreateError(null);
    setCreating(true);
    try {
      const result = await getShortUrlApiUrl(url);
      console.log("Short URL result:", result);
      if (!result) {
        throw new Error("Failed to shorten the URL. Please try again.");
      }

      setResult(result.shortId);
      setUrl("");
    } catch (err) {
      setCreateError(
        err instanceof Error
          ? err.message
          : "Could not shorten that URL. Please try again."
      );
    } finally {
      setCreating(false);
    }
  }

  useEffect(() => {
    if (!user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserUrls([]);
      return;
    }
    const fetchUserUrls = async () => {
      console.log("get user's urls", user);
      setCreateError(null);
      setLoadingUrls(true);
      try {
        const result = await getUserUrls();
        console.log("data from get users urls", result.data);
        setUserUrls(result.data);

        setLoadingUrls(false);
      } catch (err) {
        setCreateError(
          err instanceof Error
            ? err.message
            : "Could not get urls. Please try again."
        );
      } finally {
        setLoadingUrls(false);
      }
    };

    fetchUserUrls();
  }, [user]);

  useEffect(() => {
    const totalClicks = urls.reduce(
      (sum, url) => sum + url.visitHistory.length,
      0
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTotalClicks(totalClicks);
  }, [urls]);

  // Authentication Loading State
  if (!ready || !user) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <CircularProgress size={28} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <Header dashboard signOut={signOut} />

      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flex: 1,
          py: 4,
          px: { xs: 2, sm: 3 },
        }}
      >
        {/* Dashboard Heading */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              letterSpacing: "-0.5px",
              fontWeight: 700,
              color: "primary.main",
            }}
          >
            Dashboard
          </Typography>

          <Typography variant="body2" sx={{ mt: 0.5, color: "text.primary" }}>
            Signed in as {user?.email}
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3, 1fr)",
            },
            gap: 2,
            mb: 4,
          }}
        >
          <StatCard label="Total Links" value={urls.length} icon={Link2} />

          <StatCard
            label="Total Clicks"
            value={totalClicks}
            icon={MousePointerClick}
          />

          {/* <StatCard label="Active Links" value={activeLinks} icon={Activity} /> */}
        </Box>

        {/* Create Short URL Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3 },
            mb: 4,
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Create a short URL
          </Typography>

          {result ? (
            <UrlResult shortUrl={result} onReset={() => setResult(null)} />
          ) : (
            <UrlInput
              value={url}
              onChange={setUrl}
              onSubmit={handleCreate}
              loading={creating}
              error={createError}
              placeholder="https://example.com/a-very-long-url"
            />
          )}
        </Paper>

        {/* My Links Section */}
        <Paper
          elevation={0}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
            bgcolor: "background.paper",
            overflow: "hidden",
          }}
        >
          {/* Section Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: { xs: 2.5, sm: 3 },
              py: 2,
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              My Links
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {urls.length} {urls.length === 1 ? "link" : "links"}
            </Typography>
          </Box>
          {/* Loading State */}
          {loadingUrls ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 6,
              }}
            >
              <CircularProgress size={24} />
            </Box>
          ) : urls.length === 0 ? (
            /* Empty State */
            <Stack
              spacing={1}
              sx={{
                px: 3,
                py: 6,
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontWeight: 600, color: "text.primary" }}>
                No links yet
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Create your first short URL above and it will appear here.
              </Typography>
            </Stack>
          ) : (
            /* URL Table */
            <UrlTable
              urls={urls}
              // onDelete={handleDelete}
              // deletingId={deletingId}
            />
          )}
        </Paper>

        {/* Mobile Logout Button */}
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Button
            variant="outlined"
            size="small"
            // onClick={signOut}
            sx={{
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Log out
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
