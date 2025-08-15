import { Item } from "../types";

type SlotProps = {
  item: Item | null;
  index: number;
  label?: string;
  onClick: (index: number) => void;
  onDragStart: (index: number) => void;
  onDrop: (toIndex: number) => void;
};

export default function Slot({
  item,
  index,
  label,
  onClick,
  onDragStart,
  onDrop,
}: SlotProps) {
  return (
    <div
      draggable={!!item}
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(index)}
      onClick={() => onClick(index)}
      className="w-12 aspect-square border flex items-center justify-center rounded-md transition-colors cursor-pointer select-none overflow-hidden shadow-sm"
      style={{
        backgroundColor: "var(--color-mocha)",
        borderColor: "var(--color-cacao)",
      }}
    >
      {item ? (
        <img
          src={item.icon}
          alt={item.name}
          className="max-w-[80%] max-h-[80%] object-contain pointer-events-none"
        />
      ) : label ? (
        <span
          className="text-[10px] text-center leading-tight font-bold"
          style={{ color: "var(--color-taupe)" }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}
