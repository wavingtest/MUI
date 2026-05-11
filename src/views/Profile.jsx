import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutlineOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { PROFILE } from '../data/mockData';

const initialErrors = { fullName: '', email: '', phone: '' };

export default function Profile() {
  const [form, setForm] = useState({
    fullName: PROFILE.fullName,
    email: PROFILE.email,
    phone: PROFILE.phone,
    bio: PROFILE.bio,
    city: PROFILE.city,
    country: PROFILE.country,
    language: PROFILE.language,
    notifyEmail: true,
    notifyPush: false,
    twoFactor: true,
  });
  const [errors, setErrors] = useState(initialErrors);
  const [saved, setSaved] = useState(false);

  const update = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const validate = () => {
    const next = { ...initialErrors };
    if (!form.fullName.trim()) next.fullName = 'Informe seu nome.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'E-mail inválido.';
    if (form.phone && form.phone.replace(/\D/g, '').length < 10)
      next.phone = 'Telefone com no mínimo 10 dígitos.';
    setErrors(next);
    return !next.fullName && !next.email && !next.phone;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setSaved(true);
  };

  const initials = PROFILE.fullName
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Meu perfil
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Formulário com inputs, selects, validação e preferências (demo).
        </Typography>
      </Box>

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} alignItems="stretch">
        <Card sx={{ width: { xs: '100%', lg: 360 }, flexShrink: 0 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                width: 96,
                height: 96,
                borderRadius: '50%',
                bgcolor: 'grey.900',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 700,
                mx: 'auto',
                mb: 2,
              }}
            >
              {initials}
            </Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {form.fullName || 'Sem nome'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {PROFILE.role}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" justifyContent="space-around" spacing={1}>
              {[
                ['128', 'Tarefas'],
                ['42', 'Times'],
                ['7', 'Projetos'],
              ].map(([n, l]) => (
                <Box key={l}>
                  <Typography variant="subtitle1" fontWeight={700}>
                    {n}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {l}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <Button fullWidth variant="outlined" startIcon={<ImageOutlinedIcon />} sx={{ mt: 2 }}>
              Trocar foto
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardHeader title="Informações da conta" subheader="Atualize seus dados pessoais" />
          <CardContent>
            {saved && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Perfil atualizado com sucesso (demo).
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Nome completo"
                    value={form.fullName}
                    onChange={update('fullName')}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                  />
                  <TextField
                    fullWidth
                    label="E-mail"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    error={!!errors.email}
                    helperText={errors.email}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlineIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Telefone"
                    value={form.phone}
                    onChange={update('phone')}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    placeholder="(11) 99999-0000"
                  />
                  <FormControl fullWidth>
                    <InputLabel id="lang-label">Idioma preferido</InputLabel>
                    <Select labelId="lang-label" label="Idioma preferido" value={form.language} onChange={update('language')}>
                      <MenuItem value="pt-BR">Português (Brasil)</MenuItem>
                      <MenuItem value="en-US">English (US)</MenuItem>
                      <MenuItem value="es-ES">Español</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Cidade" value={form.city} onChange={update('city')} />
                  <FormControl fullWidth>
                    <InputLabel id="country-label">País</InputLabel>
                    <Select labelId="country-label" label="País" value={form.country} onChange={update('country')}>
                      <MenuItem value="Brasil">Brasil</MenuItem>
                      <MenuItem value="Argentina">Argentina</MenuItem>
                      <MenuItem value="Portugal">Portugal</MenuItem>
                      <MenuItem value="Estados Unidos">Estados Unidos</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <TextField fullWidth label="Bio" multiline minRows={4} value={form.bio} onChange={update('bio')} />
                <FormHelperText sx={{ mt: -1 }}>Aparece no seu cartão público. Mantenha curto e direto.</FormHelperText>

                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Notificações
                  </Typography>
                  <FormControlLabel control={<Checkbox checked={form.notifyEmail} onChange={update('notifyEmail')} />} label="Por e-mail" />
                  <FormControlLabel control={<Checkbox checked={form.notifyPush} onChange={update('notifyPush')} />} label="Push no navegador" />
                  <FormControlLabel
                    control={<Switch checked={form.twoFactor} onChange={update('twoFactor')} />}
                    label="Autenticação em 2 fatores"
                  />
                </Box>

                <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ pt: 2 }}>
                  <Button type="button" variant="outlined" color="inherit">
                    Cancelar
                  </Button>
                  <Button type="submit" variant="contained">
                    Salvar alterações
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
}

