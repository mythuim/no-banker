"use client";

import { useEffect, useState } from "react";

import { Item } from "./types";
import { toUrlSafeBase64, fromUrlSafeBase64 } from "./utils";

import Equipment from "./components/Equipment";
import Footer from "./components/Footer";
import Grid from "./components/Grid";

// Id's
function itemsToIds(items: (Item | null)[]): number[] {
  return items.map((item) => (item ? item.id : 0));
}

// Encode grids to string
function encodeIds(
  deathPile: (Item | null)[],
  inventory: (Item | null)[],
  lootingBag: (Item | null)[],
  equipment: (Item | null)[]
) {
  const ids = [
    ...itemsToIds(deathPile),
    ...itemsToIds(inventory),
    ...itemsToIds(lootingBag),
    ...itemsToIds(equipment),
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
    lootingBag: ids.slice(39, 67),
    deathPile: ids.slice(67),
  };
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [setupName, setSetupName] = useState("");
  const [inventory, setInventory] = useState<(Item | null)[]>(
    Array(28).fill(null)
  );
  const [lootingBag, setLootingBag] = useState<(Item | null)[]>(
    Array(28).fill(null)
  );
  const [equipment, setEquipment] = useState<(Item | null)[]>(
    Array(11).fill(null)
  );
  const [deathPile, setDeathPile] = useState<(Item | null)[]>(
    Array(28).fill(null)
  );
  const [activeTab, setActiveTab] = useState("inventory");

  const tabs = [
    {
      name: "Inventory",
      id: "inventory",
      img: "https://oldschool.runescape.wiki/images/Inventory.png?d4795",
    },
    {
      name: "Looting Bag",
      id: "lootingBag",
      img: "https://oldschool.runescape.wiki/images/Looting_bag_%28open%29.png?6dc61",
    },
    {
      name: "Death Pile",
      id: "deathPile",
      img: "https://oldschool.runescape.wiki/images/Skull_%28status%29_icon.png?fa6d8",
    },
  ];

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
        deathPile: dpIds,
      } = decodeIds(code);

      setEquipment(eqIds.map((id) => (id ? allItems[id] || null : null)));
      setInventory(invIds.map((id) => (id ? allItems[id] || null : null)));
      setLootingBag(bagIds.map((id) => (id ? allItems[id] || null : null)));
      setDeathPile(dpIds.map((id) => (id ? allItems[id] || null : null)));
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
          setDeathPile(
            data.deathPile.map((id: number) =>
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
          setDeathPile(Array(28).fill(null));
        }
      } else {
        setEquipment(Array(11).fill(null));
        setInventory(Array(28).fill(null));
        setLootingBag(Array(28).fill(null));
        setDeathPile(Array(28).fill(null));
      }
    }
    setLoaded(true);
  }, [allItems]);

  // Save to localStorage
  useEffect(() => {
    if (Object.keys(allItems).length === 0) return; // wacht tot items.json geladen is
    if (
      !equipment.length ||
      !inventory.length ||
      !lootingBag.length ||
      !deathPile.length
    )
      return;

    const data = {
      equipment: itemsToIds(equipment),
      inventory: itemsToIds(inventory),
      lootingBag: itemsToIds(lootingBag),
      deathPile: itemsToIds(deathPile),
      setupName,
    };
    localStorage.setItem("setup", JSON.stringify(data));
  }, [equipment, inventory, lootingBag, deathPile, setupName, allItems]);

  // Generate link
  const generateShareLink = () => {
    if (!equipment || !inventory || !lootingBag) return;
    const encoded = encodeIds(equipment, inventory, lootingBag, deathPile);
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
    setDeathPile(Array(28).fill(null));
    setSetupName("");
  };

  return (
    <main className="min-h-screen bg-ebony">
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
              className="rounded-md px-3 py-2 border text-[10px] leading-tight font-bold mt-4 focus:outline-none focus:ring-2 focus:ring-kharid text-center"
              style={{
                backgroundColor: "var(--color-cacao)",
                borderColor: "var(--color-sable)",
                color: "var(--color-white)",
              }}
            />
            <div className="flex items-center gap-x-2">
              {/* Share */}
              <button
                disabled={!setupName.trim()}
                onClick={generateShareLink}
                className="flex flex-1 items-center justify-center px-4 py-2 rounded-md text-xs mt-2 bg-green-500/50 text-white hover:bg-green-600 transition-colors hover:cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Share
              </button>
              {/* Clear */}
              <button
                onClick={clearSetup}
                className="flex flex-0 px-4 py-2 rounded-md text-xs mt-2 bg-red-500/50 text-white hover:bg-red-600 transition-colors hover:cursor-pointer font-semibold"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4 py-4">
          <div className="border-b border-white/5">
            <nav className=" flex sm:space-x-6 space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={classNames(
                    activeTab === tab.id
                      ? "border-khard text-kharid"
                      : "border-transparent text-kharid/50 hover:border-kharid hover:text-kharid transition-colors",
                    "border-b-2 px-1 pb-2 sm:text-sm text-xs font-semibold whitespace-nowrap hover:cursor-pointer flex items-center gap-x-2"
                  )}
                >
                  <img alt={tab.name} className="w-6 h-6" src={tab.img} />
                  <p className="hidden sm:block">{tab.name}</p>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1">
            {activeTab === "inventory" && inventory && (
              <Grid
                startValue={1}
                selectedItems={inventory}
                setSelectedItems={setInventory}
              />
            )}
            {activeTab === "lootingBag" && lootingBag && (
              <Grid
                startValue={29}
                selectedItems={lootingBag}
                setSelectedItems={setLootingBag}
              />
            )}
            {activeTab === "deathPile" && deathPile && (
              <Grid
                startValue={57}
                selectedItems={deathPile}
                setSelectedItems={setDeathPile}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
