import type { ReactNode } from "react";
import { Box } from "@mui/material";

export function IconBadge({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        width: 42,
        height: 42,
        bgcolor: "action.hover",
        color: "primary.main",
        borderRadius: 1.5,
        display: "grid",
        placeItems: "center",
      }}
    >
      {children}
    </Box>
  );
}
