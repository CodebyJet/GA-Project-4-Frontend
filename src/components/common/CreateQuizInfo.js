import { useState } from 'react';
import {
  Button,
  Container,
  FormControl,
  Box,
  InputLabel,
  Typography,
  MenuItem,
  Select
} from '@mui/material';
import { API } from '../../lib/api';

export default function QuizCard({ closeCreateEntry, setIsUpdated }) {
  const [formFields, setFormFields] = useState({
    question_one: '',
    question_two: '',
    question_three: '',
    question_four: '',
    question_five: '',
    question_six: '',
    question_seven: '',
    question_eight: '',
    question_nine: '',
    question_ten: ''
  });
  const handleChange = (e) =>
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    API.POST(API.ENDPOINTS.allQuizes, formFields, API.getHeaders())
      .then(({ data }) => {
        closeCreateEntry();
        setIsUpdated(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Container
      maxWidth='lg'
      sx={{ display: 'flex', justifyContent: 'center', pt: '200px' }}
    >
      <form onSubmit={handleCreateQuiz}>
        {formFields.question_one == '' ? (
          <Box sx={{ minWidth: 120 }}>
            <Typography> Let's start with a classic:</Typography>
            <Typography> Whats your ideal first date?</Typography>
            <FormControl fullWidth>
              <InputLabel id='question_one'>Date Ideas?</InputLabel>
              <Select
                labelId='question_one'
                id='question_one'
                value={formFields.question_one}
                label='question_one'
                onChange={handleChange}
                name='question_one'
              >
                <MenuItem value={'a romantic Meal out'}>
                  A romantic Meal out
                </MenuItem>
                <MenuItem value={'cosy Coffee vibes'}>
                  Cosy Coffee vibes
                </MenuItem>
                <MenuItem value={'a countryside hike'}>
                  A countryside hike
                </MenuItem>
                <MenuItem value={'a chill cinema date'}>
                  A chill cinema date
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Typography></Typography>
        )}
        {formFields.question_two === '' && formFields.question_one !== '' ? (
          <Box sx={{ minWidth: 120 }}>
            <Typography>Who pays on a first date?</Typography>
            <FormControl fullWidth>
              <InputLabel id='question_two'>Who pays?</InputLabel>
              <Select
                labelId='question_two'
                id='question_two'
                value={formFields.question_two}
                label='question_two'
                onChange={handleChange}
                name='question_two'
              >
                <MenuItem value={"I'd pay"}>I'd pay</MenuItem>
                <MenuItem value={'split 50/50'}>split 50/50</MenuItem>
                <MenuItem value={'Depends who asked who out'}>
                  Depends who asked who out
                </MenuItem>
                <MenuItem value={'They pay for sure'}>
                  They pay for sure
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Typography></Typography>
        )}
        {formFields.question_three === '' && formFields.question_two !== '' ? (
          <Box sx={{ minWidth: 120 }}>
            <Typography> Whats the most import thing you look for? </Typography>
            <FormControl fullWidth>
              <InputLabel id='question_three'>important to you?</InputLabel>
              <Select
                labelId='question_three'
                id='question_three'
                value={formFields.question_three}
                label='question_three'
                onChange={handleChange}
                name='question_three'
              >
                <MenuItem value={'good sense of humour'}>
                  Sense of Humour
                </MenuItem>
                <MenuItem value={'laid back'}>Someone whos laid back</MenuItem>
                <MenuItem value={'who looks good'}>Their looks for sure</MenuItem>
                <MenuItem value={'who is a good communicator'}>
                  A good communicator
                </MenuItem>
                <MenuItem value={'financially stable'}>
                  Someone financially stable
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Typography></Typography>
        )}
        {formFields.question_four === '' && formFields.question_three !== '' ? (
          <Box sx={{ minWidth: 120 }}>
            <Typography>Huh... I like your style</Typography>
            <Typography>How spontaneous are you?</Typography>
            <FormControl fullWidth>
              <InputLabel id='question_four'>Spontaneous?</InputLabel>
              <Select
                labelId='question_four'
                id='question_four'
                value={formFields.question_four}
                label='question_four'
                onChange={handleChange}
                name='question_four'
              >
                <MenuItem value={'not at all'}>Not at all</MenuItem>
                <MenuItem value={'rarely'}>Rarely</MenuItem>
                <MenuItem value={'very often'}>very often</MenuItem>
                <MenuItem value={'super spontaneous'}>
                  super spontaneous
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Typography></Typography>
        )}
        {formFields.question_five === '' && formFields.question_four !== '' ? (
          <Box sx={{ minWidth: 120 }}>
            <Typography>
              If you could only eat one type of insect for the rest of your
              life, what would it be?
            </Typography>
            <FormControl fullWidth>
              <InputLabel id='question_five'>Food for thought</InputLabel>
              <Select
                labelId='question_five'
                id='question_five'
                value={formFields.question_five}
                label='question_five'
                onChange={handleChange}
                name='question_five'
              >
                <MenuItem value={'Ants'}>Ants</MenuItem>
                <MenuItem value={'Spiders'}>Spiders</MenuItem>
                <MenuItem value={'Beetles'}>Beetles</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Typography></Typography>
        )}
        {formFields.question_six === '' && formFields.question_five !== '' ? (
          <Box sx={{ minWidth: 120 }}>
            <Typography>Oooo, Crunchy choice.</Typography>
            <Typography>
              Do you have a favorite entomological pun or joke?
            </Typography>
            <FormControl fullWidth>
              <InputLabel id='question_six'>Tell us your joke</InputLabel>
              <Select
                labelId='question_six'
                id='question_six'
                value={formFields.question_six}
                label='question_six'
                onChange={handleChange}
                name='question_six'
              >
                <MenuItem value={'Yes'}>Yes</MenuItem>
                <MenuItem value={'No'}>No</MenuItem>
                <MenuItem value={'wait'}>wait, I can't type it?</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Typography></Typography>
        )}
        {formFields.question_seven === '' && formFields.question_six !== '' ? (
          <Box sx={{ minWidth: 120 }}>
            <Typography>Aha! That's hilarious! You are too funny</Typography>
            <Typography>
              Which romantic gesture would you most appreciate?
            </Typography>
            <FormControl fullWidth>
              <InputLabel id='question_seven'>Romantic gesture?</InputLabel>
              <Select
                labelId='question_seven'
                id='question_seven'
                value={formFields.question_seven}
                label='question_seven'
                onChange={handleChange}
                name='question_seven'
              >
                <MenuItem value={'A home-cooked meal'}>
                  Home cooked food
                </MenuItem>
                <MenuItem value={'A romantic surprise'}>
                  a romantic surprise
                </MenuItem>
                <MenuItem value={'A romantic message'}>
                  a romantic message
                </MenuItem>
                <MenuItem value={'parade'}>A parade</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Typography></Typography>
        )}
        {formFields.question_eight === '' &&
        formFields.question_seven !== '' ? (
          <Box sx={{ minWidth: 120 }}>
            <Typography>
              Wow, we're really starting to get to know the real you
            </Typography>
            <FormControl fullWidth>
              <InputLabel id='question_eight'>Maybe...</InputLabel>
              <Select
                labelId='question_eight'
                id='question_eight'
                value={formFields.question_eight}
                label='question_eight'
                onChange={handleChange}
                name='question_eight'
              >
                <MenuItem value={'This one'}>This one</MenuItem>
                <MenuItem value={'That one'}>That one</MenuItem>
                <MenuItem value={'no, wait, this one for sure'}>
                  no, wait, this one for sure
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Typography></Typography>
        )}
        {formFields.question_nine === '' && formFields.question_eight !== '' ? (
          <Box sx={{ minWidth: 120 }}>
            <Typography>You know, thats a pretty popular choice</Typography>
            <Typography>Whats a deal breaker for you?</Typography>
            <FormControl fullWidth>
              <InputLabel id='question_nine'>deal-breaker</InputLabel>
              <Select
                labelId='question_nine'
                id='question_nine'
                value={formFields.question_nine}
                label='question_nine'
                onChange={handleChange}
                name='question_nine'
              >
                <MenuItem value={'A know it all'}>Know it all</MenuItem>
                <MenuItem value={'Someone boring'}>Boring</MenuItem>
                <MenuItem value={'A self-centered attitude'}>
                  self-centered
                </MenuItem>
                <MenuItem value={'Fear of commitment'}>
                  fear of commitment
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Typography></Typography>
        )}
        {formFields.question_ten === '' && formFields.question_nine !== '' ? (
          <Box sx={{ minWidth: 120 }}>
            <Typography>Do you spend a lot of time alone?</Typography>
            <FormControl fullWidth>
              <InputLabel id='question_ten'>Alone time?</InputLabel>
              <Select
                labelId='question_ten'
                id='question_ten'
                value={formFields.question_ten}
                label='question_ten'
                onChange={handleChange}
                name='question_ten'
              >
                <MenuItem value={'love it'}>I love it</MenuItem>
                <MenuItem value={'sometimes'}>Sometimes</MenuItem>
                <MenuItem value={'rarely'}>Rarely</MenuItem>
                <MenuItem value={'never'}>Never</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <>
            {formFields.question_ten !== '' ? (
              <>
                <Typography> Wow, I think we really got to know you</Typography>
                <Button type='submit' sx={{ color: '#3B3D40' }}>
                  Submit and see who's out there!
                </Button>
              </>
            ) : (
              <Typography></Typography>
            )}
          </>
        )}
      </form>
    </Container>
  );
}
