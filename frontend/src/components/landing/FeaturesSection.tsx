import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";

import { IconBadge } from "./IconBadge";
import { SectionHeading } from "./SectionHeading";
import { FEATURES } from "./content";

export function FeaturesSection() {
  return (
    <Box id="features" sx={{ py: { xs: 6, md: 9 }, borderBottom: 1, borderColor: "divider" }}>
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
                sx={{ height: "100%", borderRadius: 2.5, transition: "border-color .15s", "&:hover": { borderColor: "primary.light" } }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ mb: 2 }}>
                    <IconBadge>{item.icon}</IconBadge>
                  </Box>
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
