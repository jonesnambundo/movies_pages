import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

type LinkItem = {
  href: string;   // pode ser "#trending" ou "#tv-trending"
  label: string;
};

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isSeriesPage = location.pathname.startsWith("/series");

  // Mapeia âncoras corretas por rota
  const mainLinks: LinkItem[] = useMemo(() => {
    if (isHomePage) {
      return [
        { href: "#", label: "Home" },
        { href: "#trending", label: "Trending" },
        { href: "#popular", label: "Popular" },
        { href: "#top-rated", label: "Top Rated" },
      ];
    }
    if (isSeriesPage) {
      return [
        { href: "/", label: "Home" },          // volta ao topo de /series
        { href: "#tv-trending", label: "Trending" }, // âncoras da página de séries
        { href: "#tv-popular", label: "Popular" },
        { href: "#tv-top-rated", label: "Top Rated" },
      ];
    }
    // Em outras rotas, mandamos para Home com hashes da Home
    return [
      { href: "/#trending", label: "Trending" },
      { href: "/#popular", label: "Popular" },
      { href: "/#top-rated", label: "Top Rated" },
    ];
  }, [isHomePage, isSeriesPage]);

  const rightLinks: LinkItem[] = [
    { href: "/series", label: "Series" },
    { href: "/favoritos", label: "Favoritos" },
  ];

  // Render helper: decide entre <a> (âncora na mesma página) e <Link> (navegação de rota)
  const renderMainLink = (item: LinkItem) => {
    const isHashOnly = item.href.startsWith("#");
    const isAbsoluteToSeries = item.href === "/series"; 
    const isHomeHash = item.href.startsWith("/#");      

    if (isHashOnly) {
      return (
        <a
          key={item.href + item.label}
          href={item.href}
          className="text-white hover:text-purple-400 transition-all font-medium"
        >
          {item.label}
        </a>
      );
    }

    if (isAbsoluteToSeries || isHomeHash) {
      return (
        <Link
          key={item.href + item.label}
          to={item.href}
          className="text-white hover:text-purple-400 transition-all font-medium"
        >
          {item.label}
        </Link>
      );
    }

    if (item.href === "#") {
      return (
        <a
          key={item.href + item.label}
          href="#"
          className="text-white hover:text-purple-400 transition-all font-medium"
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link
        key={item.href + item.label}
        to={item.href}
        className="text-white hover:text-purple-400 transition-all font-medium"
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-neutral-900/60 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-purple-500 font-bold text-3xl">
              Movie<span className="text-white">Art</span>
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {mainLinks.map(renderMainLink)}
          </nav>

          <nav className="hidden md:flex space-x-8">
            {rightLinks.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-white hover:text-purple-400 transition-all font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/60"
            aria-label="Abrir menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {isOpen && (
          <div className="mt-4 pb-4 space-y-2 md:hidden">
            {mainLinks.map((item) => {
              const isHashOnly = item.href.startsWith("#");
              const Comp = isHashOnly ? "a" as const : Link;
              const commonProps = {
                className: "block text-white hover:text-purple-400 transition-colors py-2",
                onClick: () => setIsOpen(false),
              };
              return isHashOnly ? (
                <a key={item.href + item.label} href={item.href} {...commonProps}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.href + item.label} to={item.href} {...commonProps}>
                  {item.label}
                </Link>
              );
            })}
            {rightLinks.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block text-white hover:text-purple-400 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
