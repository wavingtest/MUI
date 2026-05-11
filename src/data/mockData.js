export const STAT_CARDS = [
  {
    label: 'Receita',
    value: 'R$ 128.430',
    delta: '12,4%',
    deltaDirection: 'up',
    icon: 'coins',
    hint: 'vs. mês passado',
  },
  {
    label: 'Novos clientes',
    value: '1.284',
    delta: '8,1%',
    deltaDirection: 'up',
    icon: 'userPlus',
    hint: 'últimos 30 dias',
  },
  {
    label: 'Pedidos pendentes',
    value: '37',
    delta: '3,2%',
    deltaDirection: 'down',
    icon: 'box',
    hint: 'fila atual',
  },
  {
    label: 'Taxa de conversão',
    value: '4,76%',
    delta: '0,4%',
    deltaDirection: 'up',
    icon: 'bullseye',
    hint: 'média 7 dias',
  },
];

export const ORDERS = [
  {
    id: 'PED-1042',
    customer: { name: 'Helena Castro', email: 'helena.castro@example.com' },
    total: 1289.9,
    status: 'success',
    statusLabel: 'Pago',
    createdAt: '2026-04-22',
  },
  {
    id: 'PED-1041',
    customer: { name: 'Daniel Souza', email: 'daniel.souza@example.com' },
    total: 432.1,
    status: 'warning',
    statusLabel: 'Aguardando',
    createdAt: '2026-04-22',
  },
  {
    id: 'PED-1040',
    customer: { name: 'Marina Pires', email: 'marina.pires@example.com' },
    total: 89.0,
    status: 'success',
    statusLabel: 'Pago',
    createdAt: '2026-04-21',
  },
  {
    id: 'PED-1039',
    customer: { name: 'Ricardo Maia', email: 'ricardo.maia@example.com' },
    total: 2178.4,
    status: 'danger',
    statusLabel: 'Cancelado',
    createdAt: '2026-04-21',
  },
  {
    id: 'PED-1038',
    customer: { name: 'Camila Vieira', email: 'camila.vieira@example.com' },
    total: 540.55,
    status: 'info',
    statusLabel: 'Em separação',
    createdAt: '2026-04-20',
  },
  {
    id: 'PED-1037',
    customer: { name: 'Bruno Tavares', email: 'bruno.tavares@example.com' },
    total: 75.0,
    status: 'success',
    statusLabel: 'Pago',
    createdAt: '2026-04-20',
  },
  {
    id: 'PED-1036',
    customer: { name: 'Sofia Andrade', email: 'sofia.andrade@example.com' },
    total: 312.7,
    status: 'warning',
    statusLabel: 'Aguardando',
    createdAt: '2026-04-19',
  },
  {
    id: 'PED-1035',
    customer: { name: 'Lucas Ferraz', email: 'lucas.ferraz@example.com' },
    total: 1820.0,
    status: 'success',
    statusLabel: 'Pago',
    createdAt: '2026-04-19',
  },
  {
    id: 'PED-1034',
    customer: { name: 'Patrícia Lima', email: 'patricia.lima@example.com' },
    total: 99.9,
    status: 'info',
    statusLabel: 'Em separação',
    createdAt: '2026-04-18',
  },
  {
    id: 'PED-1033',
    customer: { name: 'André Nunes', email: 'andre.nunes@example.com' },
    total: 4302.0,
    status: 'success',
    statusLabel: 'Pago',
    createdAt: '2026-04-18',
  },
  {
    id: 'PED-1032',
    customer: { name: 'Júlia Borges', email: 'julia.borges@example.com' },
    total: 18.9,
    status: 'danger',
    statusLabel: 'Cancelado',
    createdAt: '2026-04-17',
  },
  {
    id: 'PED-1031',
    customer: { name: 'Felipe Rangel', email: 'felipe.rangel@example.com' },
    total: 660.0,
    status: 'success',
    statusLabel: 'Pago',
    createdAt: '2026-04-17',
  },
];

export const TRAFFIC_SOURCES = {
  labels: ['Orgânico', 'Pago', 'Direto', 'Social', 'Email'],
  values: [38, 22, 18, 14, 8],
};

export const ACTIVITY_FEED = [
  { id: 1, label: 'Helena Castro fechou o pedido PED-1042', time: 'há 4 min', icon: 'check', tone: 'success' },
  { id: 2, label: '3 novos clientes aguardando aprovação', time: 'há 22 min', icon: 'userClock', tone: 'warning' },
  { id: 3, label: 'Relatório de fechamento de abril gerado', time: 'há 1 h', icon: 'file', tone: 'info' },
  { id: 4, label: 'Pedido PED-1039 cancelado por Ricardo Maia', time: 'há 3 h', icon: 'cancel', tone: 'danger' },
  { id: 5, label: 'Backup automático concluído', time: 'há 6 h', icon: 'database', tone: 'info' },
];

export const PROFILE = {
  fullName: 'Alex Morgan',
  email: 'alex.morgan@demo.dashboard',
  role: 'Administrador',
  phone: '+55 (11) 99999-0000',
  bio:
    'Trabalha com operação e produto há 6 anos. Gosta de processos enxutos, painéis claros e times pequenos.',
  city: 'São Paulo',
  country: 'Brasil',
  language: 'pt-BR',
};
