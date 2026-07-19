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
    <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-[0_12px_32px_rgba(31,35,40,0.08)]">
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
                    border border-border/80
                    transition-all duration-75
                    hover:z-10
                    hover:border-primary/40
                    hover:scale-120
                    hover:shadow-[0_0_8px_rgba(75,107,138,0.22)]
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
