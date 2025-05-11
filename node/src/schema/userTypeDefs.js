import { gql } from 'apollo-server-express';

const userTypeDefs = gql`
  type AppUser {
    id: ID!
    lastName: String!
    name: String!
    isMiliar: Boolean
    timeCreate: String
    isTemporal: Boolean
    username: String!
    email: String!
    emailVerified: Boolean
  }

  input RegisterUserInput {
    lastName: String!
    name: String!
    isMiliar: Boolean
    isTemporal: Boolean
    username: String!
    password: String!
    email: String!
    document: String!
    placeExpedition: String!
    dateExpedition: String!
    typeDocumentId: Int!
    address: String!
    countryId: Int!
    city: String
    phone: String
    celPhone: String
    emergencyName: String
    emergencyPhone: String
  }

  extend type Mutation {
    registerUser(input: RegisterUserInput!): AppUser
    verifyEmail(token: String!): String
  }

  extend type Query {
    usernameExists(username: String!): Boolean
    emailExists(email: String!): Boolean
  }
`;

export default userTypeDefs;
