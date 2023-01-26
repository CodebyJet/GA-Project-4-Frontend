import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../lib/api';
import { useAuthenticated } from '../hooks/useAuthenticated';
import { AUTH } from '../lib/auth';
import ProfilePicture from './common/ProfilePicture';
import DescriptionCard from './common/DescriptionCard';
import QuizCard from './common/QuizCard';
import {
  Container,
  Box,
  TextField,
  Card,
  CardActionArea,
  Button,
  Typography,
  createTheme,
  ThemeProvider
} from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: ['Oswald', 'sans - serif'].join(',')
  }
});

export default function UserPage() {
  const [isLoggedIn] = useAuthenticated();
  const { id } = useParams();
  const [singleUser, setSingleUser] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const openMessage = () => setIsMessageOpen(true);
  const closeMessage = () => setIsMessageOpen(false);

  useEffect(() => {
    API.GET(API.ENDPOINTS.singleUser(id), API.getHeaders())
      .then(({ data }) => {
        setSingleUser(data);
      })
      .catch((e) => {
        console.log(e);
      });
    setIsUpdated(false);
  }, [id, isUpdated]);


  const currentUserId = AUTH.getUser();


  const [formData, setFormData] = useState({
    receiver: id,
    text: ''
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.POST(API.ENDPOINTS.allMessages, formData, API.getHeaders())
      .then(() => {
        setIsUpdated(!isUpdated);
        closeMessage();
      })
      .catch((e) => {
        if (e.status === 301) {
          setError(true);
        }
        console.log(e);
      });
  };

  if (isLoggedIn) {
    return (
      <>
        <Container>
          <Container
            maxWidth='lg'
            sx={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: '20px',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Container>
              <ThemeProvider theme={theme}>
                <Typography variant='h3' sx={{ textTransform: 'capitalize' }}>
                  {singleUser?.first_name}
                </Typography>
                <Typography
                  sx={{ fontSize: 14, textTransform: 'capitalize' }}
                  color='text.secondary'
                  gutterBottom
                >
                  Username: {singleUser?.username}
                </Typography>
              </ThemeProvider>
              <QuizCard singleUser={singleUser} />
            </Container>
            <Container
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '20px',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Card>
                <CardActionArea>
                  <ProfilePicture
                    cloudinaryImageId={singleUser?.profile_image}
                  />
                </CardActionArea>
              </Card>
              {Number.parseInt(currentUserId) !== singleUser?.id && (
                <>
                  {!isMessageOpen && (
                    <Button onClick={openMessage}>Message This User?</Button>
                  )}
                  {isMessageOpen && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <form onSubmit={handleSubmit}>
                        <Box sx={{ mb: 2 }}>
                          <TextField
                            sx={{ width: 300 }}
                            size='medium'
                            type='text'
                            variant='standard'
                            fullWidth
                            value={formData.text}
                            onChange={handleChange}
                            error={error}
                            label='Message'
                            name='text'
                          />
                        </Box>
                        <Button type='submit' sx={{ color: '#173042' }}>
                          Message this user
                        </Button>
                      </form>
                    </Box>
                  )}
                </>
              )}
            </Container>
          </Container>
          <Container
            maxWidth='lg'
            sx={{
              display: 'flex',
              marginTop: '20px',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <DescriptionCard singleUser={singleUser} />
          </Container>
        </Container>
      </>
    );
  } else {
    return <Typography>Please log in to see</Typography>;
  }
}
