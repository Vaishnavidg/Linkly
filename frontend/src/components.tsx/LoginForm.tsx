import { useState } from "react";

import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  signinSchema,
  type SigninFormData,
} from "../validators/auth.validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../api/user";

export function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    mode: "onBlur",
  });

  async function onSubmit(data: SigninFormData) {
    event.preventDefault();
    console.log("Form submitted with data:", data);
    setError(null);
    setLoading(true);

    try {
      const response = await loginUser(data.email, data.password);
      console.log("Login successful:", response);
      await navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Sign in failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {/* Email */}
        <TextField
          id="signin-email"
          label="Email"
          type="email"
          fullWidth
          required
          autoComplete="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          size="medium"
        />

        {/* Password */}
        <TextField
          id="signin-password"
          label="Password"
          type="password"
          fullWidth
          required
          autoComplete="current-password"
          value={password}
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          size="medium"
        />

        {/* Error Message */}
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
          {loading ? <CircularProgress size={20} color="inherit" /> : "Sign In"}
        </Button>

        {/* Sign Up Link */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <Box
            component={Link}
            to="/signup"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Sign Up
          </Box>
        </Typography>
      </Stack>
    </Box>
  );
}
