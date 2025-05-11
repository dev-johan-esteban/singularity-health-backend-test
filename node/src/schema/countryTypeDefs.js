import { gql } from 'apollo-server-express';

const countryTypeDefs = gql`
  type Country {
    id: Int!
    countryCode: String!
    countryName: String!
  }

  input NewCountryInput {
    countryCode: String!
    countryName: String!
  }

  extend type Query {
    getAllCountries: [Country!]!
  }

  extend type Mutation {
    createCountry(input: NewCountryInput!): Country
  }
`;

export default countryTypeDefs;
