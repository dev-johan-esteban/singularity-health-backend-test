import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';
import PersonalDataForm from './PersonalDataForm.jsx';
import DocumentForm from './DocumentForm.jsx';
import ContactForm from './ContactForm.jsx';
import { Button, Box, Stepper, Step, StepLabel } from '@mui/material';

const steps = ['Datos personales', 'Documento', 'Contacto'];

export default function CreateUser() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const [registerUser, { loading, error, data }] = useMutation(REGISTER_USER);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleChange = (dataOrUpdater) => {
    setFormData((prev) =>
      typeof dataOrUpdater === 'function' ? dataOrUpdater(prev) : { ...prev, ...dataOrUpdater }
    );
  };

  const handleResetForm = () => {
    setFormData({});
    setActiveStep(0);
    setShowSuccess(false);
  };

  // Mostrar mensaje solo cuando la mutación fue exitosa
  React.useEffect(() => {
    if (data?.registerUser?.id) {
      setShowSuccess(true);
    }
  }, [data]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          padding: 4,
        }}
      >
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {!showSuccess && (
          <>
            {activeStep === 0 && (
              <PersonalDataForm onNext={handleNext} onChange={handleChange} />
            )}
            {activeStep === 1 && (
              <DocumentForm onNext={handleNext} onBack={handleBack} onChange={handleChange} />
            )}
            {activeStep === 2 && (
              <ContactForm
                onBack={handleBack}
                initialData={formData}
                registerUser={registerUser}
              />
            )}
          </>
        )}

        {loading && <p>Registrando...</p>}
        {error && (
          <Box sx={{ mt: 2, color: 'red' }}>
            <p><strong>Error:</strong> {error.message}</p>
          </Box>
        )}

        {showSuccess && (
          <Box sx={{ mt: 3 }}>
            <p style={{ color: 'green' }}>¡Usuario registrado exitosamente!</p>
            <Button variant="contained" color="primary" onClick={handleResetForm}>
              Registrar otro usuario
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );




}
