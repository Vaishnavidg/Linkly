import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { LogoMark } from "./LogoMark";
import { NAV_ITEMS } from "./content";

const linkSx = {
  textTransform: "none",
  color: "text.secondary",
  p: 0,
  minWidth: 0,
} as const;

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Grid size={{ xs: 6, md: 3 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>
      <Stack spacing={0.75} sx={{ alignItems: "flex-start" }}>
        {children}
      </Stack>
    </Grid>
  );
}

interface LandingFooterProps {
  loginPath: string;
  signupPath: string;
}

export function LandingFooter({ loginPath, signupPath }: LandingFooterProps) {
  return (
    <Box
      component="footer"
      sx={{ borderTop: 1, borderColor: "divider", py: 4 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", mb: 1 }}
            >
              <LogoMark size={32} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Linkly
              </Typography>
            </Stack>
            <Typography
              color="text.secondary"
              variant="body2"
              sx={{ maxWidth: 360 }}
            >
              A fast, minimal URL shortener and click analytics workspace built
              for modern teams.
            </Typography>
          </Grid>

          <FooterColumn title="Product">
            {NAV_ITEMS.map((item) => (
              <Button key={item.href} href={item.href} sx={linkSx}>
                {item.label}
              </Button>
            ))}
            <Button component={RouterLink} to="/dashboard" sx={linkSx}>
              Dashboard
            </Button>
          </FooterColumn>

          <FooterColumn title="Account">
            <Button component={RouterLink} to={loginPath} sx={linkSx}>
              Log in
            </Button>
            <Button component={RouterLink} to={signupPath} sx={linkSx}>
              Get Started
            </Button>
          </FooterColumn>
        </Grid>

        <Divider sx={{ my: 3 }} />
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} Linkly. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
