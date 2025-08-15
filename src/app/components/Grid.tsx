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
      <div className="flex items-center justify-between w-full border-b py-2 border-white/5">
        {title !== "Looting Bag" ? (
          <h2 className="text-kharid/75 text-sm font-bold">{title}</h2>
        ) : (
          <>
            <h2 className="text-kharid/75 text-sm font-bold">{title}</h2>
            <img
              alt="coins"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAgCAYAAAB6kdqOAAADfUlEQVR4Xu2XT4hPURTHf285i9/it3j1evXqt5qFxTSb346NhRULC1JKEkkiahI1hZpIUxNpIoRoakQTmsjkTyY0YVBSUkpKUlJSUhbHfN51evfd937v9x5vsnHrlpk5957POed7zn0ajf+r1uVJdv+z5cm1o35md4dywWsNIB8mChqxk8F223GUb18cQKXlyZfZSH4+78jH25E8mQhkaqwY6NPdKAPT3b7y8uTbowWgZwPyYSaUuYuBTB4pcuDJ5/tRfObVVCjTx30ZG2oV2Fdennx9sAA03y/vb4Xy8HwgF0aKHJiMcubFJZPN0d1F9pWWF5cpLtnTtry7Ecq9M4Gc3t/6rYc8sZoMsecnA7k86svhnc36gNAD0f54HMmb66HMnPDl5HCrQKwmCLaWd2R7UzpLagayNeEKNg3lxVpjU96JQ74c2NqUlcv6qgB1mxeJQCmbaoJ/45CMka3lHTv6BIiO1JJtXFUaKDs37GgViEzhgBIo0MsroRzb05Klg/lABMB92Oxa3ywDlIVJQ5mO+T5nALTD+N3baZMBOiitDy/uRuwp8c1xP24CylYKCH0QPZe4JbCB7A7D/vVVA8iMSesjAeK+O6eMjgCvBETEpBgHWgIFsjtsfF8rLiM/00UAbl7t6sOUjSCARnec09ZPM6SW0QgH0QOHqffaFcaBnSEyQvq5mCA4w5xBU0MbmlZWzb2qI2w4d+5gqbKZZ4GZQcRogoM71iVzIw9INaWipYs0CC2bziICJbMlgVimbNRd25pBpg7IoAu0bU1f7AzRohF+RxAD/UmpFYg7VdjDW0oBscwFOFCdaJbIEFm0gSiRChsdET1tbQPx978Csh3Q2jhVIDKI6MmGph57yozuugGphpjudO/eTX8AlOcAKH3pmby0MKXsZq+lrhXIHZTuwHTt84AIgkbhnJa6BJDpNJ2sONBZ48LoHGEuqebU3u2yPKASz4e5XPWAfigJqY2/Ehe+gVQ7pFyB7LZXe3VkAzGruJPOLfmeGX3ou0SHcVBB7Xa3P0MRuT4L2Gc/vkxJbSDO07k9gFj2Z0eyAbI/Q5lNyejvvfU50kaoANRoaKrtlOsbR+Z4HN2yqJ2rMxU+GlMgnhc6k4FaCih/ZaNOQMzfXRBb+GzKOnu2NqBs5rIXefH/RtAKjhmoafBeQS3KKnboBrTIMGbV5fAXtsBoIGhomLwAAAAASUVORK5CYII="
            />
          </>
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
