import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import RootLayout from './RootLayout';

import Home from './sections/Home';
import CardActivity from './sections/CardActivity';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4634ff',
    },
    error: {
      main: '#fb366f',
    },
    secondary: {
      main: '#C79CED',
    },
    background: {
      paper: '#fff',
      default: '#f6f6f8',
    },
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    subtitle1: {
      fontWeight: 500,
    },
  },
});

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="" element={<Home />} />
          <Route path="card-activity" element={<CardActivity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
