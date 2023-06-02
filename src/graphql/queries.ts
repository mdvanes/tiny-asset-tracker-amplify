/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLora = /* GraphQL */ `
  query GetLora($id: ID!) {
    getLora(id: $id) {
      id
      time
      lat
      long
      temp
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listLoras = /* GraphQL */ `
  query ListLoras(
    $filter: ModelLoraFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLoras(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        time
        lat
        long
        temp
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
