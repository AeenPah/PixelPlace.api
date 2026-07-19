import { gql, type TypedDocumentNode } from "@apollo/client";

type TRegisterResult = { register: { token: string; username: string } };

type TRegisterVariables = { input: { username: string; password: string } };

export const REGISTER: TypedDocumentNode<TRegisterResult, TRegisterVariables> =
  gql`
    mutation register($input: RegisterInput!) {
      register(input: $input) {
        token
        username
      }
    }
  `;
