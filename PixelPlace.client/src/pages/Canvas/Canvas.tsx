import { useMutation, useQuery, useSubscription } from "@apollo/client/react";
import { GET_CANVAS, type TPixel } from "../../graphql/queries/getCanvas";
import PixelCanvas from "./components/PixelCanvas";
import { PLACE_PIXEL } from "../../graphql/mutations/placePixel";
import { useEffect, useState } from "react";
import ColorPicker from "./components/ColorPicker";
import { PIXEL_UPDATED } from "../../graphql/subscription/pixelUpdated";

function Canvas() {
  /* -------------------------------------------------------------------------- */
  /*                                   GraphQL                                  */
  /* -------------------------------------------------------------------------- */

  const {
    data: canvasData,
    loading: canvasLoading,
    error: canvasError,
  } = useQuery(GET_CANVAS);

  const [
    placePixel,
    // ,{ loading: placePixelLoading, error: placePixelError }
  ] = useMutation(PLACE_PIXEL);

  const { data: subData } = useSubscription(PIXEL_UPDATED);

  /* -------------------------------------------------------------------------- */
  /*                                 React Hook                                 */
  /* -------------------------------------------------------------------------- */

  const [selectedColor, setSelectedColor] = useState("#0000FF");
  const [pixels, setPixels] = useState<TPixel[]>([]);

  useEffect(() => {
    const updatePixels = () => {
      if (canvasData?.canvas) {
        setPixels(canvasData.canvas);
      }
    };

    updatePixels();
  }, [canvasData]);

  useEffect(() => {
    if (!subData) return;

    const updatePixel = () =>
      setPixels((prev) => [...prev, subData.pixelPlaced]);

    updatePixel();

    console.log(subData);
  }, [subData]);

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */

  async function handlePixelClick(x: number, y: number) {
    await placePixel({
      variables: {
        input: {
          color: selectedColor,
          x,
          y,
        },
      },
    });
  }

  if (canvasLoading) return <div>Loading...</div>;

  if (canvasError) return <div>Error: {canvasError.message}</div>;

  return (
    <div className="flex gap-4 flex-col items-center">
      <ColorPicker color={selectedColor} setColor={setSelectedColor} />

      <PixelCanvas pixels={pixels} onPixelClick={handlePixelClick} />
    </div>
  );
}

export default Canvas;
