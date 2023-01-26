import {
  Container,
  Typography,
  createTheme,
  ThemeProvider
} from '@mui/material';
import Carousel from 'nuka-carousel/lib/carousel';
import './styles/AboutUs.scss';
import QuoteCard from '../components/common/QuoteCard'


const theme = createTheme({
  typography: {
    fontFamily: [ 'Oswald', 'sans - serif'].join(',')
  }
});


export default function About() {
  return (
    <div className='heroPage'>
      <Container className='HeroAboutUs'>
        <ThemeProvider theme={theme}>
          <Typography variant='h6' gutterBottom>
            Welcome to LoveBug, the premier dating site for entomologists and
            insect enthusiasts! Whether you're looking to find your perfect
            praying mantis or your ideal ladybug, LoveBug is the place for you.
            Our advanced algorithms match you with compatible partners based on
            your interests in the six-legged world. With LoveBug, you'll never
            have to worry about explaining why you have a collection of
            preserved beetles in your living room again. So join now and start
            swiping on our unique selection of bug-loving singles today!
          </Typography>
        </ThemeProvider>
        <Container gutterBottom>
          <QuoteCard
            text={`Thanks to LoveBug, I finally found someone who doesn't think
        my collection of Moth heads are creepy.`}
            quotie={`Timothy`}
          />
        </Container>
        <Container gutterBottom>
          <QuoteCard
            text={`I never thought I'd find someone who would go on a bug-hunting
        trip with me on our first date, but LoveBug made it happen!`}
            quotie={`Jannel`}
          />
        </Container>
        <Container gutterBottom>
          <QuoteCard
            text={`I never knew true love until I met someone who understood my
        obsession with the mating habits of the woodlouse.`}
            quotie={`Bryan`}
          />
        </Container>
        <Carousel
          autoplay={true}
          wrapAround={true}
          slidesToShow={3}
          adaptiveHeight={false}
        >
          <img
            src='https://i.guim.co.uk/img/media/16d9a79a6d7aecac19447fadb0a012458e9198ae/0_121_5200_3121/master/5200.jpg?width=620&quality=85&auto=format&fit=max&s=d27e3823fdde38e7163cfc13e605232e'
            height='400px'
            alt='Cute beach Couple'
          />
          <img
            src='https://www.hollywoodreporter.com/wp-content/uploads/2017/08/shutterstock_297886754_-_h_2017.jpg'
            alt='real Couple'
            height='400px'
          />
          <img
            src='https://thisnzlife.co.nz/wp-content/uploads/2016/08/08-AKL-Bee14.jpg'
            height='400px'
            alt='hilarious Couple'
          />
          <img
            src='https://s.wsj.net/public/resources/images/BN-GP182_bees01_J_20150123170820.jpg'
            height='400px'
            alt='Bryan'
          />
          <img
            src='https://www.cam.ac.uk/sites/www.cam.ac.uk/files/shorthand/206292/nBzrWLzfHz/assets/sKegVtzfZa/2019-sean_001-2560x1707.jpeg'
            height='400px'
            alt='Timothy'
          />
          <img
            src='https://i.pinimg.com/originals/56/6f/27/566f2720d7b0806206267dc083ca2463.jpg'
            height='400px'
            alt='Keith & Jannel'
          />
          <img
            src='https://ucanr.edu/blogs/bugsquad/blogfiles/4991.jpg'
            height='400px'
            alt='James'
          />
        </Carousel>
      </Container>
    </div>
  );
}
