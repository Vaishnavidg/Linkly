import { Box, Card, CardContent, Chip, Container, Grid, Stack, Typography } from "@mui/material";

import { IconBadge } from "./IconBadge";
import { SectionHeading } from "./SectionHeading";
import { STEPS } from "./content";

export function HowItWorksSection() {
  return (
    <Box id="how-it-works" sx={{ py: { xs: 6, md: 9 }, borderBottom: 1, borderColor: "divider" }}>
      <Container maxWidth="lg">
        <SectionHeading title="How it works" subtitle="Go from a long, unwieldy URL to a clean, trackable link in three steps." />
        <Grid container spacing={2.5}>
          {STEPS.map((item, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={item.title}>
              <Card variant="outlined" sx={{ height: "100%", borderRadius: 2.5 }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <IconBadge>{item.icon}</IconBadge>
                    <Chip label={`0${index + 1}`} size="small" sx={{ bgcolor: "grey.100", color: "text.secondary", fontWeight: 600 }} />
                  </Stack>
                  <Typography sx={{ fontWeight: 600, mb: 0.75 }}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {item.text}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
