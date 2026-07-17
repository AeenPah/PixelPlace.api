type PixelProps = {
  x: number;
  y: number;
  color?: string;
  onClick: (x: number, y: number) => void;
};

function Pixel({ x, y, color, onClick }: PixelProps) {
  return (
    <button
      onClick={() => onClick(x, y)}
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
      style={{ backgroundColor: color ?? "#F8FAFC" }}
    />
  );
}

export default Pixel;
