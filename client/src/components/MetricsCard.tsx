import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

const MetricsCard: React.FC = () => {
  return (
    <Card elevation={0} sx={{ flex: 1 }}>
      <CardHeader
        title="Metrics"
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

export default MetricsCard;
