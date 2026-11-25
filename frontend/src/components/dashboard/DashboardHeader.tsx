import { Box, Button, Chip, IconButton, Stack, Typography } from "@mui/material";
import AddLinkIcon from "@mui/icons-material/AddLink";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import { MUTED_TEXT, OUTLINE, PAGE_BG, iconButtonSx } from "../../theme/tokens";

interface DashboardHeaderProps {
  email: string;
  onOpenMenu: () => void;
  onCreateLink: () => void;
}

export function DashboardHeader({ email, onOpenMenu, onCreateLink }: DashboardHeaderProps) {
  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        height: 64,
        px: { xs: 2, sm: 3 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        bgcolor: "#fff",
        borderBottom: 1,
        borderColor: OUTLINE,
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", minWidth: 0 }}>
        <IconButton
          aria-label="Open navigation menu"
          onClick={onOpenMenu}
          sx={{ ...iconButtonSx, display: { lg: "none" } }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <Typography component="h1" noWrap sx={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.2px" }}>
          Dashboard
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Chip
          icon={<PersonOutlinedIcon sx={{ fontSize: 16, color: "primary.main !important" }} />}
          label={email}
          variant="outlined"
          sx={{ display: { xs: "none", sm: "inline-flex" }, bgcolor: PAGE_BG, borderColor: OUTLINE, color: MUTED_TEXT, fontSize: 13 }}
        />
        <Button
          variant="contained"
          startIcon={<AddLinkIcon />}
          onClick={onCreateLink}
          sx={{ textTransform: "none", height: 40, px: 2, borderRadius: "12px", boxShadow: "none", fontWeight: 500 }}
        >
          Create Link
        </Button>
      </Stack>
    </Box>
  );
}
