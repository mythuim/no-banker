import { Item } from "../types";

type SlotProps = {
  item: Item | null;
  index: number;
  onClick: (index: number) => void;
};

export default function Slot({ item, index, onClick }: SlotProps) {
  return (
    <div
      onClick={() => onClick(index)}
      className="
    w-12 aspect-square border border-gray-400
    flex items-center justify-center
    rounded-md bg-gray-100
    hover:border-blue-500 hover:bg-gray-200
    transition-colors cursor-pointer select-none
    overflow-hidden shadow-sm
  "
    >
      {item && (
        <img
          src={item.icon}
          alt={item.name}
          className="max-w-[80%] max-h-[80%] object-contain pointer-events-none"
        />
      )}
    </div>
  );
}
