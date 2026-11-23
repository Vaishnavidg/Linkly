import { useState } from "react";

import { Box, Typography, Stack, Container } from "@mui/material";

import BoltIcon from "@mui/icons-material/Bolt";
import LinkIcon from "@mui/icons-material/Link";
import SecurityIcon from "@mui/icons-material/Security";
import Header from "../components.tsx/Header";
import { UrlInput } from "../components.tsx/UrlInput";
import { UrlResult } from "../components.tsx/UrlResult";
import { getShortUrlApiUrlWithoutSignIn } from "../api/URL";

function LandingPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  // Backend integration for URL shortening
  const handleShorten = async () => {
    console.log("hello");
    setLoading(true);
    const shortUrl = await getShortUrlApiUrlWithoutSignIn(url);
    if (shortUrl) {
      setResult(shortUrl.shortId);
      setError(null);
      setLoading(false);
    } else {
      setError("Failed to shorten the URL. Please try again.");
    }
  };

  function handleReset() {
    setResult(null);
    setError(null);
    setUrl("");
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
      <Header dashboard={false} />
      {/* Main Content */}
      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 8, sm: 12 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 650 }}>
          {result ? (
            /* URL Result Section */
            <Stack spacing={4}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: {
                      xs: "2rem",
                      sm: "2.5rem",
                    },
                    color: "text.primary",
                  }}
                >
                  Your link is ready!
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    color: "text.secondary",
                  }}
                >
                  Copy it and share it anywhere.
                </Typography>
              </Box>

              <UrlResult shortUrl={result} onReset={handleReset} />
            </Stack>
          ) : (
            /* URL Shortener Section */
            <Stack spacing={4}>
              {/* Heading */}

              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 750,
                    letterSpacing: "-1.5px",
                    fontSize: {
                      xs: "2.25rem",
                      sm: "3.25rem",
                    },
                    lineHeight: 1.2,
                    color: "text.primary",
                  }}
                >
                  Shorten your links.
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      color: "primary.main",
                    }}
                  >
                    Share them anywhere.
                  </Box>
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mt: 2,
                    fontSize: "1.1rem",
                    color: "text.secondary",
                  }}
                >
                  Turn long URLs into short, shareable links in seconds.
                </Typography>
              </Box>

              {/* URL Input */}

              <UrlInput
                value={url}
                onChange={setUrl}
                onSubmit={handleShorten}
                loading={loading}
                error={error}
                centered
              />

              {/* Supporting Text */}

              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                No sign-up required. Start shortening for free.
              </Typography>

              {/* Features */}

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={{
                  xs: 2,
                  sm: 4,
                }}
                sx={{
                  pt: 2,
                  color: "text.secondary",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <BoltIcon color="primary" fontSize="small" />
                  <Typography variant="body2">Instant short links</Typography>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <LinkIcon color="primary" fontSize="small" />
                  <Typography variant="body2">Free forever</Typography>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <SecurityIcon color="primary" fontSize="small" />
                  <Typography variant="body2">
                    Links that keep working
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default LandingPage;
