import { Box, Typography } from "@mui/material";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <Box sx={{ maxWidth: 640, mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1.5 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ fontSize: 17 }}>
        {subtitle}
      </Typography>
    </Box>
  );
}
