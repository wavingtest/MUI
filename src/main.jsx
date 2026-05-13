import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { appTheme } from './theme';
import App from './App.jsx';

dayjs.locale('pt-br');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/MUI">
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <App />
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
