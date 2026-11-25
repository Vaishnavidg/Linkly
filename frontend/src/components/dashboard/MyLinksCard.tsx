import { useMemo, useState } from "react";
import { Alert, Box, Chip, CircularProgress, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import SearchIcon from "@mui/icons-material/Search";

import { LinksCardList } from "./LinksCardList";
import { LinksTable } from "./LinksTable";
import { shortLink } from "../../lib/links";
import { MONO, MUTED_TEXT, OUTLINE, SURFACE_MUTED, outlinedFieldSx } from "../../theme/tokens";
import type { ShortUrl } from "../../types/index";

interface MyLinksCardProps {
  urls: ShortUrl[];
  loading: boolean;
  error: string;
  onCopy: (value: string) => void;
}

function EmptyState({ hasLinks }: { hasLinks: boolean }) {
  return (
    <Stack spacing={1} sx={{ alignItems: "center", textAlign: "center", p: 4 }}>
      <Box sx={{ width: 44, height: 44, borderRadius: "50%", bgcolor: SURFACE_MUTED, color: MUTED_TEXT, display: "grid", placeItems: "center" }}>
        <LinkOffIcon />
      </Box>
      <Typography sx={{ fontSize: 16, fontWeight: 600 }}>{hasLinks ? "No links found" : "No links yet"}</Typography>
      <Typography sx={{ fontSize: 14, color: MUTED_TEXT, maxWidth: 360 }}>
        {hasLinks
          ? "Try a different search query or create a new short link above."
          : "Create your first short URL above and it will appear here."}
      </Typography>
    </Stack>
  );
}

export function MyLinksCard({ urls, loading, error, onCopy }: MyLinksCardProps) {
  const [search, setSearch] = useState("");

  const filteredUrls = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return urls;
    return urls.filter(
      (item) => shortLink(item).toLowerCase().includes(query) || item.originalUrl.toLowerCase().includes(query)
    );
  }, [urls, search]);

  return (
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
        sx={{ p: { xs: 2, sm: 3 }, alignItems: { sm: "center" }, justifyContent: "space-between", borderBottom: 1, borderColor: OUTLINE }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography component="h2" sx={{ fontSize: 16, fontWeight: 600 }}>
            My Links
          </Typography>
          <Chip label={urls.length} size="small" sx={{ bgcolor: SURFACE_MUTED, fontFamily: MONO, fontSize: 12, height: 22 }} />
        </Stack>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search short or original URL..."
          sx={{ width: { xs: "100%", sm: 288 }, ...outlinedFieldSx("9px") }}
          slotProps={{
            htmlInput: { "aria-label": "Search links" },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: MUTED_TEXT }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      {error && (
        <Alert severity="error" sx={{ m: 2 }}>
          {error}
        </Alert>
      )}

      {loading && urls.length === 0 ? (
        <Box sx={{ display: "grid", placeItems: "center", py: 6 }}>
          <CircularProgress size={24} />
        </Box>
      ) : filteredUrls.length === 0 ? (
        <EmptyState hasLinks={urls.length > 0} />
      ) : (
        <>
          <LinksTable urls={filteredUrls} onCopy={onCopy} />
          <LinksCardList urls={filteredUrls} onCopy={onCopy} />
        </>
      )}
    </Paper>
  );
}
