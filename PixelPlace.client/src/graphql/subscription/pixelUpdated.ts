import { gql, type TypedDocumentNode } from "@apollo/client";
import type { TPixel } from "../queries/getCanvas";

type TPixelUpdatedResult = {
  pixelPlaced: TPixel;
};

export const PIXEL_UPDATED: TypedDocumentNode<TPixelUpdatedResult> = gql`
  subscription {
    pixelPlaced {
      x
      y
      color
      user {
        username
      }
    }
  }
`;
