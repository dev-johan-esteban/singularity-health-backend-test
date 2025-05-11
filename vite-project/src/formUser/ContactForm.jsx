import React, { useState } from 'react';
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl, CircularProgress } from '@mui/material';
import { useQuery, gql } from '@apollo/client';
import Swal from 'sweetalert2';

const GET_ALL_COUNTRIES = gql`
  query GetAllCountries {
    getAllCountries {
      id
      countryName
    }
  }
`;

export default function ContactForm({ onBack, initialData, registerUser, onSuccess }) {
  const [form, setForm] = useState({
    address: '',
    countryId: '',
    city: '',
    phone: '',
    celPhone: '',
    emergencyName: '',
    emergencyPhone: '',
  });

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { loading, error, data } = useQuery(GET_ALL_COUNTRIES);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'countryId' ? Number(value) : value
    }));
  };

  const handleFinish = async () => {
    const confirmed = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas registrar este usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, registrar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirmed.isConfirmed) {
      Swal.fire({
        title: 'Registro cancelado',
        text: 'El usuario no fue registrado.',
        icon: 'info',
        confirmButtonText: 'Ok',
      });
      return;
    }

    const fullData = {
      ...initialData,
      ...form,
    };

    setLoadingSubmit(true);
    setSubmitError(null);

    try {
      await registerUser({ variables: { input: fullData } });
      onSuccess?.(); // Notifica al padre que fue exitoso
    } catch (err) {
      const msg = err.message || 'Error al registrar el usuario';

      // Mensajes más específicos para errores conocidos
      if (msg.includes('correo electrónico')) {
        setSubmitError('⚠️ El correo electrónico ya está registrado.');
      } else if (msg.includes('usuario')) {
        setSubmitError('⚠️ El nombre de usuario ya está en uso.');
      } else if (msg.includes('documento')) {
        setSubmitError('⚠️ Este documento ya existe en el sistema.');
      } else {
        setSubmitError(`❌ ${msg}`);
      }

      console.error('❌ Error al registrar:', err);
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loading) return <p>Cargando países...</p>;
  if (error) return <p>Error al cargar países</p>;

  const isDisabled =
    ['address', 'countryId', 'city', 'celPhone', 'emergencyName', 'emergencyPhone'].some(
      (key) => !form[key] || (typeof form[key] === 'string' && form[key].trim() === '')
    ) || loadingSubmit;

    const allowOnlyNumbers = (e) => {
      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
      const isNumberKey = /^[0-9]$/.test(e.key);
      if (!isNumberKey && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    };
    


  return (
    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Dirección" name="address" value={form.address} onChange={handleChange} required />

      <FormControl fullWidth required>
        <InputLabel id="countryId-label">País</InputLabel>
        <Select
          labelId="countryId-label"
          name="countryId"
          value={form.countryId}
          onChange={handleChange}
        >
          {data.getAllCountries.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.countryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField label="Ciudad" name="city" value={form.city} onChange={handleChange} />
      <TextField label="Teléfono" name="phone" value={form.phone} onChange={handleChange} onKeyDown={allowOnlyNumbers} />
      <TextField label="Celular" name="celPhone" value={form.celPhone} onChange={handleChange} onKeyDown={allowOnlyNumbers} />
      <TextField label="Contacto de emergencia" name="emergencyName" value={form.emergencyName} onChange={handleChange} />
      <TextField label="Teléfono de emergencia" name="emergencyPhone" value={form.emergencyPhone} onChange={handleChange} inputProps={{ inputMode: 'numeric' }} onKeyDown={allowOnlyNumbers} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button onClick={onBack}>Atrás</Button>
        {/* <Button variant="contained" onClick={handleFinish} disabled={loadingSubmit}> */}
        <Button variant="contained" onClick={handleFinish} disabled={isDisabled}>
          {loadingSubmit ? <CircularProgress size={24} color="inherit" /> : 'Registrar'}
        </Button>
      </Box>

      {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
    </Box>
  );
}
