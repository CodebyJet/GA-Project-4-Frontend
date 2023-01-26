import { useEffect, useState } from 'react';
import { TextField, Container, Box, Autocomplete, Button } from '@mui/material';
import { API } from '../../lib/api';

export default function CreateMessage({ closeCreateEntry, setIsUpdated }) {
  const [formData, setFormData] = useState({
    receiver: '',
    text: ''
  });
  const [availableContacts, setAvailableContacts] = useState([]);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allUsers)
      .then(({ data }) => setAvailableContacts(data))
      .catch((e) => console.log(e));
  }, []);

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (_e, value) => {
    setFormData({ ...formData, receiver: value.id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.POST(API.ENDPOINTS.allMessages, formData, API.getHeaders())
      .then(({ data }) => {
        closeCreateEntry();
        setIsUpdated(true);
      })
      .catch((e) => {
        if (e.status === 301) {
          setError(true);
        }
        console.log(e);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 5
        }}
      >
        <Box>
          <Autocomplete
            id='user-messaging'
            sx={{ width: 300 }}
            options={availableContacts}
            autoHighlight
            onChange={handleCountryChange}
            getOptionLabel={(option) => option.username}
            renderOption={(props, option) => (
              <Box
                value={option}
                component='li'
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...props}
                id={option._id}
              >
                {option.username}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Choose a user'
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password'
                }}
              />
            )}
          />
        </Box>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            sx={{ width: 300 }}
            size='medium'
            type='text'
            value={formData.text}
            onChange={handleChange}
            error={error}
            label='Write here'
            name='text'
          />
        </Box>
        <Button
          variant='contained'
          type='submit'
          sx={{ display: 'flex', color: 'white' }}
        >
          Send my message
        </Button>
      </Container>
    </form>
  );
}
