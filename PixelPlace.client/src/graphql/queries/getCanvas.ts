import { gql, type TypedDocumentNode } from "@apollo/client";

export type TPixel = {
  x: number;
  y: number;
  color: string;
  user: { username: string };
};

type TCanvasResult = {
  canvas: TPixel[];
};

export const GET_CANVAS: TypedDocumentNode<TCanvasResult> = gql`
  query GetCanvas {
    canvas {
      x
      y
      color
      user {
        username
      }
    }
  }
`;
