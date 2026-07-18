import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import type { TPixel } from "../../../graphql/queries/getCanvas";

type TPixelCanvas = {
  pixels: TPixel[];
  onPixelClick: (x: number, y: number) => void;
};
const SIZE = 50;

function PixelCanvas({ pixels, onPixelClick }: TPixelCanvas) {
  const pixelMap = new Map(
    pixels.map((pixel) => [
      `${pixel.x},${pixel.y}`,
      { color: pixel.color, username: pixel.user.username },
    ]),
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

          const pixel = pixelMap.get(`${x},${y}`);

          return (
            <Tooltip key={`${x}-${y}`}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onPixelClick(x, y)}
                  className="
                    h-3 w-3
                    border border-gray-200
                    transition-all duration-75
                    hover:z-10
                    hover:border-gray-500
                    hover:scale-120
                    hover:shadow-[0_0_8px_rgba(255,255,255,0.5)]
                    cursor-pointer
                  "
                  style={{
                    backgroundColor: pixel?.color ?? "#F8FAFC",
                  }}
                />
              </TooltipTrigger>

              {pixel && (
                <TooltipContent>
                  <p>{pixel.username}</p>
                </TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}

export default PixelCanvas;
