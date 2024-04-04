import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'card-activity',
        element: <CardActivity />,
      },
    ],
  },
]);

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>
);

export default App;
