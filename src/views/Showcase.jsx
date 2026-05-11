import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Avatar,
  Select,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import { STAT_CARDS, ORDERS, TRAFFIC_SOURCES, ACTIVITY_FEED } from '../data/mockData';
import RecordsPage from './RecordsPage';
import RegionsPage from './RegionsPage';
import AssetsPage from './AssetsPage';

const currency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const REVENUE_BY_PERIOD = {
  today: {
    labels: ['08h', '10h', '12h', '14h', '16h', '18h', '20h'],
    current: [6, 9, 14, 18, 15, 22, 19],
    previous: [4, 7, 10, 12, 11, 15, 14],
  },
  week: {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
    current: [28, 42, 37, 51, 64, 59, 31],
    previous: [22, 31, 35, 39, 47, 43, 26],
  },
  month: {
    labels: ['S1', 'S2', 'S3', 'S4'],
    current: [140, 186, 174, 221],
    previous: [118, 147, 155, 189],
  },
  year: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set'],
    current: [42, 51, 48, 63, 72, 68, 81, 92, 88],
    previous: [33, 39, 41, 47, 53, 58, 60, 64, 70],
  },
};

const EMPTY_ORDER_FORM = {
  id: '',
  name: '',
  email: '',
  total: '',
  status: 'warning',
  createdAt: '',
};

const STATUS_META = {
  success: 'Pago',
  warning: 'Aguardando',
  danger: 'Cancelado',
  info: 'Em separação',
};

const OPS_COLUMN_OPTIONS = [
  { key: 'name', label: 'Nome' },
  { key: 'tma', label: 'TMA' },
  { key: 'tme', label: 'TME' },
  { key: 'tmrAssign', label: 'TMR Atribuição' },
  { key: 'inAttendance', label: 'Em atendimento' },
  { key: 'assigned', label: 'Atribuídas' },
  { key: 'waiting', label: 'Em espera' },
  { key: 'closed', label: 'Encerradas' },
  { key: 'csat', label: 'CSAT' },
  { key: 'nps', label: 'NPS' },
];

const OPS_ROWS = [
  {
    id: 'Q-01',
    name: 'Suporte',
    tma: '04:12',
    tme: '01:08',
    tmrAssign: '00:33',
    inAttendance: 18,
    assigned: 26,
    waiting: 5,
    closed: 84,
    csat: '94%',
    nps: '71',
  },
  {
    id: 'Q-02',
    name: 'Comercial',
    tma: '05:05',
    tme: '00:58',
    tmrAssign: '00:22',
    inAttendance: 11,
    assigned: 14,
    waiting: 3,
    closed: 41,
    csat: '91%',
    nps: '68',
  },
  {
    id: 'Q-03',
    name: 'Whatsapp',
    tma: '03:47',
    tme: '00:49',
    tmrAssign: '00:19',
    inAttendance: 29,
    assigned: 34,
    waiting: 7,
    closed: 120,
    csat: '96%',
    nps: '77',
  },
];

const AGENTS_ROWS = [
  { id: 'A-01', name: 'teste02', extension: '1718', queues: 'Suporte, Comercial' },
  { id: 'A-02', name: 'Laura Oliveira', extension: '1010', queues: 'Whatsapp, Suporte' },
];

const ACTIVITY_ICONS = {
  check: CheckCircleOutlineIcon,
  userClock: PendingActionsOutlinedIcon,
  file: DescriptionOutlinedIcon,
  cancel: CancelOutlinedIcon,
  database: StorageOutlinedIcon,
};

const STATUS_CHIP_COLOR = {
  success: 'success',
  warning: 'warning',
  danger: 'error',
  info: 'info',
};

export default function Showcase() {
  const [pill, setPill] = useState('today');
  const [modalOpen, setModalOpen] = useState(false);
  const [orders, setOrders] = useState(ORDERS);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateStart, setDateStart] = useState(dayjs('2026-04-01'));
  const [dateEnd, setDateEnd] = useState(dayjs('2026-04-30'));
  const [orderForm, setOrderForm] = useState({
    ...EMPTY_ORDER_FORM,
    createdAt: new Date().toISOString().slice(0, 10),
  });
  const [topbarAiOpen, setTopbarAiOpen] = useState(null);
  const [topbarNotifOpen, setTopbarNotifOpen] = useState(null);
  const [topbarProfileOpen, setTopbarProfileOpen] = useState(null);
  const [opsConfigOpen, setOpsConfigOpen] = useState(null);
  const [opsColumnsOpen, setOpsColumnsOpen] = useState(null);
  const [reorderMode, setReorderMode] = useState('shift');
  const [visibleOpsColumns, setVisibleOpsColumns] = useState(
    OPS_COLUMN_OPTIONS.reduce((acc, col) => ({ ...acc, [col.key]: true }), {}),
  );
  const [selectedAiAgent, setSelectedAiAgent] = useState('');
  const [topbarFeedback, setTopbarFeedback] = useState('Pronto para interações');
  const [opsSort, setOpsSort] = useState({ key: 'name', direction: 'asc' });
  const [selectedSupervisorAgent, setSelectedSupervisorAgent] = useState(null);
  const [splitPanelText, setSplitPanelText] = useState('Área reservada para iframe/embed');

  const visibleOpsList = useMemo(
    () => OPS_COLUMN_OPTIONS.filter((col) => visibleOpsColumns[col.key]),
    [visibleOpsColumns],
  );
  const orderedOpsColumns = useMemo(
    () => (reorderMode === 'swap' ? [...visibleOpsList].reverse() : visibleOpsList),
    [reorderMode, visibleOpsList],
  );
  const displayedOpsRows = useMemo(() => {
    const rows = [...OPS_ROWS];
    rows.sort((a, b) => {
      const av = a[opsSort.key];
      const bv = b[opsSort.key];
      if (typeof av === 'number' && typeof bv === 'number') {
        return opsSort.direction === 'asc' ? av - bv : bv - av;
      }
      return opsSort.direction === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return rows;
  }, [opsSort]);

  const selectedSeries = REVENUE_BY_PERIOD[pill];

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'all') return orders;
    return orders.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter]);

  const tableColumns = [
    { key: 'id', label: 'Pedido', width: 120 },
    {
      key: 'customer',
      label: 'Cliente',
      sortable: false,
      render: (customer) => (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: 'grey.300',
              color: 'grey.800',
              fontSize: '0.8rem',
            }}
          >
            {customer.name
              .split(' ')
              .map((p) => p[0])
              .slice(0, 2)
              .join('')}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600}>
              {customer.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {customer.email}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      key: 'total',
      label: 'Total',
      width: 130,
      render: (total) => (
        <Typography variant="body2" fontWeight={700}>
          {currency(total)}
        </Typography>
      ),
    },
    {
      key: 'statusLabel',
      label: 'Status',
      width: 150,
      render: (label, row) => (
        <Chip size="small" label={label} color={STATUS_CHIP_COLOR[row.status] ?? 'default'} variant="outlined" />
      ),
    },
    { key: 'createdAt', label: 'Criado em', width: 130 },
    {
      key: '__actions',
      label: '',
      sortable: false,
      width: 100,
      render: () => (
        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
          <IconButton size="small" aria-label="Visualizar">
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" aria-label="Mais opções">
            <MenuIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const toggleOpsColumn = (key) => {
    setVisibleOpsColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const resetOpsPreferences = () => {
    setVisibleOpsColumns(OPS_COLUMN_OPTIONS.reduce((acc, col) => ({ ...acc, [col.key]: true }), {}));
    setReorderMode('shift');
    setOpsSort({ key: 'name', direction: 'asc' });
    setTopbarFeedback('Preferências da grade restauradas');
  };
  const handleOpsSort = (key) => {
    setOpsSort((prev) => {
      if (prev.key !== key) return { key, direction: 'asc' };
      return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
    });
  };
  const handleSupervisorAction = (agent, actionLabel) => {
    setSelectedSupervisorAgent(agent.id);
    setSplitPanelText(`${actionLabel} aplicado para ${agent.name} (ramal ${agent.extension})`);
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!orderForm.id || !orderForm.name || !orderForm.email || !orderForm.total) return;

    const newOrder = {
      id: orderForm.id,
      customer: { name: orderForm.name, email: orderForm.email },
      total: Number(orderForm.total),
      status: orderForm.status,
      statusLabel: STATUS_META[orderForm.status],
      createdAt: orderForm.createdAt || new Date().toISOString().slice(0, 10),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setModalOpen(false);
    setOrderForm({ ...EMPTY_ORDER_FORM, createdAt: new Date().toISOString().slice(0, 10) });
    setStatusFilter('all');
  };

  return (
    <>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', md: 'flex-end' }}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Visão geral
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Showcase de componentes com Material UI e paleta neutra.
          </Typography>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'flex-end' }}>
          <DatePicker label="De" value={dateStart} onChange={(v) => v && setDateStart(v)} slotProps={{ textField: { size: 'small' } }} />
          <DatePicker label="Até" value={dateEnd} onChange={(v) => v && setDateEnd(v)} slotProps={{ textField: { size: 'small' } }} />
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setModalOpen(true)}>
            Novo pedido
          </Button>
        </Stack>
      </Stack>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ lg: 'center' }}>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
                <MenuIcon fontSize="small" />
              </IconButton>
              <TextField
                size="small"
                placeholder="Buscar agente, fila ou ramal"
                sx={{ minWidth: { xs: '100%', sm: 280 } }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <>
                <Button size="small" variant="outlined" startIcon={<AutoAwesomeIcon />} onClick={(e) => setTopbarAiOpen(e.currentTarget)}>
                  FlexIA Squad
                </Button>
                <Menu anchorEl={topbarAiOpen} open={Boolean(topbarAiOpen)} onClose={() => setTopbarAiOpen(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                  <Box sx={{ p: 2, minWidth: 280 }}>
                    <Typography variant="caption" color="text.secondary">
                      Selecione o agente de IA
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      sx={{ mt: 1, mb: 1 }}
                      label="Agente"
                      value={selectedAiAgent}
                      onChange={(e) => setSelectedAiAgent(e.target.value)}
                    >
                      <MenuItem value="">Selecione um agente</MenuItem>
                      <MenuItem value="Assistente Comercial">Assistente Comercial</MenuItem>
                      <MenuItem value="Assistente Suporte">Assistente Suporte</MenuItem>
                    </TextField>
                    <Button
                      fullWidth
                      size="small"
                      variant="contained"
                      onClick={() => {
                        setTopbarFeedback(
                          selectedAiAgent ? `Conversa iniciada com ${selectedAiAgent}` : 'Selecione um agente de IA',
                        );
                        setTopbarAiOpen(null);
                      }}
                    >
                      Iniciar conversa
                    </Button>
                  </Box>
                </Menu>
              </>
              <>
                <IconButton size="small" sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }} onClick={(e) => setTopbarNotifOpen(e.currentTarget)}>
                  <NotificationsNoneIcon fontSize="small" />
                </IconButton>
                <Menu anchorEl={topbarNotifOpen} open={Boolean(topbarNotifOpen)} onClose={() => setTopbarNotifOpen(null)}>
                  <MenuItem disabled>Notificações</MenuItem>
                  <MenuItem
                    onClick={() => {
                      setTopbarFeedback('Abrindo fila Suporte');
                      setTopbarNotifOpen(null);
                    }}
                  >
                    Novos atendimentos na fila Suporte
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setTopbarFeedback('Relatório diário selecionado');
                      setTopbarNotifOpen(null);
                    }}
                  >
                    Relatório diário gerado
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    sx={{ justifyContent: 'center' }}
                    onClick={() => {
                      setTopbarFeedback('Listando notificações');
                      setTopbarNotifOpen(null);
                    }}
                  >
                    Ver tudo
                  </MenuItem>
                </Menu>
              </>
              <>
                <Button size="small" variant="outlined" startIcon={<AccountCircleOutlinedIcon />} onClick={(e) => setTopbarProfileOpen(e.currentTarget)}>
                  Teste_QA
                </Button>
                <Menu anchorEl={topbarProfileOpen} open={Boolean(topbarProfileOpen)} onClose={() => setTopbarProfileOpen(null)}>
                  <MenuItem onClick={() => setTopbarProfileOpen(null)}>Configurações</MenuItem>
                  <MenuItem onClick={() => setTopbarProfileOpen(null)}>Alterar senha</MenuItem>
                  <MenuItem onClick={() => setTopbarProfileOpen(null)}>Editar perfil</MenuItem>
                  <Divider />
                  <MenuItem onClick={() => setTopbarProfileOpen(null)}>Sair</MenuItem>
                </Menu>
              </>
            </Stack>
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {topbarFeedback}
          </Typography>
        </CardContent>
      </Card>

      <Stack direction={{ xs: 'column', xl: 'row' }} spacing={2} sx={{ mb: 2 }}>
        {STAT_CARDS.map((stat) => (
          <Box key={stat.label} sx={{ flex: '1 1 220px' }}>
            <StatCard {...stat} />
          </Box>
        ))}
      </Stack>

      <Stack direction={{ xs: 'column', xl: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <Card sx={{ flex: 2 }}>
          <CardHeader
            title="Receita"
            subheader={`${dateStart.format('YYYY-MM-DD')} até ${dateEnd.format('YYYY-MM-DD')}`}
            action={
              <ToggleButtonGroup
                exclusive
                size="small"
                value={pill}
                onChange={(_, v) => v && setPill(v)}
                sx={{ flexWrap: 'wrap' }}
              >
                {[
                  { id: 'today', label: 'Hoje' },
                  { id: 'week', label: 'Semana' },
                  { id: 'month', label: 'Mês' },
                  { id: 'year', label: 'Ano' },
                ].map((item) => (
                  <ToggleButton key={item.id} value={item.id} sx={{ textTransform: 'none', px: 1.5 }}>
                    {item.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            }
            sx={{ flexWrap: 'wrap', gap: 1, '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
          />
          <CardContent>
            <Stack spacing={1.5}>
              {selectedSeries.labels.map((label, index) => {
                const current = selectedSeries.current[index];
                const previous = selectedSeries.previous[index];
                const max = Math.max(...selectedSeries.current, ...selectedSeries.previous);
                const currentPct = Math.round((current / max) * 100);
                const previousPct = Math.round((previous / max) * 100);
                return (
                  <Box key={label}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                      <Typography variant="caption" fontWeight={600}>{label}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Atual: {current} | Anterior: {previous}
                      </Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={currentPct} sx={{ height: 8, borderRadius: 2, mb: 0.5 }} />
                    <LinearProgress color="secondary" variant="determinate" value={previousPct} sx={{ height: 6, borderRadius: 2 }} />
                  </Box>
                );
              })}
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardHeader title="Origem do tráfego" subheader="Últimos 7 dias" />
          <CardContent>
            <Stack spacing={1.5}>
              {TRAFFIC_SOURCES.labels.map((label, index) => (
                <Box key={label}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Typography variant="body2">{label}</Typography>
                    <Typography variant="body2" fontWeight={600}>{TRAFFIC_SOURCES.values[index]}%</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={TRAFFIC_SOURCES.values[index]} sx={{ height: 8, borderRadius: 2 }} />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Stack direction={{ xs: 'column', xl: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <Card sx={{ flex: 2 }}>
          <CardHeader title="Pedidos por dia" subheader="esta semana" />
          <CardContent>
            <Stack spacing={1.25}>
              {[42, 58, 71, 64, 80, 92, 36].map((value, index) => (
                <Box key={index}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Typography variant="caption">{['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'][index]}</Typography>
                    <Typography variant="caption" fontWeight={700}>{value}</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={value} color="primary" sx={{ height: 8, borderRadius: 2 }} />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardHeader title="Atividade recente" />
          <CardContent sx={{ pt: 0 }}>
            <Stack divider={<Divider flexItem />} spacing={0}>
              {ACTIVITY_FEED.map((item) => {
                const Icon = ACTIVITY_ICONS[item.icon] ?? InfoOutlinedIcon;
                return (
                  <Stack key={item.id} direction="row" spacing={2} sx={{ py: 1.5 }} alignItems="flex-start">
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1,
                        bgcolor: 'grey.100',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'grey.700',
                        flexShrink: 0,
                      }}
                    >
                      <Icon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.primary">
                        {item.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.time}
                      </Typography>
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Box sx={{ mb: 2 }}>
        <DataTable
          columns={tableColumns}
          data={filteredOrders}
          searchableKeys={['id', 'statusLabel', 'createdAt']}
          toolbarTitle="Pedidos recentes"
          onAdd={() => setModalOpen(true)}
          pageSize={6}
          filterOptions={Object.entries(STATUS_META).map(([value, label]) => ({ value, label }))}
          filterValue={statusFilter}
          onFilterChange={setStatusFilter}
        />
      </Box>

      <Card sx={{ mb: 2 }}>
        <CardHeader title="Monitoramento unificado — Filas" subheader="Grid operacional com configurações de colunas" />
        <CardContent>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
            <Button size="small" variant="outlined" startIcon={<SettingsIcon />} onClick={(e) => setOpsConfigOpen(e.currentTarget)}>
              Configurações
            </Button>
            <Menu anchorEl={opsConfigOpen} open={Boolean(opsConfigOpen)} onClose={() => setOpsConfigOpen(null)}>
              <Box sx={{ p: 2, minWidth: 300 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Reordenação de colunas
                </Typography>
                <RadioGroup value={reorderMode} onChange={(e) => setReorderMode(e.target.value)}>
                  <FormControlLabel value="shift" control={<Radio size="small" />} label="Empurrar (Shift)" />
                  <FormControlLabel value="swap" control={<Radio size="small" />} label="Trocar (Swap)" />
                </RadioGroup>
              </Box>
            </Menu>
            <Button size="small" variant="outlined" startIcon={<DeleteOutlineIcon />} onClick={resetOpsPreferences}>
              Limpar memória
            </Button>
            <Button size="small" variant="outlined" startIcon={<VisibilityOutlinedIcon />} onClick={(e) => setOpsColumnsOpen(e.currentTarget)}>
              Visualizar colunas
            </Button>
            <Menu anchorEl={opsColumnsOpen} open={Boolean(opsColumnsOpen)} onClose={() => setOpsColumnsOpen(null)}>
              <Box sx={{ p: 2, minWidth: 260 }}>
                {OPS_COLUMN_OPTIONS.map((col) => (
                  <FormControlLabel
                    key={col.key}
                    control={<Checkbox size="small" checked={visibleOpsColumns[col.key]} onChange={() => toggleOpsColumn(col.key)} />}
                    label={col.label}
                  />
                ))}
              </Box>
            </Menu>
          </Stack>

          <Table size="small">
            <TableHead>
              <TableRow>
                {visibleOpsList.map((col) => (
                  <TableCell key={col.key}>{col.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedOpsRows.map((row) => (
                <TableRow key={row.id}>
                  {orderedOpsColumns.map((col) => (
                    <TableCell key={`${row.id}-${col.key}`}>{row[col.key]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
            {orderedOpsColumns.map((col) => (
              <Button
                key={`sort-${col.key}`}
                size="small"
                variant={opsSort.key === col.key ? 'contained' : 'outlined'}
                onClick={() => handleOpsSort(col.key)}
              >
                {col.label} {opsSort.key === col.key ? (opsSort.direction === 'asc' ? '↑' : '↓') : ''}
              </Button>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <Card sx={{ flex: 2 }}>
          <CardHeader title="Painel do supervisor — Telefonia" action={<Button size="small" variant="contained">Adicionar agente</Button>} />
          <CardContent>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Deslogar</TableCell>
                  <TableCell>Agente</TableCell>
                  <TableCell>Ramal</TableCell>
                  <TableCell>Pausar/Despausar</TableCell>
                  <TableCell>Filas</TableCell>
                  <TableCell>Penalidade</TableCell>
                  <TableCell>Espionar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AGENTS_ROWS.map((agent) => (
                  <TableRow key={agent.id} selected={selectedSupervisorAgent === agent.id} hover>
                    <TableCell>
                      <Button size="small" color="error" variant="outlined" onClick={() => handleSupervisorAction(agent, 'Logout')}>
                        Off
                      </Button>
                    </TableCell>
                    <TableCell>{agent.name}</TableCell>
                    <TableCell>{agent.extension}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <TextField select size="small" defaultValue="" SelectProps={{ displayEmpty: true }} sx={{ minWidth: 160 }}>
                          <MenuItem value="">Selecione uma pausa</MenuItem>
                        </TextField>
                        <Button size="small" variant="contained" onClick={() => handleSupervisorAction(agent, 'Pausa')}>
                          Pausar
                        </Button>
                      </Stack>
                    </TableCell>
                    <TableCell>{agent.queues}</TableCell>
                    <TableCell>
                      <Button size="small" variant="contained" onClick={() => handleSupervisorAction(agent, 'Penalidade')}>
                        Alterar
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="contained" onClick={() => handleSupervisorAction(agent, 'Espionagem')}>
                        Espionar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardHeader title="Tela sistema (split panel)" />
          <CardContent>
            <Box
              sx={{
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, py: 1, bgcolor: 'grey.50' }}>
                <Typography variant="subtitle2">Tela de sistemas</Typography>
                <Typography color="text.secondary">×</Typography>
              </Stack>
              <Box sx={{ p: 2, minHeight: 120 }}>{splitPanelText}</Box>
            </Box>
          </CardContent>
        </Card>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <Card sx={{ flex: 1 }}>
          <CardHeader title="Botões" />
          <CardContent>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Button variant="contained" color="primary">
                Primário
              </Button>
              <Button variant="contained" color="secondary">
                Secundário
              </Button>
              <Button variant="outlined">Outline</Button>
              <Button variant="contained" color="success">
                Sucesso
              </Button>
              <Button variant="contained" color="warning">
                Aviso
              </Button>
              <Button variant="contained" color="error">
                Erro
              </Button>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardHeader title="Badges e status" />
          <CardContent>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
              {['primary', 'secondary', 'success', 'warning', 'error', 'info'].map((c) => (
                <Chip key={c} label={c} color={c} size="small" />
              ))}
              <Chip label="Pill" variant="outlined" size="small" />
              <Chip label="Ativo" color="success" size="small" variant="outlined" />
              <Chip label="Pendente" color="warning" size="small" variant="outlined" />
              <Chip label="Bloqueado" color="error" size="small" variant="outlined" />
              <Chip label="Em revisão" color="info" size="small" variant="outlined" />
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <Card sx={{ flex: 1 }}>
          <CardHeader title="Alertas" />
          <CardContent>
            <Stack spacing={1}>
              <Alert severity="info" icon={<InfoOutlinedIcon />}>
                Ambiente de demonstração do dashboard.
              </Alert>
              <Alert severity="success">Configurações salvas.</Alert>
              <Alert severity="warning">Backup pendente.</Alert>
              <Alert severity="error">Falha ao processar 2 pedidos.</Alert>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardHeader title="Progresso" />
          <CardContent>
            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Meta semanal
                </Typography>
                <LinearProgress variant="determinate" value={72} sx={{ mt: 0.5, height: 8, borderRadius: 4 }} />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Filas
                </Typography>
                <LinearProgress variant="determinate" color="secondary" value={45} sx={{ mt: 0.5, height: 8, borderRadius: 4 }} />
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Card sx={{ mb: 2 }}>
        <CardHeader title="FAQ rápido" />
        <CardContent>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>Como exporto os dados da tabela?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                Use o botão Exportar no topo da tabela.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>Posso customizar os widgets?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                Sim. Este projeto é base para evolução.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>O tema escuro está disponível?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                Não nesta build.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardHeader title="Componentes centralizados" subheader="Todos os módulos em uma única aba" />
        <CardContent>
          <Stack spacing={4}>
            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Relacionamentos
              </Typography>
              <RecordsPage />
            </Box>
            <Divider />
            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Regiões
              </Typography>
              <RegionsPage />
            </Box>
            <Divider />
            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Ativos
              </Typography>
              <AssetsPage />
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <Box component="form" onSubmit={handleCreateOrder}>
          <DialogTitle>Novo pedido</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  required
                  fullWidth
                  label="Código"
                  value={orderForm.id}
                  onChange={(e) => setOrderForm((prev) => ({ ...prev, id: e.target.value }))}
                  placeholder="PED-1050"
                />
                <TextField
                  required
                  fullWidth
                  label="Total"
                  type="number"
                  inputProps={{ min: 0, step: '0.01' }}
                  value={orderForm.total}
                  onChange={(e) => setOrderForm((prev) => ({ ...prev, total: e.target.value }))}
                  placeholder="199.90"
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  required
                  fullWidth
                  label="Cliente"
                  value={orderForm.name}
                  onChange={(e) => setOrderForm((prev) => ({ ...prev, name: e.target.value }))}
                />
                <TextField
                  required
                  fullWidth
                  label="E-mail"
                  type="email"
                  value={orderForm.email}
                  onChange={(e) => setOrderForm((prev) => ({ ...prev, email: e.target.value }))}
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl fullWidth>
                  <InputLabel id="order-status-label">Status</InputLabel>
                  <Select
                    labelId="order-status-label"
                    label="Status"
                    value={orderForm.status}
                    onChange={(e) => setOrderForm((prev) => ({ ...prev, status: e.target.value }))}
                  >
                    {Object.entries(STATUS_META).map(([value, label]) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Data"
                  type="date"
                  value={orderForm.createdAt}
                  onChange={(e) => setOrderForm((prev) => ({ ...prev, createdAt: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained">
              Criar pedido
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
