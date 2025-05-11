import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      id
      lastName
      name
      username
      email
      emailVerified
      isMiliar
      isTemporal
      timeCreate
    }
  }
`;
