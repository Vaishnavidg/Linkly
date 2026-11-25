import { Box } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        bgcolor: "primary.main",
        color: "primary.contrastText",
        borderRadius: 1.5,
        display: "grid",
        placeItems: "center",
      }}
    >
      <LinkIcon fontSize={size > 32 ? "medium" : "small"} />
    </Box>
  );
}
