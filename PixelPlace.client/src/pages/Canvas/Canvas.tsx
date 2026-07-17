import { useMutation, useQuery } from "@apollo/client/react";
import { GET_CANVAS } from "../../graphql/queries/getCanvas";
import PixelCanvas from "./components/PixelCanvas";
import { PLACE_PIXEL } from "../../graphql/mutations/placePixel";
import { useState } from "react";
import ColorPicker from "./components/ColorPicker";

function Canvas() {
  const [colorCode, setColorCode] = useState("#0000FF");

  const { data, loading, error } = useQuery(GET_CANVAS);

  const [
    placePixel,
    // ,{ loading: placePixelLoading, error: placePixelError }
  ] = useMutation(PLACE_PIXEL);

  async function handlePixelClick(x: number, y: number) {
    console.log(x, y);

    const { data } = await placePixel({
      variables: {
        input: {
          color: colorCode,
          x,
          y,
        },
      },
    });

    console.log("RESPONSE", data);
  }

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex gap-4 flex-col items-center">
      <ColorPicker color={colorCode} setColor={setColorCode} />

      <PixelCanvas
        pixels={data?.canvas ?? []}
        onPixelClick={handlePixelClick}
      />
    </div>
  );
}

export default Canvas;
