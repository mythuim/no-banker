import Equipment from "./components/Equipment";
import Inventory from "./components/Inventory";

export default function Home() {
  return (
    <main className="p-4">
      <div className="flex flex-row gap-4">
        {/* Inventory */}
        <Inventory />
        {/* Equipement */}
        <Equipment />
      </div>
    </main>
  );
}
