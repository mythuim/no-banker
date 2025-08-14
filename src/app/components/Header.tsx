const Header = () => {
  return (
    <header className="">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4"
      >
        <div className="flex">
          <a
            href="/"
            className="-m-1.5 p-1.5 flex items-center text-white/50 hover:text-white transition-colors font-bold"
          >
            NoBanker
            <img alt="NoBanker" src="/uim.ico" className="h-8 w-auto" />
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          <a
            href="https://github.com/mythuim/no-banker"
            target="_blank"
            className="text-xs font-semibold text-white/50 hover:text-white transition-colors"
          >
            GitHub <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
