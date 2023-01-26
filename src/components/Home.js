import {
  Container,
  Typography,
  createTheme,
  ThemeProvider
} from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: ['Solitreo', 'cursive'].join(',')
  }
});

export default function Home() {
  return (
    <div className='homePage'>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pt: '140px',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography variant='h1' gutterBottom>
            LoveBug
          </Typography>
          <Typography variant='h3' gutterBottom>
            We've Pollen in love with You
          </Typography>
          <Typography variant='h4' gutterBottom>
            And we're sure others will too
          </Typography>
        </ThemeProvider>
        <Typography variant='h1' gutterBottom></Typography>
        <Typography variant='h1' gutterBottom></Typography>
        <Typography variant='h1' gutterBottom></Typography>
        <Typography variant='h1' gutterBottom></Typography>
        <Typography variant='h1' gutterBottom></Typography>
        <Typography variant='h1' gutterBottom></Typography>
        <Typography variant='h1' gutterBottom></Typography>
        <Typography variant='h1' gutterBottom></Typography>
        <Typography variant='h1' gutterBottom></Typography>
        <Typography variant='h1' gutterBottom></Typography>
      </Container>
    </div>
  );
}
