
// import { gql } from 'apollo-server-express';

// const typeDefs = gql`
//   type Query {
//     _empty: String
//   }

//   type AppUser {
//     id: ID!
//     lastName: String!
//     name: String!
//     isMiliar: Boolean
//     timeCreate: String
//     isTemporal: Boolean
//     username: String!
//     email: String!
//     emailVerified: Boolean
//   }

//   type TypeDocument {
//     id: Int!
//     nameTypeDocument: String!
//   }

//   type Country {
//     id: Int!
//     countryCode: String!
//     countryName: String!
//   }

//   input RegisterUserInput {
//     lastName: String!
//     name: String!
//     isMiliar: Boolean
//     isTemporal: Boolean
//     username: String!
//     password: String!
//     email: String!

//     document: String!
//     placeExpedition: String!
//     dateExpedition: String!
//     typeDocumentId: Int!

//     address: String!
//     countryId: Int!
//     city: String
//     phone: String
//     celPhone: String
//     emergencyName: String
//     emergencyPhone: String
//   }

//   input NewTypeDocumentInput {
//     nameTypeDocument: String!
//   }

//   input NewCountryInput {
//     countryCode: String!
//     countryName: String!
//   }

//   type Mutation {
//   registerUser(input: RegisterUserInput!): AppUser
//   verifyEmail(token: String!): String
//   createTypeDocument(input: NewTypeDocumentInput!): TypeDocument
//   createCountry(input: NewCountryInput!): Country
// }


// `;

// export default typeDefs;

import { mergeTypeDefs } from '@graphql-tools/merge';
import userTypeDefs from './userTypeDefs.js';
import documentTypeDefs from './documentTypeDefs.js';
import countryTypeDefs from './countryTypeDefs.js';
import baseTypeDefs from './baseTypeDefs.js';

const typeDefs = mergeTypeDefs([
    baseTypeDefs,
    userTypeDefs,
    documentTypeDefs,
    countryTypeDefs,
]);

export default typeDefs;
