import { Box, Typography } from '@mui/material';
import { PRIORITY_LEVELS } from '../../data/muiComponentCatalog';

export default function WtPriorityGroupHeader({ priority, description, count }) {
  const level = PRIORITY_LEVELS[priority];

  return (
    <Box
      sx={{
        borderLeft: 4,
        borderColor: level.borderColor,
        pl: 2,
        py: 1.5,
        mb: 2,
        mt: count > 0 ? 4 : 0,
        bgcolor: level.bgTint,
        borderRadius: 1,
      }}
    >
      <Typography variant="h6" fontWeight={700}>
        {level.label}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description} · {count} componente{count !== 1 ? 's' : ''}
      </Typography>
    </Box>
  );
}
