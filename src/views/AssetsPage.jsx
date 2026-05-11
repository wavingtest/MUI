import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

const ASSET_ITEMS = [
  ['active', 'ASSET-123456789', 8, 'R$ 1,10', '17/01/2025 - 11:41'],
  ['active', 'ASSET-777', 6, 'R$ 45,00', '23/12/2024 - 13:33'],
  ['inactive', 'ASSET-9369BGV', 5, 'R$ 500,00', '17/09/2025 - 15:31'],
  ['active', 'ASSET-212X', 8, 'R$ 20,00', '18/12/2024 - 18:14'],
  ['active', 'ASSET-47147', 1, 'R$ 15.000,50', '27/04/2026 - 12:54'],
];

export default function AssetsPage() {
  const [query, setQuery] = useState('');
  const [onlyActive, setOnlyActive] = useState(false);
  const [validityPeriod, setValidityPeriod] = useState('');
  const [equipmentType, setEquipmentType] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return ASSET_ITEMS.filter(([status, identifier]) => {
      const okStatus = onlyActive ? status === 'active' : true;
      const okText = !q || identifier.toLowerCase().includes(q);
      return okStatus && okText;
    });
  }, [onlyActive, query]);

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <ArrowBackIcon color="action" />
        <Typography variant="h5" fontWeight={700}>Ativos com complemento financeiro</Typography>
      </Stack>

      <Typography variant="body1" sx={{ mb: 1.5, ml: 1, fontWeight: 500 }}>
        Buscar por identificador
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Insira o identificador do ativo"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          inputProps={{ maxLength: 17 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}>
          + Cadastrar Ativo
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <FormControlLabel
          control={<Checkbox checked={onlyActive} onChange={(e) => setOnlyActive(e.target.checked)} />}
          label="Registros Ativos"
        />
        <TextField
          type="date"
          placeholder="Selecione o período de vigência"
          value={validityPeriod}
          onChange={(e) => setValidityPeriod(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ width: { xs: '100%', sm: 300 } }}
        />
        <TextField
          select
          value={equipmentType}
          onChange={(e) => setEquipmentType(e.target.value)}
          SelectProps={{ displayEmpty: true }}
          sx={{ width: { xs: '100%', sm: 280 } }}
        >
          <MenuItem value="" disabled>Selecione o Tipo de Equipamento</MenuItem>
          <MenuItem value="scanner">Scanner</MenuItem>
          <MenuItem value="camera">Câmera</MenuItem>
          <MenuItem value="balanca">Balança</MenuItem>
        </TextField>
      </Stack>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Identificador</TableCell>
            <TableCell>Quantidade Notas</TableCell>
            <TableCell>Valor Total</TableCell>
            <TableCell>Data/Hora Cadastro</TableCell>
            <TableCell>Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((row) => (
            <TableRow key={row[1]} hover>
              <TableCell>
                {row[0] === 'active' ? (
                  <CheckCircleOutlineRoundedIcon color="success" fontSize="small" />
                ) : (
                  <RemoveCircleOutlineRoundedIcon color="error" fontSize="small" />
                )}
              </TableCell>
              <TableCell>{row[1]}</TableCell>
              <TableCell>{row[2]}</TableCell>
              <TableCell>{row[3]}</TableCell>
              <TableCell>{row[4]}</TableCell>
              <TableCell>
                <IconButton size="small">
                  <EditIcon sx={{ color: '#0b79d0', fontSize: 20 }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'center' }} sx={{ mt: 2 }}>
        <Typography variant="caption">Total de Itens Cadastrados: 122</Typography>
        <Pagination count={13} page={1} />
      </Stack>
    </Box>
  );
}

