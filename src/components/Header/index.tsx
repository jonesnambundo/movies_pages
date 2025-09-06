import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

type LinkItem = {
  href: string;
  label: string;
};

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const mainLinks: LinkItem[] = [
    { href: "#", label: "Home" },
    { href: "#trending", label: "Trending" },
    { href: "#popular", label: "Popular" },
    { href: "#top-rate", label: "Top Rated" },
  ];

  const rightLinks: LinkItem[] = [
    { href: "/series", label: "Series" },
    { href: "/favoritos", label: "Favoritos" },
  ];

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
            {mainLinks.map((item) => (
              isHomePage ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-purple-400 transition-all font-medium"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={`/${item.href}`}
                  className="text-white hover:text-purple-400 transition-all font-medium"
                >
                  {item.label}
                </Link>
              )
            ))}
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
            {mainLinks.map((item) => (
              isHomePage ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-white hover:text-purple-400 transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={`/${item.href}`}
                  className="block text-white hover:text-purple-400 transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            ))}
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