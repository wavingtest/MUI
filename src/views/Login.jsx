import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Link as MuiLink,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Login() {
  const [email, setEmail] = useState('alex.morgan@demo.dashboard');
  const [password, setPassword] = useState('demo123');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Preencha e-mail e senha.');
      return;
    }
    setError('');
    navigate('/');
  };

  return (
    <Card sx={{ maxWidth: 440, width: '100%' }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1.5,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
            }}
          >
            WT
          </Box>
          <Typography variant="h6" fontWeight={700}>
            WT Private
          </Typography>
        </Box>

        <Typography variant="h5" fontWeight={700} gutterBottom>
          Acessar a conta
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Use suas credenciais para continuar
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
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
          <TextField
            fullWidth
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1, mb: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} />}
              label="Lembrar-me"
            />
            <MuiLink href="#forgot" variant="body2" color="text.secondary" underline="hover">
              Esqueci minha senha
            </MuiLink>
          </Box>

          <Button fullWidth variant="contained" size="large" type="submit">
            Entrar
          </Button>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
            Ainda não tem conta?{' '}
            <MuiLink component={Link} to="#signup" fontWeight={600} color="inherit">
              Criar agora
            </MuiLink>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

