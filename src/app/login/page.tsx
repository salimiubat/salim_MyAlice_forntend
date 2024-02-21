'use client'
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
// import api from '../components/Config';
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../actions/authactions';
import api from '../components/Config';

const LoginForm = () => {
  const router = useRouter(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
//   const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await api.post('/users/token/', {
        username,
        password
      });
    //   dispatch(loginSuccess(response.data));
      localStorage.setItem('token', response.data.access);
      router.push('/'); 
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
      >
        Login
      </Button>
    </Container>
  );
};

export default LoginForm;
