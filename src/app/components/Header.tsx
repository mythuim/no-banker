const Header = () => {
  return (
    <header className="border-b border-white/5 mb-2">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4"
      >
        <a
          href="/"
          className="-m-1.5 p-1.5 flex items-center text-white/50 hover:text-white transition-colors font-bold"
        >
          NoBanker
        </a>
        <a
          href="https://wiseoldman.net/players/Mythuim"
          target="_blank"
          className="font-bold text-xs text-kharid/75 hover:text-kharid transition-colors flex flex-1 justify-center"
        >
          Mythuim
        </a>
        <a
          href="https://github.com/mythuim/no-banker"
          target="_blank"
          className="text-xs font-semibold text-white/50 hover:text-white transition-colors"
        >
          GitHub <span aria-hidden="true">&rarr;</span>
        </a>
      </nav>
    </header>
  );
};

export default Header;
