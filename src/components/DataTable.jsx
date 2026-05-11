import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Collapse,
  InputAdornment,
  MenuItem,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

const DEFAULT_PAGE_SIZE = 5;

export default function DataTable({
  columns,
  data,
  searchableKeys = [],
  pageSize = DEFAULT_PAGE_SIZE,
  toolbarTitle = 'Registros',
  onAdd,
  filterOptions = [],
  filterValue = 'all',
  onFilterChange,
}) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ key: null, direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return data;
    const keys = searchableKeys.length ? searchableKeys : columns.map((c) => c.key);
    return data.filter((row) =>
      keys.some((key) => {
        const v = row[key];
        return String(v ?? '').toLowerCase().includes(term);
      }),
    );
  }, [data, search, searchableKeys, columns]);

  const sorted = useMemo(() => {
    if (!sort.key) return filtered;
    const arr = [...filtered];
    arr.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === 'number' && typeof bv === 'number') {
        return sort.direction === 'asc' ? av - bv : bv - av;
      }
      return sort.direction === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return arr;
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * pageSize;
  const visible = sorted.slice(startIdx, startIdx + pageSize);

  const handleSort = (key, sortable) => {
    if (sortable === false) return;
    setSort((current) => {
      if (current.key !== key) return { key, direction: 'asc' };
      if (current.direction === 'asc') return { key, direction: 'desc' };
      return { key: null, direction: 'asc' };
    });
  };

  return (
    <Card>
      <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
        <Box sx={{ flex: '1 1 200px' }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {toolbarTitle}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {sorted.length} registros
          </Typography>
        </Box>
        <TextField
          size="small"
          placeholder="Buscar…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          sx={{ flex: '1 1 220px', minWidth: 200 }}
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
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Button size="small" variant="outlined" startIcon={<FilterListIcon />} onClick={() => setShowFilters((v) => !v)}>
            Filtros
          </Button>
          <Button size="small" variant="outlined" startIcon={<DownloadIcon />}>
            Exportar
          </Button>
          {onAdd && (
            <Button size="small" variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
              Novo
            </Button>
          )}
        </Stack>
      </Box>

      <Collapse in={showFilters}>
        <Box sx={{ px: 2, pb: 2, pt: 0, borderTop: 1, borderColor: 'divider' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                label="Status"
                value={filterValue}
                onChange={(e) => onFilterChange?.(e.target.value)}
              >
                <MenuItem value="all">Todos</MenuItem>
                {filterOptions.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>
      </Collapse>

      <TableContainer component={Paper} variant="outlined" sx={{ mx: 2, mb: 0, borderRadius: 1 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => {
                const isSorted = sort.key === col.key;
                return (
                  <TableCell
                    key={col.key}
                    onClick={() => handleSort(col.key, col.sortable)}
                    sx={{
                      width: col.width,
                      cursor: col.sortable === false ? 'default' : 'pointer',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={0.5} component="span">
                      {col.label}
                      {col.sortable !== false &&
                        (isSorted ? (
                          sort.direction === 'asc' ? (
                            <ArrowUpwardIcon sx={{ fontSize: 16 }} />
                          ) : (
                            <ArrowDownwardIcon sx={{ fontSize: 16 }} />
                          )
                        ) : (
                          <UnfoldMoreIcon sx={{ fontSize: 16, opacity: 0.4 }} />
                        ))}
                    </Stack>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {visible.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            ) : (
              visible.map((row, idx) => (
                <TableRow key={row.id ?? idx} hover>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="text.secondary">
          Mostrando <strong>{visible.length === 0 ? 0 : startIdx + 1}</strong>–<strong>{startIdx + visible.length}</strong> de{' '}
          <strong>{sorted.length}</strong>
        </Typography>
        <Pagination
          size="small"
          page={safePage}
          count={totalPages}
          onChange={(_, p) => setPage(p)}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Card>
  );
}
