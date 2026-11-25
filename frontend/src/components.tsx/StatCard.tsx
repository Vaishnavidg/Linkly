import type { ReactNode } from "react";

import { Box, Paper, Stack, Typography } from "@mui/material";

import { MUTED_TEXT, OUTLINE, PRIMARY_SOFT } from "../lib/tokens";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <Paper
      variant="outlined"
      sx={{ p: 3, borderRadius: "16px", borderColor: OUTLINE, bgcolor: "#fff" }}
    >
      {/* Label and Icon */}
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: MUTED_TEXT }}>
          {label}
        </Typography>

        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "12px",
            bgcolor: PRIMARY_SOFT,
            color: "primary.main",
            display: "grid",
            placeItems: "center",
          }}
        >
          {icon}
        </Box>
      </Stack>

      {/* Value */}
      <Typography
        sx={{
          fontSize: 32,
          lineHeight: "40px",
          fontWeight: 700,
          letterSpacing: "-0.5px",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {typeof value === "number" ? value.toLocaleString("en-US") : value}
      </Typography>
    </Paper>
  );
}
