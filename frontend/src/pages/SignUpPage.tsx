// import { createFileRoute, Link } from "@tanstack/react-router";
import { Link2 } from "lucide-react";

// import { SignupForm } from "@/components/SignupForm";

import { Box, Container, Typography, Paper, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { SignupForm } from "../components.tsx/SignupForm";

//  const Route = createFileRoute("/signup")({
//   head: () => ({
//     meta: [
//       { title: "Create Account – Linkly" },
//       {
//         name: "description",
//         content: "Create a free Linkly account to manage your shortened links.",
//       },
//       { property: "og:title", content: "Create Account – Linkly" },
//       {
//         property: "og:description",
//         content: "Create a free Linkly account to manage your shortened links.",
//       },
//       { property: "og:type", content: "website" },
//       { name: "twitter:card", content: "summary" },
//     ],
//   }),
//   component: SignUpPage,
// });

export default function SignUpPage() {
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
        py: 4,
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

      {/* Signup Card */}
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
              Create your account
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Free forever. Manage all your links in one place.
            </Typography>
          </Stack>

          <SignupForm />
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
