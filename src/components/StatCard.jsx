import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import { Box, Card, CardContent, Typography } from '@mui/material';

const ICONS = {
  coins: PaidOutlinedIcon,
  userPlus: PersonAddAltOutlinedIcon,
  box: Inventory2OutlinedIcon,
  bullseye: TrackChangesOutlinedIcon,
};

export default function StatCard({ label, value, delta, deltaDirection, icon, hint }) {
  const Icon = ICONS[icon] ?? PaidOutlinedIcon;
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {label}
          </Typography>
          <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5 }}>
            {value}
          </Typography>
          {(delta || hint) && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              {delta && (
                <Box
                  component="span"
                  sx={{
                    color: deltaDirection === 'up' ? 'success.main' : 'error.main',
                    fontWeight: 600,
                    mr: 0.5,
                  }}
                >
                  {deltaDirection === 'up' ? '↑' : '↓'} {delta}
                </Box>
              )}
              {hint}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: 'grey.100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'grey.700',
          }}
        >
          <Icon />
        </Box>
      </CardContent>
    </Card>
  );
}
