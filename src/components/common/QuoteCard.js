import {
  Card,
  CardContent,
  Typography,
  createTheme,
  ThemeProvider
} from '@mui/material/';

const theme = createTheme({
  typography: {
    fontFamily: ['Solitreo', 'cursive'].join(',')
  }
});

export default function QuoteCard({ text, quotie }) {

  return (
    <Card
      sx={{
        mb: 2,
        minWidth: 260,
        backgroundColor: '#ffd8b8'
      }}
    >
      <CardContent sx={{ display: 'flex', textAlign: 'center' }}>
        <ThemeProvider theme={theme}>
          <Typography variant='h2' sx={{ fontSize: 18 }}>
            {text}
          </Typography>
        </ThemeProvider>
        <Typography
          sx={{ fontSize: 14, textTransform: 'capitalize' }}
          color='text.secondary'
        >
          - {quotie}
        </Typography>
      </CardContent>
    </Card>
  );
}
