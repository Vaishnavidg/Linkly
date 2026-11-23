import { Box, TextField, Button, CircularProgress } from "@mui/material";

import ContentCutIcon from "@mui/icons-material/ContentCut";
import type { FormEvent } from "react";

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  error?: string | null;
  placeholder?: string;
  centered?: boolean;
}

export function UrlInput({
  value,
  onChange,
  onSubmit,
  loading = false,
  error = null,
  placeholder = "Paste your long URL here...",
  centered = false,
}: UrlInputProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!loading) {
      onSubmit();
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
          alignItems: "stretch",
        }}
      >
        <TextField
          fullWidth
          type="url"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          disabled={loading}
          error={Boolean(error)}
          size={centered ? "medium" : "small"}
          slotProps={{
            htmlInput: {
              "aria-label": "URL to shorten",
              autoComplete: "off",
            },
          }}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              height: centered ? 56 : 42,
              backgroundColor: "background.paper",
              fontSize: centered ? "1rem" : "0.9rem",
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading || !value.trim()}
          startIcon={
            loading ? (
              <CircularProgress size={17} color="inherit" />
            ) : (
              <ContentCutIcon />
            )
          }
          sx={{
            height: centered ? 56 : 42,
            px: centered ? 4 : 2.5,
            borderRadius: "10px",
            fontWeight: 600,
            whiteSpace: "nowrap",
            flexShrink: 0,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </Button>
      </Box>

      {error && (
        <Box
          role="alert"
          sx={{
            mt: 1.5,
            color: "error.main",
            fontSize: "0.875rem",
            textAlign: centered ? "left" : "left",
          }}
        >
          {error}
        </Box>
      )}
    </Box>
  );
}
