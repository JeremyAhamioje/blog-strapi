"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink { id: number; url: string; newTab: boolean; text: string; }

const ICON = {
  Home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Ideas: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Science: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg>,
  Technology: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  Engineering: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,
  Design: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.042a1.8 1.8 0 0 1 1.8-1.8h2.188c2.808 0 5.088-2.28 5.088-5.087C22 6.463 17.523 2 12 2z"/></svg>,
};

const DEFAULT_ICON = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;

function getIcon(text: string) {
  const key = Object.keys(ICON).find(k => text.toLowerCase().includes(k.toLowerCase()));
  return key ? ICON[key as keyof typeof ICON] : DEFAULT_ICON;
}

export default function Navbar({ links, logoUrl, logoText }: { links: Array<NavLink>; logoUrl: string | null; logoText: string | null; }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light"|"dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("sci-theme") as "light"|"dark"|null;
    if (saved) { setTheme(saved); document.documentElement.setAttribute("data-theme", saved); }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("sci-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const allLinks = [{ id: 0, url: "/", newTab: false, text: "Home" }, ...links];

  return (
    <>
      <div className={`sci-overlay${open ? " sci-overlay--open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`sci-drawer${open ? " sci-drawer--open" : ""}`}>
        <div className="sci-drawer__head">
          <div className="sci-drawer__logo">{logoText || "Polymath"}<em>.</em></div>
          <button className="sci-drawer__close" onClick={() => setOpen(false)}>✕</button>
        </div>
        <div className="sci-drawer__section">
          <span className="sci-drawer__label">Navigate</span>
          {allLinks.map(item => (
            <Link key={item.id} href={item.url} className="sci-drawer__item" onClick={() => setOpen(false)} target={item.newTab ? "_blank" : undefined}>
              {getIcon(item.text)}{item.text}
            </Link>
          ))}
        </div>
      </aside>

      <nav className="sci-nav">
        <div className="sci-nav__inner">
          <div className="sci-nav__left">
            <button className={`sci-hamburger${open ? " sci-hamburger--open" : ""}`} onClick={() => setOpen(!open)} aria-label="Menu">
              <span className="sci-hamburger__bar"/><span className="sci-hamburger__bar"/><span className="sci-hamburger__bar"/>
            </button>
            <Link href="/" className="sci-nav__logo">{logoText || "Modern Polymath"}<em>.</em></Link>
          </div>
          <div className="sci-nav__right">
            <button className="sci-icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "light" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              )}
            </button>
            <button className="sci-icon-btn" aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
