import { useMemo, useState } from 'react';
import {
  Box,
  IconButton,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
  Card,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';

const REGION_ROWS = [
  ['101', 'N1', 'Região Norte 1'],
  ['102', 'N2', 'Região Norte 2'],
  ['201', 'L1', 'Região Leste 1'],
  ['202', 'L2', 'Região Leste 2'],
  ['301', 'C1', 'Região Centro 1'],
  ['302', 'C2', 'Região Centro 2'],
  ['401', 'S1', 'Região Sul 1'],
  ['402', 'S2', 'Região Sul 2'],
  ['501', 'O1', 'Região Oeste 1'],
  ['502', 'O2', 'Região Oeste 2'],
];

export default function RegionsPage() {
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return REGION_ROWS;
    return REGION_ROWS.filter((row) => row.some((v) => v.toLowerCase().includes(q)));
  }, [query]);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1, ml: 1, fontWeight: 600 }}>
        Buscar por nome ou sigla
      </Typography>

      <TextField
        fullWidth
        placeholder="Insira o nome ou o código da região"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 2 }}
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

      <Card sx={{ p: 1.5 }}>
        {rows.map((row) => (
          <Stack
            key={`${row[0]}-${row[1]}`}
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ py: 1.25, borderBottom: '1px solid', borderColor: 'divider' }}
          >
            <Box sx={{ border: '1px solid #999', borderRadius: 4, px: 1.2, py: 0.2, color: 'text.secondary', fontSize: 12 }}>
              {row[0]}
            </Box>
            <Typography sx={{ width: 70, fontSize: 22, fontWeight: 500 }}>{row[1]}</Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>{row[2]}</Typography>
            <IconButton size="small">
              <EditIcon sx={{ color: '#0b79d0', fontSize: 20 }} />
            </IconButton>
          </Stack>
        ))}
      </Card>

      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'center' }} sx={{ mt: 2 }}>
        <Typography variant="caption">Total de Itens Cadastrados: 27</Typography>
        <Pagination count={3} page={1} />
      </Stack>
    </Box>
  );
}

