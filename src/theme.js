import { createTheme } from '@mui/material/styles';

const neutral = {
  50: '#f8f9fb',
  100: '#eef0f3',
  200: '#e2e5ea',
  300: '#cdd2da',
  400: '#9aa1ad',
  500: '#6b7280',
  600: '#4b5563',
  700: '#374151',
  800: '#232a36',
  900: '#131822',
};

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: neutral[900], contrastText: '#fff' },
    secondary: { main: neutral[600], contrastText: '#fff' },
    background: { default: neutral[50], paper: '#fff' },
    text: { primary: neutral[900], secondary: neutral[600] },
    divider: neutral[200],
    grey: neutral,
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '1.75rem' },
    h2: { fontWeight: 700, fontSize: '1.35rem' },
    h3: { fontWeight: 600, fontSize: '1.05rem' },
  },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none' } },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { border: `1px solid ${neutral[200]}`, boxShadow: 'none' },
      },
    },
  },
});
