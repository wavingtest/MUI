import { Typography } from '@mui/material';
import WtShowcaseSection from './WtShowcaseSection';
import { MUI_COMPONENT_META } from '../../data/muiComponentCatalog';

export default function WtShowcasePlaceholder({ id }) {
  const meta = MUI_COMPONENT_META[id];
  if (!meta) return null;

  return (
    <WtShowcaseSection
      id={id}
      title={meta.title}
      muiName={meta.mui}
      priority={meta.priority}
      implemented={false}
    >
      <Typography variant="body2" color="text.secondary">
        Demo deste componente será adicionada na próxima fase. Use a borda{' '}
        <strong>{meta.priority === 'medium' ? 'azul' : 'cinza'}</strong> para identificar a prioridade.
      </Typography>
    </WtShowcaseSection>
  );
}
