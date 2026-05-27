import { useState } from 'react';
import {
  AppBar,
  Autocomplete,
  Backdrop,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Drawer,
  Fab,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Rating,
  Skeleton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import InboxIcon from '@mui/icons-material/Inbox';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import WtShowcaseSection from './WtShowcaseSection';
import { MUI_COMPONENT_META } from '../../data/muiComponentCatalog';

function DemoSection({ id, children }) {
  const m = MUI_COMPONENT_META[id];
  return (
    <WtShowcaseSection
      id={id}
      title={m?.title ?? id}
      muiName={m?.mui}
      priority="medium"
      implemented
    >
      {children}
    </WtShowcaseSection>
  );
}

const AUTOCOMPLETE_OPTIONS = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Salvador'];

export function AutocompleteDemo() {
  const [value, setValue] = useState(null);
  return (
    <DemoSection id="autocomplete">
      <Autocomplete
        options={AUTOCOMPLETE_OPTIONS}
        value={value}
        onChange={(_, v) => setValue(v)}
        renderInput={(params) => <TextField {...params} label="Cidade" placeholder="Buscar cidade" />}
        sx={{ maxWidth: 360 }}
      />
      <Typography variant="caption" sx={{ mt: 1, display: 'block', fontFamily: 'monospace' }}>
        Selecionado: {value ?? '(vazio)'}
      </Typography>
    </DemoSection>
  );
}

export function TableDemo() {
  const rows = [
    ['001', 'Item Alpha', 'Ativo'],
    ['002', 'Item Beta', 'Pendente'],
    ['003', 'Item Gama', 'Ativo'],
  ];
  return (
    <DemoSection id="table">
      <Table size="small" sx={{ maxWidth: 520 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row[0]} hover>
              <TableCell>{row[0]}</TableCell>
              <TableCell>{row[1]}</TableCell>
              <TableCell>{row[2]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DemoSection>
  );
}

export function BreadcrumbsDemo() {
  return (
    <DemoSection id="breadcrumbs">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="#">
          Início
        </Link>
        <Link underline="hover" color="inherit" href="#">
          Cadastros
        </Link>
        <Typography color="text.primary">Detalhe</Typography>
      </Breadcrumbs>
    </DemoSection>
  );
}

export function StepperDemo() {
  const [step, setStep] = useState(1);
  return (
    <DemoSection id="stepper">
      <Stepper activeStep={step} sx={{ maxWidth: 480, mb: 2 }}>
        <Step>
          <StepLabel>Dados</StepLabel>
        </Step>
        <Step>
          <StepLabel>Revisão</StepLabel>
        </Step>
        <Step>
          <StepLabel>Conclusão</StepLabel>
        </Step>
      </Stepper>
      <Stack direction="row" spacing={1}>
        <Button size="small" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
          Voltar
        </Button>
        <Button size="small" variant="contained" disabled={step === 2} onClick={() => setStep((s) => s + 1)}>
          Avançar
        </Button>
      </Stack>
    </DemoSection>
  );
}

export function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <DemoSection id="drawer">
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Abrir Drawer
      </Button>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Painel lateral
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Conteúdo auxiliar em Drawer temporário.
          </Typography>
          <Button sx={{ mt: 2 }} onClick={() => setOpen(false)}>
            Fechar
          </Button>
        </Box>
      </Drawer>
    </DemoSection>
  );
}

export function AppBarDemo() {
  return (
    <DemoSection id="app-bar">
      <AppBar position="static" color="default" elevation={0} sx={{ borderRadius: 1, border: 1, borderColor: 'divider' }}>
        <Toolbar variant="dense">
          <Typography variant="subtitle1" sx={{ flex: 1, fontWeight: 700 }}>
            AppBar de exemplo
          </Typography>
          <IconButton size="small" aria-label="notificações">
            <NotificationsNoneIcon fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </DemoSection>
  );
}

export function ListDemo() {
  return (
    <DemoSection id="list">
      <List dense sx={{ maxWidth: 360, border: 1, borderColor: 'divider', borderRadius: 1 }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <InboxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Caixa de entrada" secondary="12 novas mensagens" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Configurações" />
          </ListItemButton>
        </ListItem>
      </List>
    </DemoSection>
  );
}

export function BadgeDemo() {
  return (
    <DemoSection id="badge">
      <Stack direction="row" spacing={3}>
        <Badge badgeContent={4} color="primary">
          <NotificationsNoneIcon />
        </Badge>
        <Badge variant="dot" color="error">
          <InboxIcon />
        </Badge>
      </Stack>
    </DemoSection>
  );
}

export function SkeletonDemo() {
  const [loading, setLoading] = useState(true);
  return (
    <DemoSection id="skeleton">
      <Button size="small" onClick={() => setLoading((v) => !v)} sx={{ mb: 2 }}>
        {loading ? 'Simular carregado' : 'Simular loading'}
      </Button>
      {loading ? (
        <Stack spacing={1} maxWidth={320}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="rectangular" height={80} />
          <Skeleton variant="rounded" height={36} />
        </Stack>
      ) : (
        <Typography variant="body2">Conteúdo carregado após o skeleton.</Typography>
      )}
    </DemoSection>
  );
}

export function CircularProgressDemo() {
  return (
    <DemoSection id="circular-progress">
      <Stack direction="row" spacing={3} alignItems="center">
        <CircularProgress size={32} />
        <CircularProgress variant="determinate" value={65} size={48} />
      </Stack>
    </DemoSection>
  );
}

export function BackdropDemo() {
  const [open, setOpen] = useState(false);
  return (
    <DemoSection id="backdrop">
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Mostrar Backdrop
      </Button>
      <Backdrop open={open} sx={{ color: '#fff', zIndex: (t) => t.zIndex.drawer + 1 }} onClick={() => setOpen(false)}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </DemoSection>
  );
}

export function DatePickerDemo() {
  const [date, setDate] = useState(dayjs());
  return (
    <DemoSection id="date-picker">
      <DatePicker
        label="Data de vigência"
        value={date}
        onChange={(v) => v && setDate(v)}
        slotProps={{ textField: { size: 'small', sx: { maxWidth: 280 } } }}
      />
      <Typography variant="caption" sx={{ mt: 1, display: 'block', fontFamily: 'monospace' }}>
        Valor: {date.format('DD/MM/YYYY')}
      </Typography>
    </DemoSection>
  );
}

export function PopoverDemo() {
  const [anchor, setAnchor] = useState(null);
  return (
    <DemoSection id="popover">
      <Button variant="outlined" onClick={(e) => setAnchor(e.currentTarget)}>
        Abrir Popover
      </Button>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, maxWidth: 220 }}>
          <Typography variant="subtitle2">Filtros rápidos</Typography>
          <Typography variant="body2" color="text.secondary">
            Painel contextual ancorado ao botão.
          </Typography>
        </Box>
      </Popover>
    </DemoSection>
  );
}

export function FabDemo() {
  return (
    <DemoSection id="fab">
      <Box sx={{ position: 'relative', height: 80 }}>
        <Fab color="primary" size="medium" sx={{ position: 'absolute', right: 0, bottom: 0 }} aria-label="adicionar">
          <AddIcon />
        </Fab>
      </Box>
    </DemoSection>
  );
}

export function RatingDemo() {
  const [value, setValue] = useState(3);
  return (
    <DemoSection id="rating">
      <Rating value={value} onChange={(_, v) => setValue(v)} />
      <Typography variant="caption" sx={{ display: 'block', mt: 1, fontFamily: 'monospace' }}>
        Nota: {value}
      </Typography>
    </DemoSection>
  );
}

export const PHASE2_DEMO_COMPONENTS = [
  AutocompleteDemo,
  TableDemo,
  BreadcrumbsDemo,
  StepperDemo,
  DrawerDemo,
  AppBarDemo,
  ListDemo,
  BadgeDemo,
  SkeletonDemo,
  CircularProgressDemo,
  BackdropDemo,
  DatePickerDemo,
  PopoverDemo,
  FabDemo,
  RatingDemo,
];
