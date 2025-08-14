import Equipment from "./components/Equipment";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Inventory from "./components/Inventory";

export default function Home() {
  return (
    <main className="h-screen bg-ebony">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex gap-x-4">
        <Inventory />
        <Equipment />
      </div>
      <Footer />
    </main>
  );
}
