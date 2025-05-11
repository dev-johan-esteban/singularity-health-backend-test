
import React, { useState } from 'react';
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useQuery, useLazyQuery, gql } from '@apollo/client';

const GET_TYPE_DOCUMENTS = gql`
  query GetAllTypeDocuments {
    getAllTypeDocuments {
      id
      nameTypeDocument
    }
  }
`;

const CHECK_DOCUMENT = gql`
  query DocumentExists($document: String!) {
    documentExists(document: $document)
  }
`;

export default function DocumentForm({ onNext, onBack, onChange }) {
  const [form, setForm] = useState({
    document: '',
    placeExpedition: '',
    dateExpedition: '',
    typeDocumentId: '',
  });

  const [errors, setErrors] = useState({ document: '' });

  const { loading, error, data } = useQuery(GET_TYPE_DOCUMENTS);

  const [checkDocument] = useLazyQuery(CHECK_DOCUMENT, {
    onCompleted: (data) => {
      if (data.documentExists) {
        setErrors((prev) => ({
          ...prev,
          document: 'Este documento ya está registrado',
        }));
      } else {
        setErrors((prev) => ({ ...prev, document: '' }));
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'typeDocumentId' ? Number(value) : value;
    setForm((prev) => ({ ...prev, [name]: newValue }));

    if (name === 'document' && value.length >= 5) {
      checkDocument({ variables: { document: value } });
    }
  };

  const handleNext = () => {
    onChange(form);
    onNext();
  };

  const isDisabled =
    ['document', 'placeExpedition', 'dateExpedition', 'typeDocumentId'].some(
      (key) => !form[key] || (typeof form[key] === 'string' && form[key].trim() === '')
    ) || !!errors.document;

  if (loading) return <p>Cargando tipos de documento...</p>;
  if (error) return <p>Error al cargar tipos de documento</p>;

  return (
    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl fullWidth required>
        <InputLabel id="typeDocumentId-label">Tipo de Documento</InputLabel>
        <Select labelId="typeDocumentId-label" name="typeDocumentId" value={form.typeDocumentId} onChange={handleChange} >
          {data.getAllTypeDocuments.map((doc) => (
            <MenuItem key={doc.id} value={doc.id}>
              {doc.nameTypeDocument}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField label="Documento" name="document" value={form.document} onChange={handleChange} required error={!!errors.document} helperText={errors.document} />
      <TextField label="Lugar de expedición" name="placeExpedition" value={form.placeExpedition} onChange={handleChange} required />
      <TextField label="Fecha de expedición" name="dateExpedition" type="date" value={form.dateExpedition} onChange={handleChange} InputLabelProps={{ shrink: true }} inputProps={{ max: new Date().toISOString().split('T')[0] }} required />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack}>Atrás</Button>
        <Button variant="contained" onClick={handleNext} disabled={isDisabled}>
          Siguiente
        </Button>
      </Box>
    </Box>
  );
}
