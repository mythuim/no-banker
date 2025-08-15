"use client";

import { useEffect, useState } from "react";

import { Item } from "./types";
import { toUrlSafeBase64, fromUrlSafeBase64 } from "./utils";

import Equipment from "./components/Equipment";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Grid from "./components/Grid";

// Id's
function itemsToIds(items: (Item | null)[]): number[] {
  return items.map((item) => (item ? item.id : 0));
}

// Encode grids to string
function encodeIds(
  equipment: (Item | null)[],
  inventory: (Item | null)[],
  lootingBag: (Item | null)[]
) {
  const ids = [
    ...itemsToIds(equipment),
    ...itemsToIds(inventory),
    ...itemsToIds(lootingBag),
  ];

  // 2 bytes per ID
  const buffer = new ArrayBuffer(ids.length * 2);
  const view = new DataView(buffer);
  ids.forEach((id, i) => view.setUint16(i * 2, id, false)); // big-endian

  // Base64 encoderen
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return toUrlSafeBase64(btoa(binary));
}

// Decoding
function decodeIds(encoded: string) {
  const binary = atob(fromUrlSafeBase64(encoded));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

  const view = new DataView(bytes.buffer);
  const ids: number[] = [];
  for (let i = 0; i < bytes.length; i += 2) {
    ids.push(view.getUint16(i, false)); // big-endian
  }

  return {
    equipment: ids.slice(0, 11),
    inventory: ids.slice(11, 39),
    lootingBag: ids.slice(39),
  };
}

export default function Home() {
  const [showLootingBag, setShowLootingBag] = useState(false);
  const [inventory, setInventory] = useState<(Item | null)[]>(
    Array(28).fill(null)
  );
  const [lootingBag, setLootingBag] = useState<(Item | null)[]>(
    Array(28).fill(null)
  );
  const [equipment, setEquipment] = useState<(Item | null)[]>(
    Array(11).fill(null)
  );

  const handleLootingBag = () => {
    setShowLootingBag(!showLootingBag);
  };

  // Load items.json
  const [allItems, setAllItems] = useState<Record<number, Item>>({});
  useEffect(() => {
    fetch("/items.json")
      .then((res) => res.json())
      .then((data: Record<string, Item>) => {
        const map: Record<number, Item> = {};
        Object.values(data).forEach((it: any) => {
          map[it.id] = it;
        });
        setAllItems(map);
      });
  }, []);

  // Generate link
  const generateShareLink = () => {
    const encoded = encodeIds(equipment, inventory, lootingBag);
    const shareUrl = `${window.location.origin}${window.location.pathname}?b=${encoded}`;
    navigator.clipboard.writeText(shareUrl);
    alert("URL is on your clipboard!");
  };

  // Decode URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("b");
    if (code && Object.keys(allItems).length > 0) {
      const {
        equipment: eqIds,
        inventory: invIds,
        lootingBag: bagIds,
      } = decodeIds(code);

      setEquipment(eqIds.map((id) => (id ? allItems[id] || null : null)));
      setInventory(invIds.map((id) => (id ? allItems[id] || null : null)));
      setLootingBag(bagIds.map((id) => (id ? allItems[id] || null : null)));
    }
  }, [allItems]);

  return (
    <main className="min-h-screen bg-ebony">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex gap-x-4 justify-center">
        <div className="flex flex-col">
          <Equipment
            selectedItems={equipment}
            setSelectedItems={setEquipment}
          />
          <button
            onClick={generateShareLink}
            className="px-4 py-2 rounded-md text-sm mt-4 bg-kharid/50 text-white hover:bg-kharid transition-colors hover:cursor-pointer font-semibold"
          >
            Save & share
          </button>
        </div>
        <div className="flex-1">
          <Grid
            title="Inventory"
            onCheck={handleLootingBag}
            startValue={1}
            selectedItems={inventory}
            setSelectedItems={setInventory}
          />
          {showLootingBag && (
            <Grid
              title="Looting Bag"
              startValue={29}
              selectedItems={lootingBag}
              setSelectedItems={setLootingBag}
            />
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
