/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateLoraInput = {
  id?: string | null,
  time: string,
  lat: string,
  long: string,
  temp: string,
};

export type ModelLoraConditionInput = {
  time?: ModelStringInput | null,
  lat?: ModelStringInput | null,
  long?: ModelStringInput | null,
  temp?: ModelStringInput | null,
  and?: Array< ModelLoraConditionInput | null > | null,
  or?: Array< ModelLoraConditionInput | null > | null,
  not?: ModelLoraConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Lora = {
  __typename: "Lora",
  id: string,
  time: string,
  lat: string,
  long: string,
  temp: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateLoraInput = {
  id: string,
  time?: string | null,
  lat?: string | null,
  long?: string | null,
  temp?: string | null,
};

export type DeleteLoraInput = {
  id: string,
};

export type ModelLoraFilterInput = {
  id?: ModelIDInput | null,
  time?: ModelStringInput | null,
  lat?: ModelStringInput | null,
  long?: ModelStringInput | null,
  temp?: ModelStringInput | null,
  and?: Array< ModelLoraFilterInput | null > | null,
  or?: Array< ModelLoraFilterInput | null > | null,
  not?: ModelLoraFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelLoraConnection = {
  __typename: "ModelLoraConnection",
  items:  Array<Lora | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionLoraFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  time?: ModelSubscriptionStringInput | null,
  lat?: ModelSubscriptionStringInput | null,
  long?: ModelSubscriptionStringInput | null,
  temp?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionLoraFilterInput | null > | null,
  or?: Array< ModelSubscriptionLoraFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateLoraMutationVariables = {
  input: CreateLoraInput,
  condition?: ModelLoraConditionInput | null,
};

export type CreateLoraMutation = {
  createLora?:  {
    __typename: "Lora",
    id: string,
    time: string,
    lat: string,
    long: string,
    temp: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateLoraMutationVariables = {
  input: UpdateLoraInput,
  condition?: ModelLoraConditionInput | null,
};

export type UpdateLoraMutation = {
  updateLora?:  {
    __typename: "Lora",
    id: string,
    time: string,
    lat: string,
    long: string,
    temp: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteLoraMutationVariables = {
  input: DeleteLoraInput,
  condition?: ModelLoraConditionInput | null,
};

export type DeleteLoraMutation = {
  deleteLora?:  {
    __typename: "Lora",
    id: string,
    time: string,
    lat: string,
    long: string,
    temp: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetLoraQueryVariables = {
  id: string,
};

export type GetLoraQuery = {
  getLora?:  {
    __typename: "Lora",
    id: string,
    time: string,
    lat: string,
    long: string,
    temp: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListLorasQueryVariables = {
  filter?: ModelLoraFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLorasQuery = {
  listLoras?:  {
    __typename: "ModelLoraConnection",
    items:  Array< {
      __typename: "Lora",
      id: string,
      time: string,
      lat: string,
      long: string,
      temp: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateLoraSubscriptionVariables = {
  filter?: ModelSubscriptionLoraFilterInput | null,
  owner?: string | null,
};

export type OnCreateLoraSubscription = {
  onCreateLora?:  {
    __typename: "Lora",
    id: string,
    time: string,
    lat: string,
    long: string,
    temp: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateLoraSubscriptionVariables = {
  filter?: ModelSubscriptionLoraFilterInput | null,
  owner?: string | null,
};

export type OnUpdateLoraSubscription = {
  onUpdateLora?:  {
    __typename: "Lora",
    id: string,
    time: string,
    lat: string,
    long: string,
    temp: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteLoraSubscriptionVariables = {
  filter?: ModelSubscriptionLoraFilterInput | null,
  owner?: string | null,
};

export type OnDeleteLoraSubscription = {
  onDeleteLora?:  {
    __typename: "Lora",
    id: string,
    time: string,
    lat: string,
    long: string,
    temp: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
