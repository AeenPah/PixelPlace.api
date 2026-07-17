import { gql } from "@apollo/client";

export const GET_CANVAS = gql`
  query GetCanvas {
    canvas {
      x
      y
      color
    }
  }
`;
