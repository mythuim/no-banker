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
        {title !== "Looting Bag" ? (
          <h2 className="text-kharid/75 text-sm font-bold">{title}</h2>
        ) : (
          <>
            <h2 className="text-kharid/75 text-sm font-bold">{title}</h2>
            <img
              alt="Skull"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAgCAYAAAB6kdqOAAADoUlEQVR4XsWX7S+WYRjGXX9AH3yw9dH60JoPZk2zjM1YzcwsVmYmawpbmqQklSbRVIqJXpiiNCZjLORlJBKekJL0wvSh9Wec3cf5OG+Xuxeb+745t3Pjeey5f87rOI7zenx8bJWitd72UtTRcN7sbQZTNNR+lbu3+TJ1NubTk+psqig+poFtGZwiz0AVjXWV0khHMQ20XqHupovU/OAM3b+ZQTcKj1Jm6kEKC9njNpT3v54eukdT/RU00XuLxruvm1N6XneWasszqbwolQpzjzDU/uDdbkEpmp9oobnRxzT7qo6hMKW3PWXmlKCjR5VZfGxF5xIp+0QMpRwOp+DAXU5DKfrsaaeFyVaaH39Gc2ONNDtSz1CTfbf56AbbiqjraQHrqLIkja7lJ1FORiylJkZQ7IG9FBjg7xSUou9zL+nr7AtanO6ghak276QMqJnhh3x0ODZMCccGHdWUpVNpQTLlZR2itORIioveZx5dkD/ANl2Klj72m/3tfQ99meliqA9vmnhK7warWUuvO0v42ERHEPaF7HhKT4mihJgQU+C2gTAda2NSoicRuIhb19GlnAQWdmJcKEWEBjgDhKmgcWRoTAh6EiA5NogbUxId3S09bgo7KT6MosIDnQECACaCBgiLGzoyxK0L26oj5BF0BGHDadGRQc4ALX8a4obD2GXGZNCsIcP+oiE4DUfW11K4TkcibDjNMSA/X1+zAQKHicuQRVagtvo81hECEjoSp+3022HX+opWFobXAUlLOOr6QRbJXmuoOsV5hMQWp0kW2ZjSv4Gkdf3IToPTmmpO8/sCBKfZFLZiV/0PCBDW1/RGQEJDVhhbQCLq5fmBdQ+DmKEVK4TecJnV8puEQa0CGSBoJDVCUTIJeQNrWyGkoR9YXre7DRiU4uwBBCakw0AzeCiCD1OAvZHMCENA1t05ydpxEEbKm9QCBBiEoUxBHg5HQcQttbn8O+yOleEwjNTaggWQfizQECwOZwmMLFWXYFCKfq3MsI6wRrAyEIgIQ7gMMEhmgZFktmHvjcoLJJpCQiOdEYRybRUY/A1c5eJ0UKsTMnSEnzdq3BBdnA5K0c/lae+CNbY8rhxWiL/BuAu05OHE1vWDRYoswlaH/aEbrAiXpyNl7LTFEb52yPcxbHXce5A/cBUuYrrVrZ/gcCn6sTjK9yEsU3GXZA6+YQjUFgGhFGsI1w1sdeQO7jxYoLqOXNaPtf4Usg6xxTDesj7cDYjfnWGv06P557YAAAAASUVORK5CYII="
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
