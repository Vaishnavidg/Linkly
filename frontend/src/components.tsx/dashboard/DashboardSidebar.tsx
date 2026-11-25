import { Box, Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { SidebarContent, type SidebarProps } from "../SidebarContent";
import { OUTLINE, iconButtonSx } from "../../lib/tokens";

const SIDEBAR_WIDTH = 240;

interface DashboardSidebarProps extends SidebarProps {
  drawerOpen: boolean;
  onCloseDrawer: () => void;
}

/** Fixed sidebar on large screens, slide-in drawer below `lg`. */
export function DashboardSidebar({ drawerOpen, onCloseDrawer, ...sidebarProps }: DashboardSidebarProps) {
  return (
    <>
      <Box
        component="aside"
        sx={{
          display: { xs: "none", lg: "block" },
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          height: "100vh",
          position: "sticky",
          top: 0,
          borderRight: 1,
          borderColor: OUTLINE,
        }}
      >
        <SidebarContent {...sidebarProps} />
      </Box>

      <Drawer
        open={drawerOpen}
        onClose={onCloseDrawer}
        sx={{ display: { lg: "none" }, "& .MuiDrawer-paper": { width: 256 } }}
      >
        <Box sx={{ position: "absolute", top: 12, right: 12, zIndex: 1 }}>
          <IconButton aria-label="Close navigation" size="small" onClick={onCloseDrawer} sx={iconButtonSx}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <SidebarContent {...sidebarProps} />
      </Drawer>
    </>
  );
}
