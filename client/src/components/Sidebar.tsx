import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';

import ListItemNavLink from './ListItemNavLink';

const Sidebar: React.FC = () => (
  <Drawer
    variant="permanent"
    sx={{
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: 240,
        boxSizing: 'border-box',
      },
    }}
  >
    <Box
      sx={{
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      }}
    >
      <AccountBalanceWalletIcon color="secondary" fontSize="large" />
      <Typography variant="h4" color="secondary">
        K-Test
      </Typography>
    </Box>

    <List
      component="nav"
      sx={{
        px: 2,
        mt: 3,
      }}
    >
      <ListItemNavLink to="/" icon={<HomeIcon />} label="Home" />
      <ListItemNavLink
        to="/card-history"
        icon={<ReceiptIcon />}
        label="Card History"
      />
    </List>
  </Drawer>
);

export default Sidebar;
