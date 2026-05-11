import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

const ITEMS = [
  { status: 'active', nome: 'Projeto Aurora', classificacao: 'Restrito', tipo: 'Piloto', setor: 'Unidade Central' },
  { status: 'active', nome: 'Projeto Atlas', classificacao: 'Padrão', tipo: 'Parceria', setor: '' },
  { status: 'active', nome: 'Projeto Sigma', classificacao: 'Padrão', tipo: 'Parceria', setor: '' },
  { status: 'active', nome: 'Projeto Nexus', classificacao: 'Restrito', tipo: 'Operação', setor: '' },
  { status: 'active', nome: 'Projeto Delta', classificacao: 'Padrão', tipo: 'Parceria', setor: '' },
  { status: 'inactive', nome: 'Projeto Legacy', classificacao: 'Padrão', tipo: 'Parceria', setor: '' },
];

const COMPANY_ROWS = [
  ['72.938.708/0001-07', 'Empresa Alpha LTDA', 'Alpha Labs'],
  ['83.265.873/0001-53', 'Empresa Beta SA', 'Beta Group'],
  ['11.226.492/0001-54', 'Empresa Gama ME', 'Gama Hub'],
];

export default function RecordsPage() {
  const [search, setSearch] = useState('');
  const [onlyActive, setOnlyActive] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [filterChip, setFilterChip] = useState('Nome Fantasia');

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return ITEMS.filter((item) => {
      const okStatus = onlyActive ? item.status === 'active' : true;
      const okText = !term || item.nome.toLowerCase().includes(term);
      return okStatus && okText;
    });
  }, [onlyActive, search]);

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <ArrowBackIcon color="action" />
        <Typography variant="h5" fontWeight={700}>Relacionamentos</Typography>
      </Stack>

      <Typography variant="body1" fontWeight={600} sx={{ mb: 1.5, ml: 1 }}>
        Buscar por relacionamento
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} sx={{ mb: 2 }} alignItems={{ md: 'center' }}>
        <TextField
          fullWidth
          placeholder="Insira o nome do relacionamento"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}>
          + Cadastrar Relacionamento
        </Button>
        <Button variant="outlined" sx={{ textTransform: 'none', whiteSpace: 'nowrap' }} onClick={() => setCompanyOpen(true)}>
          Buscar empresa
        </Button>
      </Stack>

      <FormControlLabel
        control={<Checkbox checked={onlyActive} onChange={(e) => setOnlyActive(e.target.checked)} />}
        label="Registros ativos"
        sx={{ mb: 1 }}
      />

      <Card>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Nome do Relacionamento</TableCell>
                <TableCell>Classificação</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Setor Responsável</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((row) => (
                <TableRow key={`${row.nome}-${row.tipo}`} hover>
                  <TableCell>
                    {row.status === 'active' ? (
                      <CheckCircleOutlineRoundedIcon color="success" fontSize="small" />
                    ) : (
                      <RemoveCircleOutlineRoundedIcon color="error" fontSize="small" />
                    )}
                  </TableCell>
                  <TableCell>{row.nome}</TableCell>
                  <TableCell>{row.classificacao}</TableCell>
                  <TableCell>{row.tipo}</TableCell>
                  <TableCell>{row.setor || '-'}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small"><EditIcon sx={{ color: '#0b79d0', fontSize: 20 }} /></IconButton>
                    <IconButton size="small"><DescriptionIcon sx={{ color: '#546e7a', fontSize: 20 }} /></IconButton>
                    <IconButton size="small"><DeleteIcon sx={{ color: '#e31b0c', fontSize: 20 }} /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'center' }} sx={{ mt: 2 }}>
        <Typography variant="caption">Total de Itens Cadastrados: {filtered.length}</Typography>
        <Pagination count={4} page={1} />
      </Stack>

      <Dialog open={companyOpen} onClose={() => setCompanyOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Buscar empresa</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Filtrar por (Selecione):</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
            {['Nome Fantasia', 'Cidade', 'Documento', 'Razão Social'].map((label) => (
              <Chip
                key={label}
                label={label}
                color={filterChip === label ? 'primary' : 'default'}
                variant={filterChip === label ? 'filled' : 'outlined'}
                onClick={() => setFilterChip(label)}
              />
            ))}
          </Stack>
          <TextField
            fullWidth
            placeholder="Digite sua pesquisa"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Documento</TableCell>
                <TableCell>Razão Social</TableCell>
                <TableCell>Nome Fantasia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {COMPANY_ROWS.map((row) => (
                <TableRow key={row[0]}>
                  <TableCell>{row[0]}</TableCell>
                  <TableCell>{row[1]}</TableCell>
                  <TableCell>{row[2]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'center' }} sx={{ mt: 2 }}>
            <Typography variant="caption">Total de Itens Cadastrados: 81</Typography>
            <Pagination count={9} page={1} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCompanyOpen(false)}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

