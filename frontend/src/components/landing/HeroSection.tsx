import { Box, Container, Grid, Stack, Typography } from "@mui/material";

import { DashboardPreview } from "./DashboardPreview";
import { ShortenerCard } from "./ShortenerCard";

interface HeroSectionProps {
  onCopy: (value: string) => void;
  onNotify: (message: string) => void;
}

export function HeroSection({ onCopy, onNotify }: HeroSectionProps) {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, borderBottom: 1, borderColor: "divider" }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 5, md: 7 }} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Stack spacing={3}>
              <Box>
                <Typography
                  variant="h2"
                  sx={{ fontSize: { xs: 36, md: 48 }, lineHeight: 1.15, letterSpacing: "-1.5px", fontWeight: 700, mb: 2, color: "#18181B" }}
                >
                  Shorten your links.
                  <Box component="span" sx={{ display: "block", color: "primary.main" }}>
                    Share them anywhere.
                  </Box>
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: 16, lineHeight: 1.65, maxWidth: 440 }}>
                  Turn long URLs into short, shareable links and track their performance — all in one place.
                </Typography>
              </Box>
              <ShortenerCard onCopy={onCopy} onNotify={onNotify} />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <DashboardPreview onCopy={onCopy} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
