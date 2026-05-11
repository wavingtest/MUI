import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Sidebar, { DRAWER_EXPANDED, DRAWER_COLLAPSED } from '../components/Sidebar';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';

export default function AdminLayout() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const drawerWidth = isMdUp
    ? sidebarCollapsed
      ? DRAWER_COLLAPSED
      : DRAWER_EXPANDED
    : DRAWER_EXPANDED;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar
        mobileOpen={mobileOpen}
        collapsed={sidebarCollapsed}
        isMdUp={isMdUp}
        onMobileClose={() => setMobileOpen(false)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <AdminNavbar
          onToggleMobile={() => setMobileOpen((v) => !v)}
          onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
          isSidebarCollapsed={sidebarCollapsed}
          showCollapseToggle={isMdUp}
        />
        <Box sx={{ flex: 1, p: { xs: 2, md: 3 } }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
