"use client";

import { useEffect, useMemo, useState } from "react";
import Slot from "./Slot";
import Search from "./Search";
import { Item } from "../types";

const EQUIPMENT_SLOTS = [
  "Head",
  "Cape",
  "Neck",
  "Ammo",
  "Weapon",
  "Body",
  "Shield",
  "Leg",
  "Hand",
  "Feet",
  "Ring",
];

const Equipment = (props: any) => {
  const { selectedItems, setSelectedItems } = props;
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
    <div className="flex flex-col gap-y-4 flex-none items-center">
      <div className="flex items-center justify-between w-full border-b py-2 border-white/5">
        <h2 className="text-kharid/75 text-sm font-bold ">Equipment</h2>
        <img
          alt="Looting Bag"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAgCAYAAAB6kdqOAAACrklEQVR4Xu2V70tTYRTH97y8L/ZiLwbjwmCMMUREhiijMdmYNOZQmaIuWMawUrL8ESwzy8woQ6MMYWCaaTCiKOhP/MY5t2f3uc9+NNPtTfvCl3HHPWef53vO3XW5uurq/5FAfTeTfm8rNS1JwPQaDocDXvSFfE1+QCBgeth6beOaliQQ7fWgN+hGyDSqjg8EuXEkEGDrVZZqD3IJKCveSNjDQBJKtQTSKy0JTlE9BLkWqiUwgcKwgbFBwwFEpmvpkWvhBg0Fj1MFkYdQwfxeF8Kmq0EPhwSKSQOTUQtIQsUjXgcceTrdX6ehwECv6QCiHmq6/QEX++9jZwncSxuYjTmBJJQ0XSeGQmw7fhtGJkKferrxHheGQjaQTlBHVko0NgmSjvqQGrSspkVAtORkglHHJWH0mkzEQKrvgkBrY27cGTGqMNm4iVzC5E81JT6xAqTuDJnuoxoy9ZHr0OK4VAmUcm4GU0eymI9xYx1K3xMyfZcZ7nHUL4+6+aG5QDqq/jz+1ZMI3C/EOSkJJceg7ogKGO331/T4h3Rs1RYKTKf8PAJ9N3Qg+YjradT2vJQsoEZQEozSUWGuEECXnZB88uQ+SRD1D1BPpw0SNckUZmZwPZlEPBqt+95qO9DxwQE+7O7izfMtbJVKWJqfx2wuh8lsFmPpNMMNRSIIBe2XsN7lCiXw9eQYp4eHKO/v4e3LHTx5uIbFYhG3bxYwl8/jxtQUpsfHMTGa6QQQSeD751N8KZdx9P4dJ/V4dQWPlh9gZWGBE7t7a64TC00S2F+a4JH9PD9H5eMRJ/X62VO82tzE9vo6p5OIxTqXDgFRKnsvthmERkbJkGlktEe0Qz6P/JdvuwR+VSqc0I+zMx7ft08nDEhwNL6djY1OjUzKfj81cgdhLMkfbGa9pquuOqnfUARo2dF/fxcAAAAASUVORK5CYII="
        />
      </div>
      <div className="flex flex-0">
        <div className="grid grid-cols-3 sm:gap-1 gap-0.5 place-items-center">
          {/* Row 1 */}
          <div className="col-span-3 flex justify-center">
            <Slot
              item={selectedItems[0]}
              index={0}
              onClick={openModal}
              label={EQUIPMENT_SLOTS[0]}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
            />
          </div>

          {/* Row 2 */}
          <Slot
            item={selectedItems[1]}
            index={1}
            onClick={openModal}
            label={EQUIPMENT_SLOTS[1]}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
          <Slot
            item={selectedItems[2]}
            index={2}
            onClick={openModal}
            label={EQUIPMENT_SLOTS[2]}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
          <Slot
            item={selectedItems[3]}
            index={3}
            onClick={openModal}
            label={EQUIPMENT_SLOTS[3]}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />

          {/* Row 3 */}
          <Slot
            item={selectedItems[4]}
            index={4}
            onClick={openModal}
            label={EQUIPMENT_SLOTS[4]}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
          <Slot
            item={selectedItems[5]}
            index={5}
            onClick={openModal}
            label={EQUIPMENT_SLOTS[5]}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
          <Slot
            item={selectedItems[6]}
            index={6}
            onClick={openModal}
            label={EQUIPMENT_SLOTS[6]}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />

          {/* Row 4 */}
          <div className="col-span-3 flex justify-center">
            <Slot
              item={selectedItems[7]}
              index={7}
              onClick={openModal}
              label={EQUIPMENT_SLOTS[7]}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
            />
          </div>

          {/* Row 5 */}
          <Slot
            item={selectedItems[8]}
            index={8}
            onClick={openModal}
            label={EQUIPMENT_SLOTS[8]}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
          <Slot
            item={selectedItems[9]}
            index={9}
            onClick={openModal}
            label={EQUIPMENT_SLOTS[9]}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
          <Slot
            item={selectedItems[10]}
            index={10}
            onClick={openModal}
            label={EQUIPMENT_SLOTS[10]}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
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

export default Equipment;
