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

const Equipment = () => {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<(Item | null)[]>(
    Array(EQUIPMENT_SLOTS.length).fill(null)
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

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
    setSelectedItems((prev) => {
      const next = [...prev];
      next[activeIndex] = item;
      return next;
    });
    closeModal();
  }

  function clearItem() {
    if (activeIndex === null) return;
    setSelectedItems((prev) => {
      const next = [...prev];
      next[activeIndex] = null;
      return next;
    });
    closeModal();
  }

  return (
    <div className="flex flex-col gap-y-4 flex-none items-center">
      <h2 className="text-kharid text-sm font-bold border-b pb-1.5 border-white/5 w-full">
        Equipment
      </h2>
      <div className="flex flex-0">
        <div className="grid grid-cols-3 sm:gap-1 gap-0.5 place-items-center">
          {/* Row 1 */}
          <div className="col-span-3 flex justify-center">
            <Slot
              item={selectedItems[0]}
              index={0}
              onClick={openModal}
              label={EQUIPMENT_SLOTS[0]}
            />
          </div>

          {/* Row 2 */}
          <Slot
            item={selectedItems[1]}
            index={1}
            onClick={openModal}
            label={EQUIPMENT_SLOTS[1]}
          />
          <Slot
            item={selectedItems[2]}
            index={2}
            onClick={openModal}
            label={EQUIPMENT_SLOTS[2]}
          />
          <Slot
            item={selectedItems[3]}
            index={3}
            onClick={openModal}
            label={EQUIPMENT_SLOTS[3]}
          />

          {/* Row 3 */}
          <Slot
            item={selectedItems[4]}
            index={4}
            onClick={openModal}
            label={EQUIPMENT_SLOTS[4]}
          />
          <Slot
            item={selectedItems[5]}
            index={5}
            onClick={openModal}
            label={EQUIPMENT_SLOTS[5]}
          />
          <Slot
            item={selectedItems[6]}
            index={6}
            onClick={openModal}
            label={EQUIPMENT_SLOTS[6]}
          />

          {/* Row 4 */}
          <div className="col-span-3 flex justify-center">
            <Slot
              item={selectedItems[7]}
              index={7}
              onClick={openModal}
              label={EQUIPMENT_SLOTS[7]}
            />
          </div>

          {/* Row 5 */}
          <Slot
            item={selectedItems[8]}
            index={8}
            onClick={openModal}
            label={EQUIPMENT_SLOTS[8]}
          />
          <Slot
            item={selectedItems[9]}
            index={9}
            onClick={openModal}
            label={EQUIPMENT_SLOTS[9]}
          />
          <Slot
            item={selectedItems[10]}
            index={10}
            onClick={openModal}
            label={EQUIPMENT_SLOTS[10]}
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
