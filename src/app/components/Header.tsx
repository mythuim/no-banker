const Header = () => {
  return (
    <header className="py-2">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">NoBanker</span>
            <img alt="" src="favicon.ico" className="h-8 w-auto dark:hidden" />
            <img
              alt="NoBanker"
              src="/uim.ico"
              className="h-8 w-auto not-dark:hidden"
            />
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          <a
            href="https://github.com/mythuim/no-banker"
            className="text-sm/6 font-semibold text-white/50 hover:text-white transition-colors"
          >
            GitHub <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
