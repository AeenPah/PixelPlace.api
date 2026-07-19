import { gql, type TypedDocumentNode } from "@apollo/client";

type TLoginResult = { login: { token: string; username: string } };

type TLoginVariables = { input: { username: string; password: string } };

export const LOGIN: TypedDocumentNode<TLoginResult, TLoginVariables> = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      username
    }
  }
`;
