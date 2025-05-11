import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';

const VERIFY_EMAIL = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token)
  }
`;

const VerificationEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [verifyEmail] = useMutation(VERIFY_EMAIL);

  useEffect(() => {
    const handleVerify = async () => {
      try {
        const { data } = await verifyEmail({ variables: { token } });

        Swal.fire({
          icon: 'success',
          title: 'Correo verificado',
          text: data.verifyEmail,
          confirmButtonText: 'Aceptar',
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error de verificación',
          text: error.message || 'Error desconocido',
          confirmButtonText: 'Intentar de nuevo',
        });
      }
    };

    if (token) {
      handleVerify();
    }
  }, [token, verifyEmail]);

  return null;
};

export default VerificationEmail;
