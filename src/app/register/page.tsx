'use client'
import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Alert } from '@mui/material';
import api from '../components/Config';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone_number: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [registrationFail, setRegistrationFail] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
            valid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
            valid = false;
        }

        if (formData.phone_number.trim() && !/^\d{11}$/.test(formData.phone_number)) {
            newErrors.phone_number = 'Phone number is invalid';
            valid = false;
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            api.post('/users/', formData)
                .then(response => {
                    console.log(response.data);
                    setRegistrationSuccess(true);
                })
                .catch(error => {
                    console.error('Error:', error);
                    setRegistrationFail(true);

                });
        }
    };

    return (
        <Container maxWidth="sm" style={{  justifyContent: 'center', alignItems: 'center', marginTop:"50px" }}>


            <h2>Registration form</h2>
            {registrationSuccess && (
                <Alert severity="success" onClose={() => setRegistrationSuccess(false)}>Registration successful!</Alert>
            )}
            {registrationFail && (
                <Alert severity="error" onClose={() => setRegistrationFail(false)}>Error !</Alert>
            )}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Username" name="username" value={formData.username} onChange={handleChange} required error={!!errors.username} helperText={errors.username} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required error={!!errors.email} helperText={errors.email} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleChange} error={!!errors.phone_number} helperText={errors.phone_number} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required error={!!errors.password} helperText={errors.password} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">Register</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default RegistrationForm;
