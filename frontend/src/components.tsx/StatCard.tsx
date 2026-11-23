import type { LucideIcon } from "lucide-react";

import { Paper, Box, Typography } from "@mui/material";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
}

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        bgcolor: "background.paper",
        transition: "box-shadow 0.2s ease",
        "&:hover": {
          boxShadow: 2,
        },
      }}
    >
      {/* Label and Icon */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "text.secondary",
        }}
      >
        <Icon size={17} />

        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>

      {/* Value */}
      <Typography
        variant="h4"
        sx={{
          mt: 1,
          letterSpacing: "-0.5px",
          fontVariantNumeric: "tabular-nums",
          fontWeight: 700,
          color: "text.primary",
        }}
      >
        {value.toLocaleString()}
      </Typography>
    </Paper>
  );
}
