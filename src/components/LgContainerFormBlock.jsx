import { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

/**
 * Bloco de layout espelhando a árvore inspecionada:
 * Box → Container maxWidth="lg" → linha flex (mt 10 / mb 30 / gap 10) → TextField → TextField (margin normal, fullWidth, cor preta) → rodapé flex (space-between, mt 20).
 */
export default function LgContainerFormBlock() {
  const [primary, setPrimary] = useState('');
  const [secondary, setSecondary] = useState('');

  return (
    <Box sx={{ py: 0 }}>
      <Container maxWidth="lg" disableGutters={false}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
            marginBottom: '30px',
            gap: '10px',
            justifyContent: 'left',
          }}
        >
          <ArrowBackIcon color="action" fontSize="small" />
          <Typography variant="h6" component="span" fontWeight={600}>
            Título do bloco
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Campo principal"
          placeholder="Primeiro campo (sem margin normal)"
          value={primary}
          onChange={(e) => setPrimary(e.target.value)}
        />

        <TextField
          margin="normal"
          fullWidth
          label="Campo secundário"
          placeholder="Segundo campo"
          value={secondary}
          onChange={(e) => setSecondary(e.target.value)}
          sx={{ color: 'black', '& .MuiOutlinedInput-root': { color: 'black' }, '& .MuiInputLabel-root': { color: 'black' } }}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '20px 0 0',
          }}
        >
          <Button color="inherit">Cancelar</Button>
          <Button variant="contained">Confirmar</Button>
        </Box>
      </Container>
    </Box>
  );
}
