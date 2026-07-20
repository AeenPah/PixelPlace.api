import { useMutation, useQuery, useSubscription } from "@apollo/client/react";
import { GET_CANVAS, type TPixel } from "../../graphql/queries/getCanvas";
import PixelCanvas from "./components/PixelCanvas";
import { PLACE_PIXEL } from "../../graphql/mutations/placePixel";
import { Fragment, useEffect, useState } from "react";
import ColorPicker from "./components/ColorPicker";
import { PIXEL_UPDATED } from "../../graphql/subscription/pixelUpdated";
import { notify } from "../../lib/Notify/notify";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { CombinedGraphQLErrors } from "@apollo/client";

function upsertPixel(pixels: TPixel[], pixel: TPixel): TPixel[] {
  const index = pixels.findIndex((p) => p.x === pixel.x && p.y === pixel.y);
  if (index === -1) return [...pixels, pixel];

  const next = [...pixels];
  next[index] = pixel;
  return next;
}

function Canvas() {
  /* -------------------------------------------------------------------------- */
  /*                          React Router <Dom></Dom>                          */
  /* -------------------------------------------------------------------------- */

  const navigate = useNavigate();

  /* -------------------------------------------------------------------------- */
  /*                                   GraphQL                                  */
  /* -------------------------------------------------------------------------- */

  const {
    data: canvasData,
    loading: canvasLoading,
    error: canvasError,
  } = useQuery(GET_CANVAS);

  const [placePixel, { loading: placePixelLoading }] = useMutation(
    PLACE_PIXEL,
    {
      onCompleted: () => {
        notify.success("Pixel placed successfully!");
      },
      onError: (error) => {
        if (CombinedGraphQLErrors.is(error)) {
          const code = error.errors[0]?.extensions?.code;

          if (code === "UNAUTHORIZED") {
            notify.error(error.message, {
              duration: 5000,
              actions: [
                { value: "Login", actionFn: () => navigate("/auth/login") },
              ],
            });
            return;
          }
        }

        notify.error(`Place Pixel Error: ${error.message}`);
      },
    },
  );

  const { data: subData } = useSubscription(PIXEL_UPDATED);

  /* -------------------------------------------------------------------------- */
  /*                                 React Hook                                 */
  /* -------------------------------------------------------------------------- */

  const [selectedColor, setSelectedColor] = useState("#0000FF");
  const [pixels, setPixels] = useState<TPixel[]>([]);

  useEffect(() => {
    const setCanvasPixels = () => {
      if (canvasData?.canvas) setPixels(canvasData.canvas);
    };

    setCanvasPixels();
  }, [canvasData]);

  useEffect(() => {
    if (!subData) return;

    const updatePixel = () =>
      setPixels((prev) => upsertPixel(prev, subData.pixelPlaced));

    updatePixel();
  }, [subData]);

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */

  async function handlePixelClick(x: number, y: number) {
    await placePixel({
      variables: {
        input: { color: selectedColor, x, y },
      },
    });
  }

  if (canvasError) return <div>Error: {canvasError.message}</div>;

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="flex flex-col items-center gap-4 p-6">
        {canvasLoading ? (
          <div>Loading...</div>
        ) : (
          <Fragment>
            <ColorPicker color={selectedColor} setColor={setSelectedColor} />

            <PixelCanvas
              pixels={pixels}
              onPixelClick={handlePixelClick}
              disabled={placePixelLoading}
            />
          </Fragment>
        )}
      </main>
    </div>
  );
}

export default Canvas;
