import { useState, type FormEvent } from "react";
import { Box, Button, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import LanguageIcon from "@mui/icons-material/Language";

import { API_URL } from "../../api/config";
import { getShortUrlApiUrl } from "../../api/urls";
import { CREATE_URL_INPUT_ID, stripProtocol } from "../../lib/links";
import { MONO, MUTED_TEXT, OUTLINE, outlinedFieldSx } from "../../theme/tokens";

const SUCCESS_TEXT = "#166534";

interface CreateLinkCardProps {
  /** Called after a link was created, so the list can refresh. */
  onCreated: () => void;
  onCopy: (value: string) => void;
}

export function CreateLinkCard({ onCreated, onCopy }: CreateLinkCardProps) {
  const [url, setUrl] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [createdLink, setCreatedLink] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setCreatedLink("");
    setCreating(true);
    try {
      const result = await getShortUrlApiUrl(url);
      if (!result?.shortId) throw new Error("Failed to shorten the URL. Please try again.");
      setCreatedLink(`${API_URL}/${result.shortId}`);
      setUrl("");
      onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not shorten that URL. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <Paper component="section" aria-label="Create short URL" variant="outlined" sx={{ p: 3, borderRadius: "16px", borderColor: OUTLINE }}>
      <Typography component="h2" sx={{ fontSize: 16, fontWeight: 600 }}>
        Create Short URL
      </Typography>
      <Typography sx={{ fontSize: 13, color: MUTED_TEXT, mb: 2 }}>
        Paste any long destination URL to generate a trackable Linkly link.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <TextField
            id={CREATE_URL_INPUT_ID}
            fullWidth
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/product/release-notes"
            error={Boolean(error)}
            sx={outlinedFieldSx("12px")}
            slotProps={{
              htmlInput: { "aria-label": "Destination URL" },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LanguageIcon fontSize="small" sx={{ color: MUTED_TEXT }} />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={creating}
            sx={{ flexShrink: 0, height: 44, px: 2.5, borderRadius: "12px", boxShadow: "none", textTransform: "none", fontWeight: 500, whiteSpace: "nowrap" }}
          >
            {creating ? "Shortening…" : "Shorten URL"}
          </Button>
        </Stack>
      </Box>

      {error && (
        <Stack direction="row" spacing={0.5} role="alert" sx={{ alignItems: "center", mt: 1.5, color: "error.main" }}>
          <ErrorOutlinedIcon sx={{ fontSize: 16 }} />
          <Typography sx={{ fontSize: 13 }}>{error}</Typography>
        </Stack>
      )}

      {createdLink && (
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", justifyContent: "space-between", mt: 1.5, p: 1.5, borderRadius: "12px", bgcolor: "#DCFCE7", border: 1, borderColor: OUTLINE }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", minWidth: 0 }}>
            <CheckCircleIcon sx={{ fontSize: 20, color: SUCCESS_TEXT, flexShrink: 0 }} />
            <Typography sx={{ fontSize: 13, color: SUCCESS_TEXT, flexShrink: 0 }}>Link created:</Typography>
            <Typography noWrap sx={{ fontFamily: MONO, fontSize: 13, fontWeight: 500, color: SUCCESS_TEXT }}>
              {stripProtocol(createdLink)}
            </Typography>
          </Stack>
          <Button
            size="small"
            variant="outlined"
            color="inherit"
            startIcon={<ContentCopyIcon sx={{ fontSize: 14 }} />}
            onClick={() => onCopy(createdLink)}
            sx={{ flexShrink: 0, textTransform: "none", bgcolor: "#fff", borderColor: OUTLINE, borderRadius: "8px", fontSize: 12 }}
          >
            Copy
          </Button>
        </Stack>
      )}
    </Paper>
  );
}
