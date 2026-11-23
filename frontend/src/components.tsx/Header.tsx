import { AppBar, Toolbar, Box, Typography, Button, Stack } from "@mui/material";

import LinkIcon from "@mui/icons-material/Link";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

// Import your existing authentication context and button logic
// import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  dashboard: boolean;
  user?: {
    email: string;
  } | null;
  signOut?: () => void;
}

export default function Header({
  dashboard = false,
  user = null,
  signOut,
}: HeaderProps) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: "1024px",
          width: "100%",
          mx: "auto",
          minHeight: "64px !important",
          px: { xs: 2, sm: 3 },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            textDecoration: "none",
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              borderRadius: 2,
            }}
          >
            <LinkIcon fontSize="small" />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.5px",
              color: "text.primary",
            }}
          >
            Linkly
          </Typography>
        </Box>
        {/* Header Actions */}
        {dashboard ? (
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              {user?.email}
            </Typography>

            <Button
              variant="outlined"
              size="small"
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={signOut}
            >
              Log out
            </Button>
          </Stack>
        ) : user ? (
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              {user.email}
            </Typography>

            <Button
              component={Link}
              to="/dashboard"
              variant="outlined"
              size="small"
              color="primary"
            >
              Dashboard
            </Button>
          </Stack>
        ) : (
          <Button component={Link} to="/signin" variant="outlined" size="small">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
