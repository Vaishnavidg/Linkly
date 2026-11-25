import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";

import { signupUser } from "../../api/user";

import {
  signupSchema,
  type SignupFormData,
} from "../../validators/auth.validator";

export function SignupForm() {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  async function onSubmit(data: SignupFormData) {
    setError(null);
    setLoading(true);

    try {
      await signupUser(data.name, data.email, data.password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Sign up failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {/* Name */}
        <TextField
          id="signup-name"
          label="Name"
          type="text"
          fullWidth
          autoComplete="name"
          placeholder="Jane Doe"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        {/* Email */}
        <TextField
          id="signup-email"
          label="Email"
          type="email"
          fullWidth
          autoComplete="email"
          placeholder="you@example.com"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* Password */}
        <TextField
          id="signup-password"
          label="Password"
          type="password"
          fullWidth
          autoComplete="new-password"
          placeholder="Enter your password"
          {...register("password")}
          error={!!errors.password}
          helperText={
            errors.password?.message ||
            "Password must be at least 8 characters."
          }
        />

        {/* API Error */}
        {error && (
          <Alert severity="error" role="alert">
            {error}
          </Alert>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={loading}
          disableElevation
          sx={{
            py: 1.5,
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Create Account"
          )}
        </Button>

        {/* Sign In Link */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            textAlign: "center",
          }}
        >
          Already have an account?{" "}
          <Box
            component={Link}
            to="/signin"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Sign In
          </Box>
        </Typography>
      </Stack>
    </Box>
  );
}
