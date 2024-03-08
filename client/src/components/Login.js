import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { login } from './action.js';
import _ from 'lodash';
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
   const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const postData = {
      username: data.get('username'),
      password: data.get('password'),
    };

    if (_.isEmpty(postData.username) || _.isEmpty(postData.password)) {
      toast.error("Kindly fill both fields to login!");
      return;
    };

    try {
      const data = await login(postData);
      const serializedData = JSON.stringify(data);
      localStorage.setItem("user", serializedData);
       toast.success("Login successfully!");
      navigate('/home'); // Redirect to home page
      window.location.reload(); // Reload the app
    } catch (error) {
         toast.error('Oops! Something went wrong server throws error');
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
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="email"
            autoFocus
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
            Log In
          </Button>
          <Grid container>
            <Link href="/signup" variant="p">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Box>
      </Box>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} />
    </Container>

  );
}

export default Login;