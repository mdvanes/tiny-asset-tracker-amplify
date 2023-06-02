/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLora = /* GraphQL */ `
  mutation CreateLora(
    $input: CreateLoraInput!
    $condition: ModelLoraConditionInput
  ) {
    createLora(input: $input, condition: $condition) {
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
export const updateLora = /* GraphQL */ `
  mutation UpdateLora(
    $input: UpdateLoraInput!
    $condition: ModelLoraConditionInput
  ) {
    updateLora(input: $input, condition: $condition) {
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
export const deleteLora = /* GraphQL */ `
  mutation DeleteLora(
    $input: DeleteLoraInput!
    $condition: ModelLoraConditionInput
  ) {
    deleteLora(input: $input, condition: $condition) {
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
