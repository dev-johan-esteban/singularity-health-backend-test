import { gql } from 'apollo-server-express';

const documentTypeDefs = gql`
  type TypeDocument {
    id: Int!
    nameTypeDocument: String!
  }

  input NewTypeDocumentInput {
    nameTypeDocument: String!
  }

  extend type Query {
    getAllTypeDocuments: [TypeDocument]
    documentExists(document: String!): Boolean
  }

  extend type Mutation {
    createTypeDocument(input: NewTypeDocumentInput!): TypeDocument
  }
`;

export default documentTypeDefs;
