import { Item } from "../types";

type SlotProps = {
  item: Item | null;
  index: number;
  onClick: (index: number) => void;
  label?: string;
};

export default function Slot({ item, index, onClick, label }: SlotProps) {
  return (
    <div
      onClick={() => onClick(index)}
      className="
        w-12 aspect-square border
        flex items-center justify-center
        rounded-md
        transition-colors cursor-pointer select-none overflow-hidden shadow-sm
      "
      style={{
        backgroundColor: "var(--color-mocha)",
        borderColor: "var(--color-cacao)",
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        target.style.backgroundColor = "var(--color-sable)";
        target.style.borderColor = "var(--color-kharid)";
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        target.style.backgroundColor = "var(--color-mocha)";
        target.style.borderColor = "var(--color-cacao)";
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
          className="text-[10px] text-center leading-tight"
          style={{ color: "var(--color-taupe)" }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}
