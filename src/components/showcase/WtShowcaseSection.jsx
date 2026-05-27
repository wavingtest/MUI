import { Box, Chip, Typography } from '@mui/material';
import { PRIORITY_LEVELS } from '../../data/muiComponentCatalog';

export default function WtShowcaseSection({
  id,
  title,
  muiName,
  priority = 'high',
  children,
}) {
  const level = PRIORITY_LEVELS[priority] ?? PRIORITY_LEVELS.high;

  return (
    <Box
      id={id}
      component="section"
      sx={{
        border: '2px dashed',
        borderColor: level.borderColor,
        borderRadius: 2,
        p: 2.5,
        mb: 2.5,
        bgcolor: level.bgTint,
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography
          variant="overline"
          sx={{
            fontWeight: 700,
            letterSpacing: 1.2,
            color: 'text.primary',
            fontFamily: 'ui-monospace, monospace',
          }}
        >
          [WT] {title}
        </Typography>
        <Chip label={level.shortLabel} size="small" color={level.chipColor} variant="outlined" />
      </Box>

      {muiName ? (
        <Typography variant="caption" sx={{ display: 'block', mb: 2, color: 'text.secondary' }}>
          Componente MUI: <strong>{muiName}</strong>
        </Typography>
      ) : null}

      {children}
    </Box>
  );
}
