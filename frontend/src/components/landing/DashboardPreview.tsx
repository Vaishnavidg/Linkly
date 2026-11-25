import { Box, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { MONO, PAGE_BG } from "../../theme/tokens";
import { LogoMark } from "./LogoMark";
import { PREVIEW_LINKS, PREVIEW_STATS } from "./content";

/** Static illustrative product preview (sample data). */
export function DashboardPreview({ onCopy }: { onCopy: (value: string) => void }) {
  return (
    <Paper variant="outlined" sx={{ overflow: "hidden", borderRadius: "16px", boxShadow: "0 8px 32px rgba(24,24,27,.04)" }}>
      {/* Window title bar */}
      <Box
        sx={{ bgcolor: "#fff", px: 2, py: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: 1, borderColor: "divider" }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <LogoMark size={26} />
          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 13 }}>
            Linkly Dashboard
          </Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: MONO }}>
          app.linkly.io
        </Typography>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 2.5 }, bgcolor: PAGE_BG }}>
        {/* Stat cards */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {PREVIEW_STATS.map(({ label, value, icon }) => (
            <Grid size={6} key={label}>
              <Paper variant="outlined" sx={{ p: 2, bgcolor: "#fff", borderRadius: "16px" }}>
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="caption" color="text.secondary">
                    {label}
                  </Typography>
                  <Box sx={{ color: "primary.main", display: "flex", "& svg": { fontSize: 15 } }}>{icon}</Box>
                </Stack>
                <Typography variant="h5" sx={{ fontWeight: 500, fontSize: 22, mt: 0.5 }}>
                  {value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Recent links */}
        <Paper variant="outlined" sx={{ overflow: "hidden", borderRadius: "16px", bgcolor: "#fff" }}>
          <Box sx={{ px: 2, py: 1.25, bgcolor: PAGE_BG, display: "flex", justifyContent: "space-between", borderBottom: 1, borderColor: "divider" }}>
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
              sx={{ px: 2, py: 1.5, display: "flex", alignItems: "center", gap: 1.5, borderBottom: 1, borderColor: "divider", "&:last-child": { borderBottom: 0 } }}
            >
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="body2" noWrap sx={{ color: "primary.main", fontFamily: MONO, fontSize: 12.5 }}>
                  {item.short}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap sx={{ display: "block" }}>
                  {item.original}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontFamily: MONO, fontWeight: 500, fontSize: 13 }}>
                {item.clicks}
              </Typography>
              <IconButton
                size="small"
                aria-label={`Copy ${item.short}`}
                onClick={() => onCopy(item.short)}
                sx={{ border: 1, borderColor: "divider", borderRadius: "8px", p: 0.75 }}
              >
                <ContentCopyIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
          ))}
        </Paper>
      </Box>
    </Paper>
  );
}
