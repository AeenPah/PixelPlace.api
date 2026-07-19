type TColorPickerProps = {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
};

function ColorPicker({ color, setColor }: TColorPickerProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-[0_8px_24px_rgba(31,35,40,0.06)]">
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="h-10 w-10 cursor-pointer rounded border-0 bg-transparent p-0"
      />

      <span className="rounded-full bg-muted px-3 py-1 font-mono text-sm text-muted-foreground">
        {color.toUpperCase()}
      </span>
    </div>
  );
}

export default ColorPicker;
