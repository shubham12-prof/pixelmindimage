"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { href: "/", label: "Home" },
    { href: "/generate", label: "Generate" },
    { href: "/gallery", label: "Gallery" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <Link href="/" className="flex items-center gap-2 no-underline">
        <div className="w-8 h-8 rounded-lg bg-neon-secondary flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-neon-soft" />
        </div>
        <span className="text-base font-medium text-gray-900 dark:text-gray-100">
          PixelMind
        </span>
      </Link>

      <div className="flex items-center gap-6">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm pb-0.5 no-underline transition-colors duration-200 border-b-2 ${
                isActive
                  ? "text-neon-primary border-neon-primary"
                  : "text-gray-500 dark:text-gray-400 border-transparent hover:text-neon-primary"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="relative w-14 h-7 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer transition-colors duration-300"
      >
        <div
          className={`absolute top-1 w-5 h-5 rounded-full bg-neon-primary flex items-center justify-center text-xs transition-all duration-300 ${
            theme === "dark" ? "left-7" : "left-1"
          }`}
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </div>
      </button>
    </nav>
  );
}
