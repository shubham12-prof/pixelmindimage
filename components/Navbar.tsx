"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/generate", label: "Generate" },
    { href: "/gallery", label: "Gallery" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div className="w-8 h-8 rounded-lg bg-neon-secondary flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-neon-soft" />
          </div>
          <span className="text-base font-medium text-gray-900 dark:text-gray-100">
            PixelMind
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
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

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full bg-neon-primary flex items-center justify-center text-xs transition-all duration-300 ${
                theme === "dark" ? "left-7" : "left-1"
              }`}
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </div>
          </button>

          {status === "loading" ? (
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
          ) : session ? (
            <div className="hidden md:flex items-center gap-2">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? "User"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <button
                className="hover:bg-neon-primary hover:text-neon-soft hidden md:block px-4 py-2 rounded-lg bg-neon-secondary text-neon-soft text-xs"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:block px-4 py-2 rounded-lg bg-neon-secondary text-neon-soft text-xs"
            >
              Sign in
            </Link>
          )}

          <button
            className="md:hidden text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              {link.label}
            </Link>
          ))}

          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-left"
            >
              Sign out
            </button>
          ) : (
            <Link href="/login" className="text-sm">
              Sign in
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
