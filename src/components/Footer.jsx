import { Box, Link, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        borderTop: 1,
        borderColor: 'divider',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} WT Private — Showcase Material UI.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {['Docs', 'Changelog', 'Suporte'].map((label) => (
          <Link key={label} href={`#${label.toLowerCase()}`} underline="hover" color="text.secondary" variant="body2">
            {label}
          </Link>
        ))}
      </Box>
    </Box>
  );
}
