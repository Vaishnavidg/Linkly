import { useEffect, useState } from "react";

import { Box, Typography, Button, Stack, Paper } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ReplayIcon from "@mui/icons-material/Replay";

interface UrlResultProps {
  shortUrl: string;
  onReset?: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

const API_URL = import.meta.env.VITE_BACKEND_API_URL || "";

export function UrlResult({ shortUrl, onReset }: UrlResultProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timer = window.setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [copied]);

  async function handleCopy() {
    setCopyError(false);

    const success = await copyToClipboard(API_URL + "/" + shortUrl);

    if (success) {
      setCopied(true);
    } else {
      setCopyError(true);
    }
  }

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        bgcolor: "background.paper",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Short URL and Copy Button */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={1.5}
        sx={{
          alignItems: {
            xs: "stretch",
            sm: "center",
          },
        }}
      >
        <Typography
          variant="body1"
          sx={{
            flex: 1,
            minWidth: 0,
            fontWeight: 600,
            color: "primary.main",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textAlign: "left",
          }}
        >
          {API_URL + "/" + shortUrl}
        </Typography>

        <Button
          variant="outlined"
          size="medium"
          onClick={handleCopy}
          startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
          sx={{
            flexShrink: 0,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </Stack>

      {/* Copy Confirmation */}

      {copied && (
        <Typography
          variant="body2"
          sx={{
            mt: 1.5,
            color: "success.main",
            textAlign: "left",
          }}
        >
          Copied to clipboard — ready to share.
        </Typography>
      )}

      {copyError && (
        <Typography
          variant="body2"
          role="alert"
          sx={{
            mt: 1.5,
            color: "error.main",
          }}
        >
          Unable to copy automatically. Please copy the URL manually.
        </Typography>
      )}

      {/* Shorten Another URL */}

      {onReset && (
        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Button
            variant="text"
            size="small"
            onClick={onReset}
            startIcon={<ReplayIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              color: "text.secondary",
            }}
          >
            Shorten another URL
          </Button>
        </Box>
      )}
    </Paper>
  );
}

// export { copyToClipboard };
