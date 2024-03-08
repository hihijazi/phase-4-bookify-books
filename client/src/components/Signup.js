import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { register } from './action.js';
import _ from 'lodash';
import { useNavigate, } from 'react-router-dom';
function SignUp() {
   const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const postData = {
      name: data.get('name'),
      username: data.get('username'),
      password: data.get('password'),
    };

    if (_.isEmpty(postData.name) || _.isEmpty(postData.username) || _.isEmpty(postData.password)) {
      alert('Kindly fill all fields to register');
      return;
    };

    try {
      const data = await register(postData);
      alert('Register successfully');
      navigate('/login'); // Redirect to home page
    } catch (error) {
      alert('Oops! Something went wrong server throws error');
    }
  };

  // Login component
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '15px 30px',
          background: 'white',
          borderRadius: '8px'
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container>
            <Link href="/login" variant="p">
              {"Already have an account? Log In"}
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;