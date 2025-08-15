"use client";

import { useEffect, useMemo, useState } from "react";
import Slot from "./Slot";
import Search from "./Search";
import { Item } from "../types";
import Check from "./Check";

const Grid = (props: any) => {
  const { title, onCheck, startValue, selectedItems, setSelectedItems } = props;
  const [allItems, setAllItems] = useState<Item[]>([]);
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
      <div className="flex items-center justify-between w-full border-b py-2 border-white/5">
        {title !== "Looting Bag" && (
          <h2 className="text-kharid/75 text-sm font-bold ">{title}</h2>
        )}
        {onCheck && (
          <div className="flex items-center text-xs text-white/50 font-semibold gap-x-2">
            <img
              alt="Looting Bag"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAgCAYAAAB6kdqOAAACh0lEQVR4Xs2W3UsbQRTFM4998KEPQhEKUqQEEQnSIJGVhITIVpJgJKbBNGKjaagGDVof+7ff9sxwJ5Prmp3VjPXCgbBkdn577sdMLpc5FMkn/zEU1eKYDFSagoei416PCsUibRd2rDa3tqw+5/NWrwClqNnpZAIqrK+HglJ01O1S3GzRwWEjUa8OdNhuayAWIFBP+9Uq7ZXLWvjNYHAvYNoUfRsMdA0hbYADUKVe1yC7UaRTCX0plbTwLLhL0Em/r9PHjsElAHBtwZ1PGxv08R/Ih7W1kC7lcuZrDRi7BYeSgPh/WBPQJYSiPye39HA0pmnjQqdGArkgwWHumyMaVrvUi1p0vPuVGjtVigtlqmyWKMoX55yRq5ccSjsCiOv4jL7vt+eAatvRnALWjvliuIKNuHZkl3HaAtaOefHlZEKjWo9axbqGcmF4Brk1hDnEa+UbXxCKru/u6Xw8tulBagDDrZ7kjjut8WxJUIp+3txoGBQw3OnuNXS6eEIvcgcwmEGQ2/5yF88wKQIM2prdQbrQRXxcSHdcGHcosnhqy91SQtGv6ZSGV1cW5qzSsTA+7rgw71dXHykDlKLJ7webKgnjHhM+7kgQF8iz8+aB+sMLC+Mepu7pLqdzmjtQhrPNdBXqZ3A5otPzH/YQ5c5y0/WUO4tgMrpk6oeB+KohT3V53fCtnWe4NCtopCvp7pOUrqzuQOxQikuz2QMgpEsCPZWuLO64QJIgIZQG4vp5E0BcP28GiOvH7bBFQL7t/kwghLnM+7a8BFoEZTrLq6BlmIUA47Z3uywNyIV6t7LyCCQjjAmziE9pc6HnWcRQ3PYMxGKopYDImL1oBuerpYIkhbuBr+Q7fOIvM+DUu4tT3nIAAAAASUVORK5CYII="
            />
            <Check onCheck={onCheck} />
          </div>
        )}
      </div>
      <div className="flex flex-0">
        <div className="grid grid-cols-4 grid-rows-7 sm:gap-1 gap-0.5 place-items-center">
          {selectedItems.map((chosen: Item, idx: number) => (
            <Slot
              key={idx}
              item={chosen}
              index={idx}
              label={`${startValue + idx}`}
              onClick={openModal}
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
