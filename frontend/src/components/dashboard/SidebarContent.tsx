import { Link as RouterLink } from "react-router-dom";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import { MUTED_TEXT, ON_PRIMARY_SOFT, OUTLINE, PRIMARY_SOFT, SURFACE_MUTED } from "../../theme/tokens";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: <DashboardOutlinedIcon fontSize="small" /> },
  { id: "my-links", label: "My Links", icon: <ListAltIcon fontSize="small" /> },
] as const;

export type NavId = (typeof NAV_ITEMS)[number]["id"];

const initialsOf = (name?: string, email?: string) => {
  const source = (name || email || "?").trim();
  const parts = source.split(/\s+/);
  return (parts.length > 1 ? parts[0][0] + parts[1][0] : source.slice(0, 2)).toUpperCase();
};

function Logo() {
  return (
    <Stack
      component={RouterLink}
      to="/"
      direction="row"
      spacing={1}
      sx={{ alignItems: "center", textDecoration: "none", color: "text.primary" }}
    >
      <Box sx={{ width: 32, height: 32, borderRadius: "10px", bgcolor: "primary.main", color: "#fff", display: "grid", placeItems: "center" }}>
        <LinkIcon fontSize="small" />
      </Box>
      <Typography sx={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.2px" }}>Linkly</Typography>
    </Stack>
  );
}

export interface SidebarProps {
  active: NavId;
  onNavigate: (id: NavId) => void;
  name?: string;
  email?: string;
  onSignOut: () => void;
}

export function SidebarContent({ active, onNavigate, name, email, onSignOut }: SidebarProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", bgcolor: "#fff" }}>
      <Box sx={{ height: 64, px: 3, display: "flex", alignItems: "center", borderBottom: 1, borderColor: OUTLINE }}>
        <Logo />
      </Box>

      <Stack component="nav" aria-label="Dashboard" spacing={0.5} sx={{ flex: 1, p: 2 }}>
        {NAV_ITEMS.map((item) => {
          const selected = item.id === active;
          return (
            <Button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              startIcon={item.icon}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                borderRadius: "12px",
                px: 1.5,
                py: 1.25,
                fontSize: 14,
                fontWeight: 500,
                color: selected ? ON_PRIMARY_SOFT : MUTED_TEXT,
                bgcolor: selected ? PRIMARY_SOFT : "transparent",
                "&:hover": { bgcolor: selected ? PRIMARY_SOFT : SURFACE_MUTED, color: selected ? ON_PRIMARY_SOFT : "text.primary" },
              }}
            >
              {item.label}
            </Button>
          );
        })}
      </Stack>

      <Stack spacing={1} sx={{ p: 2, borderTop: 1, borderColor: OUTLINE }}>
        <Stack direction="row" spacing={1.25} sx={{ alignItems: "center", px: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: PRIMARY_SOFT, color: ON_PRIMARY_SOFT, fontSize: 12, fontWeight: 600 }}>
            {initialsOf(name, email)}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography noWrap sx={{ fontSize: 13, fontWeight: 500 }}>
              {name}
            </Typography>
            <Typography noWrap sx={{ fontSize: 12, color: MUTED_TEXT }}>
              {email}
            </Typography>
          </Box>
        </Stack>
        <Button
          onClick={onSignOut}
          startIcon={<LogoutIcon fontSize="small" />}
          sx={{
            justifyContent: "flex-start",
            textTransform: "none",
            borderRadius: "12px",
            px: 1.5,
            fontSize: 13,
            fontWeight: 500,
            color: MUTED_TEXT,
            "&:hover": { color: "error.main", bgcolor: "#FEE2E2" },
          }}
        >
          Logout
        </Button>
      </Stack>
    </Box>
  );
}
