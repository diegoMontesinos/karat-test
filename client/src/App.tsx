import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './RootLayout';

import Home from './sections/Home';
import CardHistory from './sections/CardHistory';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4634ff',
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
        path: 'card-history',
        element: <CardHistory />,
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
