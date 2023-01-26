import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticated } from '../hooks/useAuthenticated';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';

import { TextField, Button } from '@mui/material';
import { Container } from '@mui/system';

export default function Login() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState({ username: false, password: false });
  const [isLoggedIn] = useAuthenticated();

  if (isLoggedIn) {
    navigate('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    API.POST(API.ENDPOINTS.login, formFields)
      .then(({ data }) => {
        AUTH.setToken(data.token);
        AUTH.setUser(data.id)
        navigate(`/user/${data.id}`);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.message === 'Unauthorized, invalid password') {
          setError({ ...error, password: true });
        } else {
          setError({ username: true, password: true });
        }
      });
  };

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  return (
    <Container
      maxWidth='lg'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 500
      }}
    >
      <form onSubmit={handleSubmit}>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField
            size='small'
            name='username'
            id='username'
            type='username'
            label='username'
            required={true}
            value={formFields.username}
            onChange={handleChange}
            error={error.username}
            sx={{ mb: 2 }}
          />
          <TextField
            size='small'
            name='password'
            id='password'
            type='password'
            label='Password'
            required={true}
            value={formFields.password}
            onChange={handleChange}
            error={error.password}
            sx={{ mb: 2 }}
          />
        </Container>
        <Button type='submit' sx={{ color: '#3B3D40' }}>
          Login
        </Button>
      </form>
    </Container>
  );
}
