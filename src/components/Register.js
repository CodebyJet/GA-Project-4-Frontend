import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import {
  Button,
  TextField,
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

export default function Register() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    email: '',
    username: '',
    first_name:'',
    last_name:'',
    password: '',
    password_confirmation: ''
  });
  const [file, setFile] = useState('');
  const [error, setError] = useState(false);

  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const openMessage = () => setIsMessageOpen(true);

  const handleChange = (e) =>
    setFormFields({ ...formFields, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append(
      'upload_preset',
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    try {
      const cloudinaryResponse = await API.POST(
        API.ENDPOINTS.cloudinary,
        imageData
      );
      const apiReqBody = {
        ...formFields,
        profile_image: cloudinaryResponse.data.public_id
      };
      await API.POST(API.ENDPOINTS.register, apiReqBody);
      const loginData = await API.POST(API.ENDPOINTS.login, {
        username: formFields.username,
        password: formFields.password
      });
      AUTH.setToken(loginData.data.token);
      AUTH.setUser(loginData.data.id)
      navigate(`/user/${loginData.data.id}`);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

const goToAbout =() => navigate('/about')

  return (
      <Container
        maxWidth='lg'
        sx={{ display: 'flex', justifyContent: 'center', pt: '200px', textAlign:'center' }}
      >
        {!isMessageOpen && (
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <ThemeProvider theme={theme}>
              <Typography variant='h4'>
                Are you an Entomologist looking for love?
              </Typography>
            </ThemeProvider>
            <Button onClick={openMessage}>I am!</Button>
            <Button onClick={goToAbout}>I'm not</Button>
          </Container>
        )}
        {isMessageOpen && (
          <form onSubmit={handleCreateUser}>
            <Container>
              <TextField
                size='small'
                name='first_name'
                id='first_name'
                type='text'
                label='First name'
                required={true}
                value={formFields.first_name}
                onChange={handleChange}
                error={error}
                sx={{ mb: 2 }}
              />
            </Container>
            <Container>
              <TextField
                size='small'
                name='last_name'
                id='last_name'
                type='text'
                label='Last name'
                required={true}
                value={formFields.last_name}
                onChange={handleChange}
                error={error}
                sx={{ mb: 2 }}
              />
            </Container>
            <Container>
              <TextField
                size='small'
                name='username'
                id='username'
                type='text'
                label='Username'
                required={true}
                value={formFields.username}
                onChange={handleChange}
                error={error}
                sx={{ mb: 2 }}
              />
            </Container>
            <Container>
              <TextField
                size='small'
                name='email'
                id='email'
                type='email'
                label='Email'
                required={true}
                value={formFields.email}
                onChange={handleChange}
                error={error}
                sx={{ mb: 2 }}
              />
            </Container>
            <Container>
              <TextField
                size='small'
                name='password'
                id='password'
                type='password'
                label='Password'
                required={true}
                value={formFields.password}
                onChange={handleChange}
                error={error}
                sx={{ mb: 2 }}
              />
            </Container>
            <Container>
              <TextField
                size='small'
                name='password_confirmation'
                id='password_confirmation'
                type='password'
                label='Password Confirmation'
                required={true}
                value={formFields.password_confirmation}
                onChange={handleChange}
                error={error}
                sx={{ mb: 2 }}
              />
            </Container>
            <Container>
              <TextField
                size='small'
                name='profile_image'
                id='profile_image'
                type='file'
                onChange={handleFileChange}
                sx={{ mb: 2 }}
              />
            </Container>
            <Button type='submit' sx={{ color: '#3B3D40' }}>
              Create Account
            </Button>
          </form>
        )}
      </Container>
  );
}
