"use client";

import { useState } from "react";
import Equipment from "./components/Equipment";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Grid from "./components/Grid";

export default function Home() {
  const [showLootingBag, setShowLootingBag] = useState(false);

  const handleLootingBag = () => {
    setShowLootingBag(!showLootingBag);
  };

  return (
    <main className="min-h-screen bg-ebony">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex gap-x-4 justify-center">
        <div className="flex-1">
          <Grid title="Inventory" onCheck={handleLootingBag} startValue={1} />
          {showLootingBag && <Grid title="Looting Bag" startValue={29} />}
        </div>
        <Equipment />
      </div>
      <Footer />
    </main>
  );
}
