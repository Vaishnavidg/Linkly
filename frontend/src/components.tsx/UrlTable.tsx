import { format } from "date-fns";
import { Check, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import { copyToClipboard } from "./UrlResult";
import type { ShortUrl } from "../types/index";

interface UrlTableProps {
  urls: ShortUrl[];
}

const API_URL = import.meta.env.VITE_BACKEND_API_URL || "";

export function UrlTable({ urls }: UrlTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function handleCopy(url: ShortUrl) {
    const ok = await copyToClipboard(API_URL + "/" + url.shortId);
    if (ok) {
      setCopiedId(url.id);
      window.setTimeout(
        () => setCopiedId((current) => (current === url.id ? null : current)),
        2000
      );
    }
  }

  return (
    <TableContainer sx={{ overflowX: "auto" }}>
      <Table
        sx={{
          minWidth: 640,
          "& .MuiTableCell-root": {
            borderColor: "divider",
            px: 2,
            py: 1.5,
          },
        }}
      >
        {/* Table Header */}
        <TableHead>
          <TableRow
            sx={{
              "& .MuiTableCell-root": {
                color: "text.secondary",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                bgcolor: "action.hover",
              },
            }}
          >
            <TableCell>Original URL</TableCell>
            <TableCell>Short URL</TableCell>
            <TableCell>Clicks</TableCell>
            <TableCell>Created</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {urls.map((url) => (
            <TableRow
              key={url.id}
              hover
              sx={{
                "&:last-child td": {
                  borderBottom: 0,
                },
              }}
            >
              {/* Original URL */}
              <TableCell sx={{ maxWidth: 240 }}>
                <Box
                  component="a"
                  href={url.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "text.primary",
                    textDecoration: "none",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    component="span"
                    noWrap
                    sx={{ minWidth: 0 }}
                  >
                    {url.originalUrl}
                  </Typography>

                  <ExternalLink size={13} style={{ flexShrink: 0 }} />
                </Box>
              </TableCell>

              {/* Short URL */}
              <TableCell sx={{ maxWidth: 180 }}>
                <Box
                  component="a"
                  href={API_URL + "/" + url.shortId}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: "primary.main",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {API_URL + "/" + url.shortId}
                </Box>
              </TableCell>

              {/* Clicks */}
              <TableCell
                sx={{
                  color: "text.secondary",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {url.visitHistory.length.toLocaleString()}
              </TableCell>

              {/* Created Date */}
              <TableCell
                sx={{
                  color: "text.secondary",
                  whiteSpace: "nowrap",
                  fontSize: "0.875rem",
                }}
              >
                {format(new Date(url.createdAt), "MMM d, yyyy")}
              </TableCell>

              {/* Actions */}
              <TableCell align="right">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 0.5,
                  }}
                >
                  {/* Copy Button */}
                  <Tooltip
                    title={copiedId === url.id ? "Copied!" : "Copy short URL"}
                  >
                    <IconButton
                      size="small"
                      aria-label="Copy short URL"
                      onClick={() => handleCopy(url)}
                      color={copiedId === url.id ? "success" : "default"}
                    >
                      {copiedId === url.id ? (
                        <Check size={17} />
                      ) : (
                        <Copy size={17} />
                      )}
                    </IconButton>
                  </Tooltip>

                  {/* Delete Button */}
                  {/* <Tooltip title="Delete link">
                    <span>
                      <IconButton
                        size="small"
                        aria-label="Delete link"
                        disabled={deletingId === url.id}
                        onClick={() => onDelete(url.id)}
                        sx={{
                          color: "error.main",
                          "&:hover": {
                            bgcolor: "error.lighter",
                          },
                        }}
                      >
                        <Trash2 size={17} />
                      </IconButton>
                    </span>
                  </Tooltip> */}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
