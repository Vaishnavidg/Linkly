import { useState, type FormEvent } from "react";
import { Alert, Box, Button, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LanguageIcon from "@mui/icons-material/Language";

import { API_URL } from "../../api/config";
import { getShortUrlApiUrlWithoutSignIn } from "../../api/urls";
import { normalizeUrl } from "../../lib/url";
import { SURFACE_MUTED } from "../../theme/tokens";
import { HERO_BULLETS } from "./content";

interface ShortenerCardProps {
  onCopy: (value: string) => void;
  onNotify: (message: string) => void;
}

/** The anonymous "paste a URL, get a short link" form. */
export function ShortenerCard({ onCopy, onNotify }: ShortenerCardProps) {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      if (!result?.shortId) throw new Error("The API did not return a short URL.");
      setShortUrl(`${API_URL}/${result.shortId}`);
      onNotify("Your short link is ready!");
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Unable to shorten this URL. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: "16px", borderColor: "divider" }}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
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
            sx={{ whiteSpace: "nowrap", px: 3, minHeight: 48, borderRadius: "10px", boxShadow: "none", textTransform: "none", fontWeight: 600, fontSize: 14 }}
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
          sx={{ mt: 2, p: 1.5, bgcolor: "action.hover", borderColor: "primary.light", display: "flex", alignItems: "center", gap: 1 }}
        >
          <CheckCircleIcon color="primary" />
          <Typography sx={{ flex: 1, color: "primary.dark", overflowWrap: "anywhere" }}>{shortUrl}</Typography>
          <Button size="small" variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => onCopy(shortUrl)} sx={{ textTransform: "none" }}>
            Copy
          </Button>
        </Paper>
      )}

      <Stack direction="row" useFlexGap sx={{ flexWrap: "wrap", gap: 2, mt: 2.5 }}>
        {HERO_BULLETS.map((text) => (
          <Stack key={text} direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
            <CheckIcon color="primary" sx={{ fontSize: 14 }} />
            <Typography variant="caption" color="text.secondary">
              {text}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
