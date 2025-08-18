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
  const [setupName, setSetupName] = useState("");
  const [inventory, setInventory] = useState<(Item | null)[] | null>(null);
  const [lootingBag, setLootingBag] = useState<(Item | null)[] | null>(null);
  const [equipment, setEquipment] = useState<(Item | null)[] | null>(null);

  const handleLootingBag = () => {
    setShowLootingBag(!showLootingBag);
  };

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

  // Load from URL or localStorage once items are ready
  useEffect(() => {
    if (Object.keys(allItems).length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("b");
    const name = params.get("name");

    if (code) {
      const {
        equipment: eqIds,
        inventory: invIds,
        lootingBag: bagIds,
      } = decodeIds(code);

      setEquipment(eqIds.map((id) => (id ? allItems[id] || null : null)));
      setInventory(invIds.map((id) => (id ? allItems[id] || null : null)));
      setLootingBag(bagIds.map((id) => (id ? allItems[id] || null : null)));
      if (name) setSetupName(name);
    } else {
      const saved = localStorage.getItem("setup");
      if (saved) {
        try {
          const data = JSON.parse(saved);
          setEquipment(
            data.equipment.map((id: number) =>
              id ? allItems[id] || null : null
            )
          );
          setInventory(
            data.inventory.map((id: number) =>
              id ? allItems[id] || null : null
            )
          );
          setLootingBag(
            data.lootingBag.map((id: number) =>
              id ? allItems[id] || null : null
            )
          );
          if (data.setupName) setSetupName(data.setupName);
        } catch {
          console.warn("Corrupt localStorage data, cleared.");
          localStorage.removeItem("setup");
          setEquipment(Array(11).fill(null));
          setInventory(Array(28).fill(null));
          setLootingBag(Array(28).fill(null));
        }
      } else {
        setEquipment(Array(11).fill(null));
        setInventory(Array(28).fill(null));
        setLootingBag(Array(28).fill(null));
      }
    }
  }, [allItems]);

  // Save to localStorage
  useEffect(() => {
    if (!equipment || !inventory || !lootingBag) return;
    const data = {
      equipment: itemsToIds(equipment),
      inventory: itemsToIds(inventory),
      lootingBag: itemsToIds(lootingBag),
      setupName,
    };
    localStorage.setItem("setup", JSON.stringify(data));
  }, [equipment, inventory, lootingBag, setupName]);

  // Generate link
  const generateShareLink = () => {
    if (!equipment || !inventory || !lootingBag) return;
    const encoded = encodeIds(equipment, inventory, lootingBag);
    const params = new URLSearchParams();
    params.set("b", encoded);
    if (setupName.trim() !== "") {
      params.set("name", setupName.trim());
    }

    const shareUrl = `${window.location.origin}${
      window.location.pathname
    }?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl);
    alert("URL is on your clipboard!");
  };

  const clearSetup = () => {
    localStorage.removeItem("setup");
    setEquipment(Array(11).fill(null));
    setInventory(Array(28).fill(null));
    setLootingBag(Array(28).fill(null));
    setSetupName("");
  };

  return (
    <main className="min-h-screen bg-ebony">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex gap-x-4 justify-center">
        <div className="flex flex-col">
          {equipment && (
            <Equipment
              selectedItems={equipment}
              setSelectedItems={setEquipment}
            />
          )}
          <div className="flex flex-col w-38">
            <input
              type="text"
              value={setupName}
              onChange={(e) => setSetupName(e.target.value)}
              placeholder="Enter a name"
              autoFocus
              className="rounded-md px-3 py-2 border text-[10px] text-center leading-tight font-bold mt-4 focus:outline-none focus:ring-2 focus:ring-kharid text-center"
              style={{
                backgroundColor: "var(--color-cacao)",
                borderColor: "var(--color-sable)",
                color: "var(--color-white)",
              }}
            />
            <div className="flex items-center gap-x-2">
              <button
                disabled={!setupName.trim()}
                onClick={generateShareLink}
                className="flex flex-1 items-center justify-center px-4 py-2 rounded-md text-xs mt-2 bg-green-500/50 text-white hover:bg-green-600 transition-colors hover:cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Share
              </button>
              <button
                onClick={clearSetup}
                className="flex flex-0 px-4 py-2 rounded-md text-xs mt-2 bg-red-500/50 text-white hover:bg-red-600 transition-colors hover:cursor-pointer font-semibold"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col lg:flex-row gap-4">
          {inventory && (
            <Grid
              title="Inventory"
              onCheck={handleLootingBag}
              startValue={1}
              selectedItems={inventory}
              setSelectedItems={setInventory}
            />
          )}
          {showLootingBag && lootingBag && (
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
