type TColorPickerProps = {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
};

function ColorPicker({ color, setColor }: TColorPickerProps) {
  return (
    <div className="flex text-black items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="h-10 w-10 cursor-pointer rounded border-0 bg-transparent p-0"
      />

      <span className="rounded bg-gray-100 px-3 py-1 font-mono text-sm">
        {color.toUpperCase()}
      </span>
    </div>
  );
}

export default ColorPicker;
