import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  ButtonBase,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

export default function AdminNavbar({
  onToggleMobile,
  onToggleCollapse,
  isSidebarCollapsed,
  showCollapseToggle,
}) {
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [userAnchor, setUserAnchor] = useState(null);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setSessionSeconds((v) => v + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const hh = String(Math.floor(sessionSeconds / 3600)).padStart(2, '0');
  const mm = String(Math.floor((sessionSeconds % 3600) / 60)).padStart(2, '0');
  const ss = String(sessionSeconds % 60).padStart(2, '0');

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
    >
      <Toolbar variant="dense" sx={{ gap: 1, py: 1 }}>
        <IconButton edge="start" onClick={onToggleMobile} sx={{ display: { md: 'none' } }} aria-label="Abrir menu">
          <MenuIcon />
        </IconButton>
        {showCollapseToggle && (
          <IconButton onClick={onToggleCollapse} aria-label={isSidebarCollapsed ? 'Expandir menu' : 'Colapsar menu'}>
            {isSidebarCollapsed ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
        )}
        <Typography variant="h6" noWrap fontSize="1rem" sx={{ flex: 1, fontWeight: 700 }}>
          WT Private
        </Typography>
        <Box
          aria-label="Tempo de sessão ativa"
          sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1, color: 'text.secondary', mr: 1 }}
        >
          <TimerOutlinedIcon fontSize="small" />
          <Typography variant="body2" fontWeight={600}>
            {hh}:{mm}:{ss}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, display: { xs: 'block', sm: 'none' } }} />
        <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)} aria-label="Notificações">
          <Badge color="error" variant="dot">
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>
        <Menu anchorEl={notifAnchor} open={Boolean(notifAnchor)} onClose={() => setNotifAnchor(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <MenuItem disabled sx={{ opacity: 1, fontWeight: 600 }}>
            Notificações
          </MenuItem>
          <MenuItem onClick={() => setNotifAnchor(null)}>
            <ListItemText primary="Novo pedido recebido" secondary="há 4 minutos" />
          </MenuItem>
          <MenuItem onClick={() => setNotifAnchor(null)}>
            <ListItemText primary="Relatório mensal disponível" secondary="há 1 hora" />
          </MenuItem>
          <MenuItem onClick={() => setNotifAnchor(null)}>
            <ListItemText primary="3 usuários aguardando aprovação" secondary="ontem" />
          </MenuItem>
          <Divider />
          <MenuItem sx={{ justifyContent: 'center' }} onClick={() => setNotifAnchor(null)}>
            Ver todas
          </MenuItem>
        </Menu>

        <IconButton aria-label="Mensagens">
          <ChatBubbleOutlineIcon />
        </IconButton>

        <ButtonBase
          onClick={(e) => setUserAnchor(e.currentTarget)}
          sx={{
            borderRadius: 2,
            px: 1,
            py: 0.5,
            gap: 1,
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor: 'grey.800',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.75rem',
            }}
          >
            AM
          </Box>
          <Typography variant="body2" fontWeight={600} sx={{ display: { xs: 'none', md: 'block' } }}>
            Alex Morgan
          </Typography>
          <KeyboardArrowDownIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
        </ButtonBase>
        <Menu anchorEl={userAnchor} open={Boolean(userAnchor)} onClose={() => setUserAnchor(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <MenuItem disabled sx={{ opacity: 1, fontWeight: 600 }}>
            Conta
          </MenuItem>
          <MenuItem
            onClick={() => {
              setUserAnchor(null);
              navigate('/profile');
            }}
          >
            <ListItemIcon>
              <PersonOutlineIcon fontSize="small" />
            </ListItemIcon>
            Meu perfil
          </MenuItem>
          <MenuItem onClick={() => setUserAnchor(null)}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Configurações
          </MenuItem>
          <MenuItem onClick={() => setUserAnchor(null)}>
            <ListItemIcon>
              <HelpOutlineIcon fontSize="small" />
            </ListItemIcon>
            Ajuda
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              setUserAnchor(null);
              navigate('/login');
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Sair
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
