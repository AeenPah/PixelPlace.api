import { gql, type TypedDocumentNode } from "@apollo/client";
import type { TPixel } from "../queries/getCanvas";

type TPlacePixelResult = TPixel;

type TPlacePixelVariables = {
  input: {
    x: number;
    y: number;
    color: string;
  };
};

export const PLACE_PIXEL: TypedDocumentNode<
  TPlacePixelResult,
  TPlacePixelVariables
> = gql`
  mutation placePixel($input: PlacePixelInput!) {
    placePixel(input: $input) {
      x
      y
      color
    }
  }
`;
