import { Link2 } from "lucide-react";
import { Box, Container, Typography, Paper, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { LoginForm } from "../components/auth/LoginForm";

export default function SignInPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      {/* Logo */}
      <Box
        component={Link}
        to="/"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          textDecoration: "none",
          color: "text.primary",
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            bgcolor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <Link2 size={16} />
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Linkly
        </Typography>
      </Box>

      {/* Sign In Card */}
      <Container maxWidth="xs" disableGutters>
        <Paper
          elevation={1}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            border: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Stack spacing={1} sx={{ mb: 3, textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Welcome back
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Sign in to manage your links.
            </Typography>
          </Stack>

          <LoginForm />
        </Paper>
      </Container>

      {/* Footer */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 3, textAlign: "center" }}
      >
        Just here to shorten a link?{" "}
        <Box
          component={Link}
          to="/"
          sx={{
            color: "primary.main",
            fontWeight: 600,
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Do it without an account
        </Box>
      </Typography>
    </Box>
  );
}
