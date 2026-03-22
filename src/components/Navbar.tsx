"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import Image from "next/image";

const langs: Record<string, string> = { fr: "FR", en: "EN", ar: "AR" };

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const isRtl = locale === "ar";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (langOpen) {
      const close = () => setLangOpen(false);
      document.addEventListener("click", close);
      return () => document.removeEventListener("click", close);
    }
  }, [langOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const switchLocale = (loc: string) => {
    const parts = pathname.split("/");
    parts[1] = loc;
    router.push(parts.join("/"));
    setLangOpen(false);
  };

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/a-propos`, label: t("about") },
    { href: `/${locale}/services`, label: t("services") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
      scrolled
        ? "bg-black/90 backdrop-blur-xl border-b border-white/[0.06]"
        : "bg-transparent border-b border-transparent"
    }`}>
      <div className="container flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex-shrink-0 group">
          <Image src="/main_logo.png" alt="NASMO" width={100} height={24}
            className="h-5 w-auto transition-opacity group-hover:opacity-80" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href}
                className={`relative py-2 text-[.8125rem] font-medium uppercase tracking-[.08em] transition-all duration-300 ${
                  active ? "text-orange" : "text-white/40 hover:text-white"
                }`}>
                {l.label}
                {active && (
                  <motion.span layoutId="nav-line"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-orange"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language picker */}
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[.75rem] font-medium text-white/30 hover:text-white/60 transition-all">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>
              </svg>
              {langs[locale]}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: .15 }}
                  className="absolute top-full mt-2 right-0 bg-[#111] border border-white/10 shadow-2xl overflow-hidden w-20">
                  {Object.entries(langs).map(([k, v]) => (
                    <button key={k} onClick={() => switchLocale(k)}
                      className={`block w-full px-3 py-2 text-[.8rem] font-medium text-left transition-all ${
                        locale === k ? "text-orange bg-white/5" : "text-white/35 hover:text-white hover:bg-white/5"
                      }`}>{v}</button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-px h-4 bg-white/10" />
          <ThemeToggle />

          <Link href={`/${locale}/contact`}
            className="ml-3 btn btn-primary text-[.7rem] py-2 px-4">
            {t("serviceOffer")}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center gap-1.5">
          <ThemeToggle />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-white/50 hover:text-white transition-colors">
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-[1.5px] bg-current transition-all duration-300 origin-left ${mobileOpen ? "rotate-45 w-[22px]" : "w-5"}`} />
              <span className={`block h-[1.5px] bg-current transition-all duration-300 ${mobileOpen ? "opacity-0 w-0" : "w-3.5"}`} />
              <span className={`block h-[1.5px] bg-current transition-all duration-300 origin-left ${mobileOpen ? "-rotate-45 w-[22px]" : "w-5"}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, x: isRtl ? "-100%" : "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: isRtl ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className={`lg:hidden fixed inset-y-0 ${isRtl ? "left-0 border-r" : "right-0 border-l"} w-[80vw] max-w-sm bg-black/98 backdrop-blur-2xl z-40 border-white/[0.06]`}
            style={{ top: 0 }}>
            <div className="flex flex-col h-full pt-20 pb-8 px-6">
              <nav className="flex-1 space-y-1">
                {links.map((l, i) => (
                  <motion.div key={l.href} initial={{ opacity: 0, x: isRtl ? -30 : 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .06 }}>
                    <Link href={l.href} onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3.5 text-[.95rem] font-medium uppercase tracking-wider transition-all ${
                        pathname === l.href ? "text-orange" : "text-white/40 hover:text-white"
                      }`}>
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }}
                className="border-t border-white/[0.06] pt-5 space-y-3">
                <div className="flex gap-2">
                  {Object.entries(langs).map(([k, v]) => (
                    <button key={k} onClick={() => { switchLocale(k); setMobileOpen(false); }}
                      className={`flex-1 py-2.5 text-xs font-semibold tracking-wide transition-all ${
                        locale === k ? "bg-orange text-black" : "bg-white/[0.04] text-white/35 hover:text-white/60"
                      }`}>{v}</button>
                  ))}
                </div>
                <Link href={`/${locale}/contact`} onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-orange text-black text-sm font-bold uppercase tracking-wider">
                  {t("serviceOffer")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/60 z-30" />
        )}
      </AnimatePresence>
    </header>
  );
}
