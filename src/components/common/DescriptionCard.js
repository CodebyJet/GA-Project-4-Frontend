import { useEffect, useState } from 'react';
import { API } from '../../lib/api';
import { AUTH } from '../../lib/auth';
import CreateDescriptionCard from '../common/CreateDescriptionCard';
import {
  Box,
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

export default function DescriptionCard({singleUser}) {
    const [singleDescription, setSingleDescription] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const openDescription = () => setIsDescriptionOpen(true);
  const closeDescription = () => setIsDescriptionOpen(false);


  useEffect(() => {
    API.GET(API.ENDPOINTS.allDescriptions, API.getHeaders())
      .then(({ data }) => {
        const filterDescriptions = data.filter(
          (item) => item.owner === singleUser.id
        );
        const oneQuiz = filterDescriptions[0];
        setSingleDescription(oneQuiz);
      })
      .catch((e) => {
        console.log(e);
      });
    setIsUpdated(false);
  }, [singleUser]);

  const currentUserId = AUTH.getUser();


    if (Number.parseInt(currentUserId) === singleUser?.id) {
      if (singleDescription) {
        return (
          <ThemeProvider theme={theme}>
              <Typography variant='h5'>{singleDescription?.text}</Typography>
          </ThemeProvider>
        );
      } else {
        return (
          <>
            {!isDescriptionOpen && (
              <Button
                onClick={openDescription}
              >
                Tell us about yourself!
              </Button>
            )}
            {isDescriptionOpen && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <CreateDescriptionCard
                  closeDescription={closeDescription}
                  setIsUpdated={setIsUpdated}
                />
              </Box>
            )}
          </>
        );
      }
    } else if (singleDescription) {
      return (
        <ThemeProvider theme={theme}>
          <Typography variant='h5'>{singleDescription?.text}</Typography>
        </ThemeProvider>
      );
    } else {
      return (
        <ThemeProvider theme={theme}>
          <Typography variant='h5'>
            This user has yet to tell us about themselves
          </Typography>
          <Typography variant='subtitle'>
            So shy, send them a message to get them to open up
          </Typography>
        </ThemeProvider>
      );
    }
  }
