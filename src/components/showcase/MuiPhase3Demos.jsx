import { useMemo, useState } from 'react';
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import CallSplitOutlinedIcon from '@mui/icons-material/CallSplitOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { DataGrid } from '@mui/x-data-grid';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import WtShowcaseSection from './WtShowcaseSection';
import { MUI_COMPONENT_META } from '../../data/muiComponentCatalog';

function DemoSection({ id, children }) {
  const m = MUI_COMPONENT_META[id];
  return (
    <WtShowcaseSection id={id} title={m?.title ?? id} muiName={m?.mui} priority="low">
      {children}
    </WtShowcaseSection>
  );
}

export function DataGridDemo() {
  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'name', headerName: 'Nome', flex: 1, minWidth: 180 },
      { field: 'status', headerName: 'Status', width: 130 },
    ],
    [],
  );
  const rows = useMemo(
    () => [
      { id: 1, name: 'Projeto Atlas', status: 'Ativo' },
      { id: 2, name: 'Projeto Nexus', status: 'Pendente' },
      { id: 3, name: 'Projeto Delta', status: 'Ativo' },
    ],
    [],
  );
  return (
    <DemoSection id="data-grid">
      <Box sx={{ height: 260, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick pageSizeOptions={[5]} />
      </Box>
    </DemoSection>
  );
}

export function TreeViewDemo() {
  return (
    <DemoSection id="tree-view">
      <SimpleTreeView sx={{ maxWidth: 320 }}>
        <TreeItem itemId="root" label="Projetos">
          <TreeItem itemId="p1" label="Projeto Atlas" />
          <TreeItem itemId="p2" label="Projeto Delta" />
          <TreeItem itemId="p3" label="Projeto Nexus" />
        </TreeItem>
      </SimpleTreeView>
    </DemoSection>
  );
}

export function TransferListDemo() {
  const [left, setLeft] = useState(['Permissão A', 'Permissão B', 'Permissão C']);
  const [right, setRight] = useState(['Permissão D']);
  const [checked, setChecked] = useState([]);

  const toggle = (item) =>
    setChecked((prev) => (prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]));

  const move = (from, to, setFrom, setTo) => {
    const selected = from.filter((item) => checked.includes(item));
    setFrom(from.filter((item) => !checked.includes(item)));
    setTo([...to, ...selected]);
    setChecked((prev) => prev.filter((v) => !selected.includes(v)));
  };

  const renderList = (title, items) => (
    <Paper variant="outlined" sx={{ width: 220, minHeight: 190 }}>
      <Typography variant="subtitle2" sx={{ p: 1.5, borderBottom: 1, borderColor: 'divider' }}>
        {title}
      </Typography>
      <List dense sx={{ p: 1 }}>
        {items.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton onClick={() => toggle(item)}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Checkbox checked={checked.includes(item)} size="small" />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );

  return (
    <DemoSection id="transfer-list">
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
        {renderList('Disponíveis', left)}
        <Stack spacing={1}>
          <Button size="small" variant="outlined" onClick={() => move(left, right, setLeft, setRight)}>
            &gt;
          </Button>
          <Button size="small" variant="outlined" onClick={() => move(right, left, setRight, setLeft)}>
            &lt;
          </Button>
        </Stack>
        {renderList('Selecionadas', right)}
      </Stack>
    </DemoSection>
  );
}

export function TimelineDemo() {
  const events = [
    { label: 'Solicitação criada', time: '09:12' },
    { label: 'Análise iniciada', time: '09:45' },
    { label: 'Aguardando aprovação', time: '10:10' },
  ];
  return (
    <DemoSection id="timeline">
      <Stack spacing={1.5} sx={{ maxWidth: 420 }}>
        {events.map((item, idx) => (
          <Stack key={item.label} direction="row" spacing={1.5} alignItems="flex-start">
            <Stack alignItems="center" sx={{ pt: 0.4 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'primary.main' }} />
              {idx < events.length - 1 ? (
                <Box sx={{ width: 2, height: 26, bgcolor: 'divider', mt: 0.5 }} />
              ) : null}
            </Stack>
            <Box>
              <Typography variant="body2" fontWeight={600}>
                {item.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.time}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </DemoSection>
  );
}

export function BottomNavigationDemo() {
  const [value, setValue] = useState(0);
  return (
    <DemoSection id="bottom-navigation">
      <Paper variant="outlined" sx={{ maxWidth: 420 }}>
        <BottomNavigation value={value} onChange={(_, v) => setValue(v)}>
          <BottomNavigationAction label="Home" icon={<HomeOutlinedIcon />} />
          <BottomNavigationAction label="Dashboard" icon={<DashboardOutlinedIcon />} />
          <BottomNavigationAction label="Config." icon={<SettingsOutlinedIcon />} />
        </BottomNavigation>
      </Paper>
    </DemoSection>
  );
}

export function SpeedDialDemo() {
  const actions = [
    { icon: <FileCopyOutlinedIcon />, name: 'Duplicar' },
    { icon: <EditIcon />, name: 'Editar' },
    { icon: <DeleteIcon />, name: 'Excluir' },
  ];
  return (
    <DemoSection id="speed-dial">
      <Box sx={{ position: 'relative', height: 160 }}>
        <SpeedDial ariaLabel="Ações rápidas" icon={<SpeedDialIcon />} sx={{ position: 'absolute', bottom: 8, right: 8 }}>
          {actions.map((action) => (
            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
          ))}
        </SpeedDial>
      </Box>
    </DemoSection>
  );
}

export function ImageListDemo() {
  const items = [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600',
  ];
  return (
    <DemoSection id="image-list">
      <ImageList cols={2} rowHeight={110} sx={{ width: 280, m: 0 }}>
        {items.map((src) => (
          <ImageListItem key={src}>
            <img src={src} alt="demo" loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </DemoSection>
  );
}

export function SwipeableDrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <DemoSection id="swipeable-drawer">
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Abrir SwipeableDrawer
      </Button>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ p: 2.5 }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Painel deslizante
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Exemplo de drawer com gesto de swipe.
          </Typography>
        </Box>
      </SwipeableDrawer>
    </DemoSection>
  );
}

export function GridLayoutDemo() {
  return (
    <DemoSection id="grid-layout">
      <Grid container spacing={1.5}>
        {[1, 2, 3, 4].map((n) => (
          <Grid key={n} size={{ xs: 12, sm: 6 }}>
            <Paper variant="outlined" sx={{ p: 1.5, textAlign: 'center' }}>
              Item {n}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </DemoSection>
  );
}

export function DividerDemo() {
  return (
    <DemoSection id="divider">
      <Stack spacing={1.5} sx={{ maxWidth: 380 }}>
        <Typography variant="body2">Sessão A</Typography>
        <Divider />
        <Typography variant="body2">Sessão B</Typography>
      </Stack>
    </DemoSection>
  );
}

export function LinkDemo() {
  return (
    <DemoSection id="link">
      <Stack direction="row" spacing={2}>
        <Link href="#" underline="hover">
          Link padrão
        </Link>
        <Link href="#" underline="always" color="secondary">
          Link secundário
        </Link>
      </Stack>
    </DemoSection>
  );
}

export function PaperDemo() {
  const [open, setOpen] = useState(false);
  return (
    <DemoSection id="paper">
      <Paper variant="outlined" sx={{ p: 2, maxWidth: 420 }}>
        <Typography variant="subtitle2" fontWeight={700}>
          Cartão com Paper
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Superfície base com elevação/borda para destacar conteúdo.
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
          <IconButton size="small">
            <FolderOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => setOpen(true)}>
            <CallSplitOutlinedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Paper>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 320,
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 24,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant="subtitle1" fontWeight={700}>
            Exemplo de Modal
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Demonstração adicional de baixo uso.
          </Typography>
        </Box>
      </Modal>
    </DemoSection>
  );
}

export const PHASE3_DEMO_COMPONENTS = [
  DataGridDemo,
  TreeViewDemo,
  TransferListDemo,
  TimelineDemo,
  BottomNavigationDemo,
  SpeedDialDemo,
  ImageListDemo,
  SwipeableDrawerDemo,
  GridLayoutDemo,
  DividerDemo,
  LinkDemo,
  PaperDemo,
];
