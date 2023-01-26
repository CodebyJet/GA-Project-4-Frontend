import { useEffect, useState } from 'react';
import { API } from '../../lib/api';
import { AUTH } from '../../lib/auth';
import CreateQuizInfo from './CreateQuizInfo';
import MatchingButton from './MatchingButton';
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


  export default function QuizCard({ singleUser }) {
    const [isUpdated, setIsUpdated] = useState(false);
    const [singleQuiz, setSingleQuiz] = useState(null);
    const [isCreateEntryOpen, setIsCreateEntryOpen] = useState(false);
    const openCreateEntry = () => setIsCreateEntryOpen(true);
    const closeCreateEntry = () => setIsCreateEntryOpen(false);
    
    const currentUserId = AUTH.getUser();
  useEffect(() => {
    API.GET(API.ENDPOINTS.allQuizes, API.getHeaders())
      .then(({ data }) => {
        const filterQuizes = data.filter(
          (item) => item.owner === singleUser?.id
        );
        const oneQuiz = filterQuizes[0];
        setSingleQuiz(oneQuiz);
      })
      .catch((e) => {
        console.log(e);
      });
    setIsUpdated(false);
  }, [singleUser]);


    if (Number.parseInt(currentUserId) === singleUser?.id) {
      if (singleQuiz) {
        return (
          <>
            <ThemeProvider theme={theme}>
              <Typography variant='h6'>
                Your ideal first date would be {singleQuiz?.question_one}.
              </Typography>
              <Typography variant='h6'>
                You are looking for someone {singleQuiz?.question_three}.
              </Typography>
              <Typography variant='h6'>
                You love: {singleQuiz?.question_seven}.
              </Typography>
              <Typography variant='h6'>
                You dislike: {singleQuiz?.question_nine}.
              </Typography>
            </ThemeProvider>
            <MatchingButton />
          </>
        );
      } else {
        return (
          <>
            {!isCreateEntryOpen && (
              <Button onClick={openCreateEntry}>Take a Quiz!</Button>
            )}
            {isCreateEntryOpen && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <CreateQuizInfo
                  closeCreateEntry={closeCreateEntry}
                  setIsUpdated={setIsUpdated}
                />
              </Box>
            )}
          </>
        );
      }
    } else if (singleQuiz) {
      return (
        <>
          <ThemeProvider theme={theme}>
            <Typography variant='h6'>
              This user ideal first date would be {singleQuiz?.question_one}.
            </Typography>
            <Typography variant='h6'>
              They are looking for someone {singleQuiz?.question_three}.
            </Typography>
            <Typography variant='h6'>
              They love: {singleQuiz?.question_seven}.
            </Typography>
            <Typography variant='h6'>
              They dislike: {singleQuiz?.question_nine}.
            </Typography>
          </ThemeProvider>
        </>
      );
    } else {
      return (
        <ThemeProvider theme={theme}>
          <Typography variant='h5'>
            This user hasn't taken our Quiz yet
          </Typography>
        </ThemeProvider>
      );
    }
  }