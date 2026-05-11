import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Collapse,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useMemo, useState } from 'react';

export const DRAWER_EXPANDED = 260;
export const DRAWER_COLLAPSED = 72;

const NAV_TREE = [
  {
    label: 'Componentes',
    icon: HomeOutlinedIcon,
    to: '/components',
  },
  {
    label: 'Operações',
    icon: ListAltIcon,
    children: [
      {
        label: 'Configurações',
        icon: ListAltIcon,
        children: [
          { label: 'Eventos', icon: ListAltIcon },
          { label: 'Contratos' },
          { label: 'Segmentos' },
          { label: 'Relacionamentos' },
          { label: 'Regiões' },
          { label: 'Integrações' },
          { label: 'Tarifas' },
        ],
      },
      { label: 'Ocorrências' },
      { label: 'Contatos' },
      { label: 'Entidades' },
    ],
  },
];

function drawerPaperSx(theme, collapsed, isMdUp) {
  return {
    width: isMdUp ? (collapsed ? DRAWER_COLLAPSED : DRAWER_EXPANDED) : DRAWER_EXPANDED,
    borderRight: `1px solid ${theme.palette.divider}`,
    bgcolor: '#fff',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    boxSizing: 'border-box',
  };
}

export default function Sidebar({ mobileOpen, collapsed, isMdUp, onMobileClose }) {
  const theme = useTheme();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState({
    Operações: true,
    Configurações: true,
  });

  const visibleTree = useMemo(() => {
    if (!searchTerm.trim()) return NAV_TREE;
    const term = searchTerm.toLowerCase();
    const filterNode = (node) => {
      const selfMatch = node.label.toLowerCase().includes(term);
      const filteredChildren = node.children?.map(filterNode).filter(Boolean) ?? [];
      if (selfMatch || filteredChildren.length) {
        return { ...node, children: filteredChildren };
      }
      return null;
    };
    return NAV_TREE.map(filterNode).filter(Boolean);
  }, [searchTerm]);

  const renderNode = (node, level = 0) => {
    const hasChildren = !!node.children?.length;
    const Icon = node.icon ?? ListAltIcon;
    const isOpen = openItems[node.label] ?? false;
    const isRoute = !!node.to;
    const isActive = isRoute && location.pathname === node.to;
    return (
      <Box key={`${level}-${node.label}`}>
        <ListItemButton
          component={isRoute ? Link : 'button'}
          to={isRoute ? node.to : undefined}
          onClick={() => {
            if (hasChildren) {
              setOpenItems((prev) => ({ ...prev, [node.label]: !isOpen }));
            }
            if (isRoute) onMobileClose?.();
          }}
          sx={{
            pl: collapsed && isMdUp ? 1.25 : 1.5 + level * 2.5,
            pr: 1,
            minHeight: 38,
            justifyContent: collapsed && isMdUp ? 'center' : 'flex-start',
            ...(isActive && {
              bgcolor: 'action.selected',
              borderRight: `3px solid ${theme.palette.primary.main}`,
            }),
          }}
        >
          <ListItemIcon sx={{ minWidth: collapsed && isMdUp ? 0 : 34, color: 'inherit' }}>
            <Icon fontSize="small" />
          </ListItemIcon>
          {(!collapsed || !isMdUp) && <ListItemText primary={node.label} primaryTypographyProps={{ fontSize: 13.5 }} />}
          {hasChildren && (!collapsed || !isMdUp) && (isOpen ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />)}
        </ListItemButton>
        {hasChildren && (
          <Collapse in={isOpen && (!collapsed || !isMdUp)} timeout="auto" unmountOnExit>
            <List dense disablePadding>
              {node.children.map((child) => renderNode(child, level + 1))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  const listContent = (
    <>
      <Toolbar
        sx={{
          px: collapsed && isMdUp ? 1 : 2,
          minHeight: 64,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1.5,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.85rem',
            flexShrink: 0,
          }}
        >
          WT
        </Box>
        {(!collapsed || !isMdUp) && (
          <Typography variant="subtitle1" fontWeight={700} noWrap>
            WT Private
          </Typography>
        )}
      </Toolbar>

      <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
        <Box sx={{ px: 1.5, mb: 1, display: collapsed && isMdUp ? 'none' : 'block' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small" color="primary" component={Link} to="/" onClick={onMobileClose}>
              <HomeIcon fontSize="small" />
            </IconButton>
            <TextField
              size="small"
              fullWidth
              placeholder="Buscar por módulo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: searchTerm ? (
                  <IconButton size="small" onClick={() => setSearchTerm('')}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                ) : null,
              }}
            />
          </Box>
        </Box>
        <Divider />
        <List dense disablePadding sx={{ pt: 0.5 }}>
          {visibleTree.map((node) => renderNode(node))}
        </List>
      </Box>

      <List dense disablePadding sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
        <ListItemButton sx={{ minHeight: 40, justifyContent: collapsed && isMdUp ? 'center' : 'flex-start' }}>
          <ListItemIcon sx={{ minWidth: collapsed && isMdUp ? 0 : 34 }}>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          {(!collapsed || !isMdUp) && <ListItemText primary="Sair" primaryTypographyProps={{ fontSize: 13.5 }} />}
        </ListItemButton>
        <ListItemButton sx={{ minHeight: 40, justifyContent: collapsed && isMdUp ? 'center' : 'flex-start' }}>
          <ListItemIcon sx={{ minWidth: collapsed && isMdUp ? 0 : 34 }}>
            <KeyboardDoubleArrowLeftIcon fontSize="small" />
          </ListItemIcon>
          {(!collapsed || !isMdUp) && <ListItemText primary="Recolher menu" primaryTypographyProps={{ fontSize: 13.5 }} />}
        </ListItemButton>
      </List>
    </>
  );

  return (
    <Box component="nav" sx={{ width: { md: isMdUp ? (collapsed ? DRAWER_COLLAPSED : DRAWER_EXPANDED) : DRAWER_EXPANDED }, flexShrink: { md: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': drawerPaperSx(theme, false, false),
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>{listContent}</Box>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': drawerPaperSx(theme, collapsed, true),
        }}
        open
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>{listContent}</Box>
      </Drawer>
    </Box>
  );
}
