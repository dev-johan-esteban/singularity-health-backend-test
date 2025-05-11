import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControlLabel, Checkbox, Box } from '@mui/material';
import { gql, useLazyQuery } from '@apollo/client';

const CHECK_USERNAME = gql`
  query UsernameExists($username: String!) {
    usernameExists(username: $username)
  }
`;

const CHECK_EMAIL = gql`
  query EmailExists($email: String!) {
    emailExists(email: $email)
  }
`;

export default function PersonalDataForm({ onNext, onChange }) {
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    isMiliar: false,
    isTemporal: false,
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (!form.password) {
      setErrors((prev) => ({ ...prev, password: '' }));
      return;
    }
  
    if (!validatePassword(form.password)) {
      setErrors((prev) => ({
        ...prev,
        password: 'La contraseña debe tener al menos 8 caracteres, una minúscula, un número y un carácter especial',
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  }, [form.password]);

  const [checkUsername, { called: calledUsername }] = useLazyQuery(CHECK_USERNAME, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data.usernameExists) {
        setErrors((prev) => ({ ...prev, username: 'Este usuario ya existe' }));
      } else {
        setErrors((prev) => ({ ...prev, username: '' }));
      }
    },
  });

  const [checkEmail, { called: calledEmail }] = useLazyQuery(CHECK_EMAIL, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data.emailExists) {
        setErrors((prev) => ({ ...prev, email: 'Este correo ya está registrado' }));
      } else {
        setErrors((prev) => ({ ...prev, email: '' }));
      }
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (form.username.length > 2) checkUsername({ variables: { username: form.username } });
    }, 600); // espera 600ms tras el último cambio
    return () => clearTimeout(timeout);
  }, [form.username]);

  const validateEmailFormat = (email) => {
    const regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!form.email) return;

      if (!validateEmailFormat(form.email)) {
        setErrors((prev) => ({ ...prev, email: 'Formato de correo inválido' }));
      } else {
        checkEmail({ variables: { email: form.email } });
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [form.email]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setForm((prev) => ({ ...prev, [name]: val }));
  };

  const handleNext = () => {
    onChange(form);
    onNext();
  };

  const isDisabled = ['name', 'lastName', 'username', 'password', 'email'].some(
    (key) => !form[key] || (typeof form[key] === 'string' && form[key].trim() === '')
  ) || !!errors.username || !!errors.email || !!errors.password;


  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
    return regex.test(password);
  };
  

  return (
    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Nombre" name="name" value={form.name} onChange={handleChange} required />
      <TextField label="Apellido" name="lastName" value={form.lastName} onChange={handleChange} required />
      <TextField label="Usuario" name="username" value={form.username} onChange={handleChange} error={!!errors.username} helperText={errors.username} required />
      <TextField label="Correo" name="email" type="email" value={form.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} required />
      <TextField label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} sx={{ width: '100%', maxWidth: 358 }} required />

      <FormControlLabel control={<Checkbox name="isMiliar" checked={form.isMiliar} onChange={handleChange} />} label="¿Es militar?" />
      <FormControlLabel control={<Checkbox name="isTemporal" checked={form.isTemporal} onChange={handleChange} />} label="¿Es temporal?" />
      <Button variant="contained" onClick={handleNext} disabled={isDisabled}>
        Siguiente
      </Button>
    </Box>
  );
}
