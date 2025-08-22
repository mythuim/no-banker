"use client";

import { useEffect, useMemo, useState } from "react";
import Slot from "./Slot";
import Search from "./Search";
import { Item } from "../types";

const Grid = (props: any) => {
  const { startValue, selectedItems, setSelectedItems } = props;
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  function handleDragStart(index: number) {
    setDraggedIndex(index);
  }

  function handleDrop(toIndex: number) {
    if (draggedIndex === null || draggedIndex === toIndex) return;

    setSelectedItems((prev: (Item | null)[]) => {
      const updated = [...prev];
      const temp = updated[toIndex];
      updated[toIndex] = updated[draggedIndex];
      updated[draggedIndex] = temp;
      return updated;
    });

    setDraggedIndex(null);
  }

  useEffect(() => {
    fetch("/items.json")
      .then((res) => res.json())
      .then((data: Record<string, Item>) => {
        setAllItems(Object.values(data));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (query.trim().length < 3) return [];
    const q = query.toLowerCase();
    return allItems.filter((it) => it.name.toLowerCase().includes(q));
  }, [allItems, query]);

  function openModal(index: number) {
    setActiveIndex(index);
    setQuery("");
  }

  function closeModal() {
    setActiveIndex(null);
    setQuery("");
  }

  function selectItem(item: Item) {
    if (activeIndex === null) return;
    setSelectedItems((prev: Item[] | null[]) => {
      const next = [...prev];
      next[activeIndex] = item;
      return next;
    });
    closeModal();
  }

  function clearItem() {
    if (activeIndex === null) return;
    setSelectedItems((prev: Item[] | null[]) => {
      const next = [...prev];
      next[activeIndex] = null;
      return next;
    });
    closeModal();
  }

  return (
    <div className="flex flex-col gap-y-4 flex-2 items-center">
      <div className="flex flex-0">
        <div className="grid grid-cols-4 grid-rows-7 sm:gap-1 gap-0.5 place-items-center">
          {selectedItems.map((chosen: Item, idx: number) => (
            <Slot
              key={idx}
              item={chosen}
              index={idx}
              label={`${startValue + idx}`}
              onClick={openModal}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>

      <Search
        activeIndex={activeIndex}
        query={query}
        setQuery={setQuery}
        loading={loading}
        filtered={filtered}
        closeModal={closeModal}
        selectItem={selectItem}
        clearItem={clearItem}
        currentItem={activeIndex !== null ? selectedItems[activeIndex] : null}
      />
    </div>
  );
};

export default Grid;
