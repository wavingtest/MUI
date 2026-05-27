import { useState } from 'react';
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  LinearProgress,
  CircularProgress,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  InputAdornment,
  Menu,
  MenuItem,
  Pagination,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Snackbar,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import WtShowcaseSection from './WtShowcaseSection';
import { MUI_COMPONENT_META } from '../../data/muiComponentCatalog';

function DemoSection({ id, children }) {
  const m = MUI_COMPONENT_META[id];
  return (
    <WtShowcaseSection id={id} title={m?.title ?? id} muiName={m?.mui} priority="high" implemented>
      {children}
    </WtShowcaseSection>
  );
}

export function ButtonDemo() {
  return (
    <DemoSection id="button">
      <Stack direction="row" flexWrap="wrap" gap={1}>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
        <Button variant="contained" color="error">
          Destructive
        </Button>
        <Button variant="contained" disabled>
          Disabled
        </Button>
      </Stack>
    </DemoSection>
  );
}

export function TextFieldDemo() {
  return (
    <DemoSection id="text-field">
      <Stack spacing={2} maxWidth={420}>
        <TextField label="Padrão" placeholder="Digite algo" fullWidth />
        <TextField
          label="Com ícone"
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField label="Com erro" error helperText="Campo obrigatório" fullWidth />
        <TextField label="Desabilitado" disabled defaultValue="Valor fixo" fullWidth />
      </Stack>
    </DemoSection>
  );
}

export function AlertDemo() {
  return (
    <DemoSection id="alert">
      <Stack spacing={2}>
        <Alert severity="info" icon={<InfoOutlinedIcon />}>
          <AlertTitle>Alert (default)</AlertTitle>
          Mensagem inline de exemplo para validação do componente Alert.
        </Alert>
        <Alert severity="error">
          <AlertTitle>Alert (destructive)</AlertTitle>
          Variante destrutiva para cenários de erro.
        </Alert>
      </Stack>
    </DemoSection>
  );
}

export function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <DemoSection id="dialog">
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Abrir Dialog
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Dialog de exemplo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Conteúdo modal para ações que exigem foco do usuário, no padrão MUI Dialog.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </DemoSection>
  );
}

export function AlertDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <DemoSection id="alert-dialog">
      <Button variant="contained" color="error" onClick={() => setOpen(true)}>
        Abrir Alert Dialog
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirmar exclusão?</DialogTitle>
        <DialogContent>
          <DialogContentText>Esta ação não pode ser desfeita.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={() => setOpen(false)}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </DemoSection>
  );
}

export function SnackbarDemo() {
  const [snack, setSnack] = useState({ open: false, severity: 'success', message: '' });
  const show = (severity, message) => setSnack({ open: true, severity, message });
  return (
    <DemoSection id="snackbar">
      <Stack direction="row" flexWrap="wrap" gap={1}>
        <Button variant="contained" color="success" onClick={() => show('success', 'Operação concluída com sucesso.')}>
          Toast success
        </Button>
        <Button variant="contained" color="error" onClick={() => show('error', 'Falha ao processar a solicitação.')}>
          Toast error
        </Button>
        <Button variant="outlined" color="info" onClick={() => show('info', 'Informação adicional para o usuário.')}>
          Toast info
        </Button>
      </Stack>
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snack.severity} onClose={() => setSnack((s) => ({ ...s, open: false }))} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </DemoSection>
  );
}

export function SwitchDemo() {
  const [on, setOn] = useState(false);
  return (
    <DemoSection id="switch">
      <FormControlLabel
        control={<Switch checked={on} onChange={(e) => setOn(e.target.checked)} />}
        label={`Compartilha recursos: ${on ? 'ligado' : 'desligado'}`}
      />
    </DemoSection>
  );
}

export function RadioGroupDemo() {
  const [value, setValue] = useState('opcao-a');
  return (
    <DemoSection id="radio-group">
      <FormControl>
        <RadioGroup value={value} onChange={(e) => setValue(e.target.value)}>
          <FormControlLabel value="opcao-a" control={<Radio />} label="Opção A" />
          <FormControlLabel value="opcao-b" control={<Radio />} label="Opção B" />
          <FormControlLabel value="opcao-c" control={<Radio />} label="Opção C" />
        </RadioGroup>
      </FormControl>
      <Typography variant="caption" sx={{ mt: 1, display: 'block', fontFamily: 'monospace' }}>
        Selecionado: {value}
      </Typography>
    </DemoSection>
  );
}

export function CheckboxDemo() {
  const [checked, setChecked] = useState(true);
  return (
    <DemoSection id="checkbox">
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
        label="Aceito os termos de uso"
      />
    </DemoSection>
  );
}

export function SelectDemo() {
  const [value, setValue] = useState('');
  return (
    <DemoSection id="select">
      <FormControl fullWidth sx={{ maxWidth: 320 }}>
        <InputLabel id="wt-select-label">Categoria</InputLabel>
        <Select labelId="wt-select-label" label="Categoria" value={value} onChange={(e) => setValue(e.target.value)}>
          <MenuItem value="">
            <em>Selecione</em>
          </MenuItem>
          <MenuItem value="a">Categoria A</MenuItem>
          <MenuItem value="b">Categoria B</MenuItem>
        </Select>
      </FormControl>
    </DemoSection>
  );
}

export function ChipDemo() {
  return (
    <DemoSection id="chip">
      <Stack direction="row" flexWrap="wrap" gap={1}>
        <Chip label="Default" />
        <Chip label="Primary" color="primary" />
        <Chip label="Success" color="success" variant="outlined" />
        <Chip label="Deletável" onDelete={() => {}} />
      </Stack>
    </DemoSection>
  );
}

export function TabsDemo() {
  const [tab, setTab] = useState(0);
  return (
    <DemoSection id="tabs">
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="Geral" />
        <Tab label="Configurações" />
        <Tab label="Histórico" />
      </Tabs>
      <Box sx={{ pt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Conteúdo da aba {tab + 1}
        </Typography>
      </Box>
    </DemoSection>
  );
}

export function TooltipDemo() {
  return (
    <DemoSection id="tooltip">
      <Tooltip title="Dica exibida ao passar o mouse">
        <Button variant="outlined">Passe o mouse aqui</Button>
      </Tooltip>
    </DemoSection>
  );
}

export function MenuDemo() {
  const [anchor, setAnchor] = useState(null);
  return (
    <DemoSection id="menu">
      <Button variant="contained" onClick={(e) => setAnchor(e.currentTarget)}>
        Abrir Menu
      </Button>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        <MenuItem onClick={() => setAnchor(null)}>Editar</MenuItem>
        <MenuItem onClick={() => setAnchor(null)}>Duplicar</MenuItem>
        <MenuItem onClick={() => setAnchor(null)}>Excluir</MenuItem>
      </Menu>
    </DemoSection>
  );
}

export function AccordionDemo() {
  return (
    <DemoSection id="accordion">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Pergunta 1 (Accordion)</AccordionSummary>
        <AccordionDetails>Resposta da pergunta 1 com conteúdo expansível.</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Pergunta 2 (Accordion)</AccordionSummary>
        <AccordionDetails>Resposta da pergunta 2.</AccordionDetails>
      </Accordion>
    </DemoSection>
  );
}

export function CollapseDemo() {
  const [open, setOpen] = useState(false);
  return (
    <DemoSection id="collapse">
      <Button variant="outlined" onClick={() => setOpen((v) => !v)} endIcon={<ExpandMoreIcon sx={{ transform: open ? 'rotate(180deg)' : 'none' }} />}>
        Filtros avançados (Collapsible)
      </Button>
      <Collapse in={open}>
        <Box sx={{ mt: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
          <Typography variant="body2">Conteúdo oculto revelado com MUI Collapse.</Typography>
        </Box>
      </Collapse>
    </DemoSection>
  );
}

export function AvatarDemo() {
  return (
    <DemoSection id="avatar">
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: 'grey.400' }}>WT</Avatar>
        <Typography variant="body2">Avatar com fallback &apos;WT&apos; quando não há imagem.</Typography>
      </Stack>
    </DemoSection>
  );
}

export function SliderDemo() {
  const [value, setValue] = useState(50);
  return (
    <DemoSection id="slider">
      <Slider value={value} onChange={(_, v) => setValue(v)} valueLabelDisplay="auto" sx={{ maxWidth: 400 }} />
      <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
        Valor: {value}%
      </Typography>
    </DemoSection>
  );
}

export function ToggleButtonDemo() {
  const [formats, setFormats] = useState(['bold']);
  return (
    <DemoSection id="toggle-button">
      <ToggleButtonGroup
        value={formats}
        onChange={(_, v) => v.length && setFormats(v)}
        aria-label="formato de texto"
      >
        <ToggleButton value="bold" aria-label="bold">
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton value="italic" aria-label="italic">
          <FormatItalicIcon />
        </ToggleButton>
        <ToggleButton value="underline" aria-label="underline">
          <FormatUnderlinedIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Typography variant="caption" sx={{ mt: 1, display: 'block', fontFamily: 'monospace', color: 'text.secondary' }}>
        Formato: {formats.join(', ') || 'nenhum'}
      </Typography>
    </DemoSection>
  );
}

export function ProgressDemo() {
  return (
    <DemoSection id="progress">
      <Stack spacing={2} maxWidth={400}>
        <Typography variant="caption" color="text.secondary">
          Linear
        </Typography>
        <LinearProgress variant="determinate" value={72} />
        <LinearProgress />
        <Typography variant="caption" color="text.secondary" sx={{ pt: 1 }}>
          Circular
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <CircularProgress size={28} />
          <CircularProgress variant="determinate" value={65} size={40} />
        </Stack>
      </Stack>
    </DemoSection>
  );
}

export function PaginationDemo() {
  const [page, setPage] = useState(1);
  return (
    <DemoSection id="pagination">
      <Pagination count={10} page={page} onChange={(_, p) => setPage(p)} color="primary" />
      <Typography variant="caption" sx={{ mt: 1, display: 'block', fontFamily: 'monospace' }}>
        Página: {page}
      </Typography>
    </DemoSection>
  );
}

export function ScrollAreaDemo() {
  return (
    <DemoSection id="scroll-area">
      <Box
        sx={{
          maxHeight: 120,
          overflow: 'auto',
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          p: 1.5,
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Typography key={n} variant="body2" sx={{ mb: 1 }}>
            Linha {n} — conteúdo rolável do Scroll Area.
          </Typography>
        ))}
      </Box>
    </DemoSection>
  );
}

export function AspectRatioDemo() {
  return (
    <DemoSection id="aspect-ratio">
      <Box
        sx={{
          width: '100%',
          maxWidth: 480,
          aspectRatio: '16 / 9',
          bgcolor: 'primary.light',
          color: 'primary.contrastText',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography fontWeight={600}>Área 16:9 (Aspect Ratio)</Typography>
      </Box>
    </DemoSection>
  );
}

export function InputOtpDemo() {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const update = (index, val) => {
    const d = val.replace(/\D/g, '').slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = d;
      return next;
    });
  };
  const joined = digits.join('');
  return (
    <DemoSection id="input-otp">
      <Typography variant="body2" sx={{ mb: 1 }}>
        Código de 6 dígitos
      </Typography>
      <Stack direction="row" spacing={1}>
        {digits.map((d, i) => (
          <TextField
            key={i}
            value={d}
            onChange={(e) => update(i, e.target.value)}
            inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
            sx={{ width: 48 }}
          />
        ))}
      </Stack>
      <Typography variant="caption" sx={{ mt: 1, display: 'block', fontFamily: 'monospace', color: 'text.secondary' }}>
        Digitado: {joined || '(vazio)'}
      </Typography>
    </DemoSection>
  );
}

export function IconButtonDemo() {
  return (
    <DemoSection id="icon-button">
      <Stack direction="row" spacing={1}>
        <IconButton aria-label="editar" color="primary" size="small">
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="excluir" color="error" size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="buscar" size="small">
          <SearchIcon fontSize="small" />
        </IconButton>
      </Stack>
    </DemoSection>
  );
}

export function CardDemo() {
  return (
    <DemoSection id="card">
      <Card variant="outlined" sx={{ maxWidth: 400 }}>
        <CardHeader title="Card de exemplo" subheader="Subtítulo do painel" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Container padrão para agrupar conteúdo, métricas e formulários.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Cancelar</Button>
          <Button size="small" variant="contained">
            Salvar
          </Button>
        </CardActions>
      </Card>
    </DemoSection>
  );
}

/** Ordem de renderização na página (fase 1). */
export const PHASE1_DEMO_COMPONENTS = [
  ButtonDemo,
  TextFieldDemo,
  AlertDemo,
  DialogDemo,
  AlertDialogDemo,
  SnackbarDemo,
  SwitchDemo,
  RadioGroupDemo,
  CheckboxDemo,
  SelectDemo,
  ChipDemo,
  TabsDemo,
  TooltipDemo,
  MenuDemo,
  AccordionDemo,
  CollapseDemo,
  AvatarDemo,
  SliderDemo,
  ToggleButtonDemo,
  ProgressDemo,
  PaginationDemo,
  ScrollAreaDemo,
  AspectRatioDemo,
  InputOtpDemo,
  IconButtonDemo,
  CardDemo,
];
