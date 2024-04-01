import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

import Sidebar from './components/Sidebar';

const RootLayout: React.FC = () => (
  <Box sx={{ display: 'flex' }}>
    <Sidebar />

    <Box
      component="main"
      sx={{
        flexGrow: 1,
        display: 'flex',
        height: '100vh',
        overflow: 'auto',
        backgroundColor: 'background.default',
      }}
    >
      <Outlet />
    </Box>
  </Box>
);

export default RootLayout;
