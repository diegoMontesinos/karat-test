import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

const CardHistoryCard: React.FC = () => {
  return (
    <Card elevation={0} sx={{ flex: 1 }}>
      <CardHeader
        title="Card History"
        titleTypographyProps={{
          variant: 'subtitle1',
          sx: {
            fontWeight: 600,
          },
        }}
      />
    </Card>
  );
};

export default CardHistoryCard;
