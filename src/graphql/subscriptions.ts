/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLora = /* GraphQL */ `
  subscription OnCreateLora(
    $filter: ModelSubscriptionLoraFilterInput
    $owner: String
  ) {
    onCreateLora(filter: $filter, owner: $owner) {
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
export const onUpdateLora = /* GraphQL */ `
  subscription OnUpdateLora(
    $filter: ModelSubscriptionLoraFilterInput
    $owner: String
  ) {
    onUpdateLora(filter: $filter, owner: $owner) {
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
export const onDeleteLora = /* GraphQL */ `
  subscription OnDeleteLora(
    $filter: ModelSubscriptionLoraFilterInput
    $owner: String
  ) {
    onDeleteLora(filter: $filter, owner: $owner) {
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
