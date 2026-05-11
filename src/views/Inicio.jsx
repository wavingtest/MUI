import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@mui/material';

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Início
        </Typography>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Objetivo do ambiente
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Este site privado simula o comportamento de componentes de dashboard para validação do WT, agora com{' '}
          <strong>Material UI</strong>.
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Para testar o fluxo principal de cadastro e consulta, use o menu lateral em <strong>Página de teste</strong> ou o botão
          abaixo.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/components')}>
          Ir para página de teste
        </Button>
      </CardContent>
    </Card>
  );
}
