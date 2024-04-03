import { styled } from '@mui/material/styles';

import MuiCard from '@mui/material/Card';
import MuiCardContent from '@mui/material/CardContent';
import MuiCardHeader, { CardHeaderProps } from '@mui/material/CardHeader';

export const Card = styled(MuiCard)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

export const CardContent = styled(MuiCardContent)({
  flex: 1,
  display: 'flex',
});

export const CardHeader: React.FC<CardHeaderProps> = ({ sx, ...rest }) => (
  <MuiCardHeader
    titleTypographyProps={{
      variant: 'subtitle1',
      sx: {
        fontWeight: 600,
      },
    }}
    subheaderTypographyProps={{
      variant: 'body2',
    }}
    sx={{
      '& .MuiCardHeader-action': {
        margin: 0,
      },
      ...sx,
    }}
    {...rest}
  />
);
