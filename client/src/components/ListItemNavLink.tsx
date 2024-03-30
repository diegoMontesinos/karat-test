import { ReactElement, useMemo } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';

export interface ListItemNavLinkProps {
  to: string;
  icon: ReactElement;
  label: string;
}

const ListItemNavLink: React.FC<ListItemNavLinkProps> = ({
  to,
  icon,
  label,
}) => {
  const location = useLocation();

  const isActive = useMemo(
    () => location.pathname === to,
    [location.pathname, to]
  );

  return (
    <ListItemButton
      disableRipple
      component={Link}
      to={to}
      sx={{
        borderRadius: 2,
        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.12)' : 'none',
        my: 1,
        px: 2,
        py: 0.5,
      }}
    >
      <ListItemIcon
        sx={{
          color: isActive ? 'grey.50' : 'grey.600',
          minWidth: 40,
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={label}
        primaryTypographyProps={{
          sx: {
            color: isActive ? 'grey.50' : 'grey.600',
          },
          variant: 'subtitle1',
        }}
      />
    </ListItemButton>
  );
};

export default ListItemNavLink;
