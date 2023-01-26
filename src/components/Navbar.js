import { Link, useNavigate } from 'react-router-dom';
import { AUTH } from '../lib/auth';
import { useAuthenticated } from '../hooks/useAuthenticated';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated();
  const logout = () => {
    AUTH.logOut();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ background: '#52307c' }}>
        <Toolbar variant='dense'>
          <Link to='/' className='navbarLink'>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              sx={{ mr: 2 }}
            >
              Home
            </Typography>
          </Link>
          <Link to='/about' className='navbarLink'>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              sx={{ mr: 2 }}
            >
              About
            </Typography>
          </Link>
          {isLoggedIn ? (
            <>
              <Link to={`/user/${AUTH.getUser()}`} className='navbarLink'>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ mr: 2 }}
                >
                  User Page
                </Typography>
              </Link>
              <Link to='/messages' className='navbarLink'>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ mr: 2 }}
                >
                  Messages
                </Typography>
              </Link>
              <Link to='/' onClick={logout} className='navbarLink'>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ mr: 2 }}
                >
                  Log out
                </Typography>
              </Link>
            </>
          ) : (
            <>
              <Link to='/login' className='navbarLink'>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ mr: 2 }}
                >
                  Login
                </Typography>
              </Link>
              <Link to='/register' className='navbarLink'>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ mr: 2 }}
                >
                  Register
                </Typography>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
