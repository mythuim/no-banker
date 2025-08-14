const socials = [
  {
    name: "X",
    href: "https://x.com/mythuim",
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
      </svg>
    ),
  },
  {
    name: "Reddit",
    href: "https://www.reddit.com/user/mythuim/",
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 48 48" {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 26.982422 4 A 1.50015 1.50015 0 0 0 25.53125 5.1933594 L 23.273438 16.027344 C 18.375528 16.16441 13.950546 17.65392 10.683594 20.021484 C 9.7845938 19.380484 8.688 19 7.5 19 C 4.462 19 2 21.462 2 24.5 C 2 26.652 3.2380625 28.511062 5.0390625 29.414062 C 5.0280625 29.610062 5 29.802 5 30 C 5 37.732 13.507 44 24 44 C 34.493 44 43 37.732 43 30 C 43 29.802 42.971938 29.610062 42.960938 29.414062 C 44.761938 28.511062 46 26.652 46 24.5 C 46 21.462 43.538 19 40.5 19 C 39.312 19 38.215406 19.380484 37.316406 20.021484 C 34.407598 17.913468 30.58056 16.499109 26.320312 16.115234 L 28.167969 7.25 L 34.126953 8.3847656 C 34.521571 9.885206 35.877358 11 37.5 11 C 39.43 11 41 9.43 41 7.5 C 41 5.57 39.43 4 37.5 4 C 36.343507 4 35.323173 4.5703812 34.685547 5.4375 L 27.28125 4.0273438 A 1.50015 1.50015 0 0 0 26.982422 4 z M 16.5 24 C 18.433 24 20 25.567 20 27.5 C 20 29.433 18.433 31 16.5 31 C 14.567 31 13 29.433 13 27.5 C 13 25.567 14.567 24 16.5 24 z M 31.5 24 C 33.433 24 35 25.567 35 27.5 C 35 29.433 33.433 31 31.5 31 C 29.567 31 28 29.433 28 27.5 C 28 25.567 29.567 24 31.5 24 z M 17.5 34 C 17.88375 34 18.267547 34.146453 18.560547 34.439453 C 18.613547 34.488453 20.262047 36 23.998047 36 C 27.771047 36 29.4225 34.455453 29.4375 34.439453 C 30.0235 33.853453 30.972594 33.853453 31.558594 34.439453 C 32.144594 35.025453 32.145547 35.975547 31.560547 36.560547 C 31.310547 36.810547 28.978 38.998047 24 38.998047 C 19.022 38.998047 16.689453 36.810547 16.439453 36.560547 C 15.853453 35.975547 15.853453 35.025453 16.439453 34.439453 C 16.732453 34.146453 17.11625 34 17.5 34 z"
        ></path>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@mythuim",
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Twitch",
    href: "https://www.twitch.tv/mythuim",
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 32 32" {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 6 4 L 4 8 L 4 24 L 9 24 L 9 27 L 13 27 L 16 24 L 20 24 L 26 18 L 26 4 L 6 4 z M 8 6 L 24 6 L 24 17 L 21 20 L 15 20 L 12 23 L 12 20 L 8 20 L 8 6 z M 13 9 L 13 16 L 15 16 L 15 9 L 13 9 z M 17 9 L 17 16 L 19 16 L 19 9 L 17 9 z"
        ></path>
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-t border-white/5 pt-4 mt-8 flex justify-between items-center pb-4">
        <a
          className="text-xs text-white/50 hover:text-white font-semibold transition-colors"
          href="https://buymeacoffee.com/mythuim"
          target="_blank"
        >
          Buy Me a Coffee
        </a>
        <div className="flex gap-x-3 items-center">
          {socials.map((item: any) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              className="text-kharid/50 hover:text-kharid transition-colors"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
