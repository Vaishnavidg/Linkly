import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Box, Button, Container, Divider, Drawer, IconButton, List, ListItemButton, Stack, Toolbar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

import { LogoMark } from "./LogoMark";
import { NAV_ITEMS } from "./content";

interface LandingHeaderProps {
  loginPath: string;
  signupPath: string;
}

export function LandingHeader({ loginPath, signupPath }: LandingHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <AppBar position="sticky" elevation={0} color="inherit" sx={{ bgcolor: "background.paper", borderBottom: 1, borderColor: "divider" }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 64, gap: 2 }}>
            <Stack
              component={RouterLink}
              to="/"
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", textDecoration: "none", color: "inherit", flex: 1 }}
            >
              <LogoMark />
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 18 }}>
                Linkly
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ display: { xs: "none", md: "flex" } }}>
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.href}
                  href={item.href}
                  color="inherit"
                  sx={{ color: "text.secondary", textTransform: "none", fontSize: 14, fontWeight: 400 }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>

            <Stack direction="row" spacing={1} sx={{ display: { xs: "none", md: "flex" }, flex: 1, justifyContent: "flex-end" }}>
              <Button
                component={RouterLink}
                to={loginPath}
                variant="outlined"
                color="inherit"
                sx={{ textTransform: "none", borderColor: "divider", bgcolor: "#fff", px: 2, fontSize: 14, borderRadius: "10px" }}
              >
                Log in
              </Button>
              <Button
                component={RouterLink}
                to={signupPath}
                variant="contained"
                sx={{ textTransform: "none", px: 2, fontSize: 14, borderRadius: "10px", boxShadow: "none" }}
              >
                Get Started
              </Button>
            </Stack>

            <IconButton aria-label="Open menu" onClick={() => setDrawerOpen(true)} sx={{ display: { md: "none" } }}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
        <Box sx={{ width: 280, p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
            <IconButton aria-label="Close menu" onClick={closeDrawer}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <List>
            {NAV_ITEMS.map((item) => (
              <ListItemButton key={item.href} component="a" href={item.href} onClick={closeDrawer}>
                {item.label}
              </ListItemButton>
            ))}
            <Divider sx={{ my: 1 }} />
            <ListItemButton component={RouterLink} to={loginPath}>
              Log in
            </ListItemButton>
            <ListItemButton component={RouterLink} to={signupPath} sx={{ color: "primary.main", fontWeight: 700 }}>
              Get Started
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
