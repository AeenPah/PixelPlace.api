import type { TPixel } from "../../../graphql/queries/getCanvas";
import Pixel from "./Pixel";

const SIZE = 50;

function PixelCanvas({ pixels }: { pixels: TPixel[] }) {
  const pixelMap = new Map(
    pixels.map((pixel) => [`${pixel.x},${pixel.y}`, pixel.color]),
  );

  return (
    <div className="rounded-lg border border-gray-300 bg-gray-100 p-4 shadow-lg">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${SIZE}, 12px)`,
        }}
      >
        {Array.from({ length: SIZE * SIZE }, (_, index) => {
          const x = index % SIZE;
          const y = Math.floor(index / SIZE);

          return (
            <Pixel
              key={`${x}-${y}`}
              x={x}
              y={y}
              color={pixelMap.get(`${x},${y}`)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PixelCanvas;
