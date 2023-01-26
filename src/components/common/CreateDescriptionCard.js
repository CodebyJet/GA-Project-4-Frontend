import { useState } from 'react';
import {
  TextField,
  Container,
  Box,
  Button
} from '@mui/material';
import { API } from '../../lib/api';

export default function CreateDescription({ closeDescription, setIsUpdated }) {
  const [formData, setFormData] = useState({
    text: ''
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDescriptionSubmit = (e) => {
    e.preventDefault();
    API.POST(API.ENDPOINTS.allDescriptions, formData, API.getHeaders())
      .then(({ data }) => {
        closeDescription();
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
    <Container
      maxWidth='lg'
      sx={{ display: 'flex', justifyContent: 'center', pt: 5 }}
    >
      <form onSubmit={handleDescriptionSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            size='small'
            type='text'
            value={formData.text}
            onChange={handleChange}
            error={error}
            label='Text'
            name='text'
          />
        </Box>
        <Button type='submit' sx={{ color: '#317873' }}>
          Add my about me
        </Button>
      </form>
    </Container>
  );
}
