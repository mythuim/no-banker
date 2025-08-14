import Equipment from "./components/Equipment";
import Inventory from "./components/Inventory";

export default function Home() {
  return (
    <main className="h-screen bg-ebony">
      <div className="flex flex-row gap-4 p-4">
        {/* Inventory */}
        <Inventory />
        {/* Equipement */}
        <Equipment />
      </div>
    </main>
  );
}
