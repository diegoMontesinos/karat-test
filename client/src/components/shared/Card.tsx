import { styled } from '@mui/material/styles';

import MuiCard from '@mui/material/Card';
import MuiCardContent from '@mui/material/CardContent';
import MuiCardHeader, { CardHeaderProps } from '@mui/material/CardHeader';

export const Card = styled(MuiCard)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  p: 2,
});

export const CardContent = styled(MuiCardContent)({
  flex: 1,
  display: 'flex',
});

export const CardHeader: React.FC<CardHeaderProps> = (props) => (
  <MuiCardHeader
    titleTypographyProps={{
      variant: 'subtitle1',
      sx: {
        fontWeight: 600,
        pb: 2,
      },
    }}
    {...props}
  />
);
