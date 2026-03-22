"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/admin/dashboard", label: "Tableau de bord", icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" },
  { href: "/admin/dashboard/content", label: "Contenu", icon: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H5.625a2.25 2.25 0 01-2.25-2.25V7.875c0-.621.504-1.125 1.125-1.125H7.5" },
  { href: "/admin/dashboard/products", label: "Produits", icon: "M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" },
  { href: "/admin/dashboard/services", label: "Services", icon: "M11.42 15.17l-5.1-5.1m0 0L12 4.37m-5.68 5.7h11.36M4.5 12a7.5 7.5 0 1015 0 7.5 7.5 0 00-15 0z" },
  { href: "/admin/dashboard/media", label: "Médias", icon: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 6v12.75c0 1.243 1.007 2.25 2.25 2.25z" },
  { href: "/admin/dashboard/messages", label: "Messages", icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-[var(--bg)]">
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-[72px]" : "w-[260px]"} flex-shrink-0 bg-[#0a1529] border-r border-white/[0.06] flex flex-col transition-all duration-300`}>
        {/* Header */}
        <div className="h-16 flex items-center px-4 border-b border-white/[0.06] gap-2">
          {!collapsed && (
            <Image src="/main_logo.png" alt="NASMO" width={110} height={28} className="h-6 w-auto brightness-0 invert" />
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center hover:bg-white/[0.08] transition-colors ml-auto">
            <svg className={`w-4 h-4 text-white/40 transition-transform ${collapsed ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {nav.map(n => {
            const active = pathname === n.href;
            return (
              <Link key={n.href} href={n.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[.82rem] font-medium transition-all duration-200 ${
                  active
                    ? "bg-orange/10 text-orange border border-orange/15"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04] border border-transparent"
                }`}>
                <svg className={`w-[18px] h-[18px] flex-shrink-0 ${active ? "text-orange" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d={n.icon} />
                </svg>
                {!collapsed && <span>{n.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/[0.06]">
          <Link href="/admin" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[.82rem] font-medium text-white/30 hover:text-red-400 hover:bg-red-500/[0.06] transition-all`}>
            <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            {!collapsed && <span>Déconnexion</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar — sticky */}
        <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-6 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-md">
          {/* Left: breadcrumb */}
          <div className="flex items-center gap-3">
            <h2 className="text-[.9rem] font-semibold text-[var(--text-primary)]">Administration</h2>
            <span className="text-txtmuted text-[.7rem]">•</span>
            <span className="text-[.78rem] text-txtsec capitalize">
              {pathname === "/admin/dashboard" ? "Vue d'ensemble" : pathname.split("/").pop()?.replace(/-/g, " ")}
            </span>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-[var(--bg-alt)] border border-[var(--border)] rounded-xl px-3 py-1.5">
              <svg className="w-3.5 h-3.5 text-txtmuted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input type="text" placeholder="Rechercher..." className="bg-transparent text-[.78rem] text-[var(--text-primary)] placeholder:text-txtmuted outline-none w-36 lg:w-48" />
            </div>

            {/* Notification bell */}
            <button className="relative w-9 h-9 rounded-xl bg-[var(--bg-alt)] border border-[var(--border)] flex items-center justify-center hover:bg-orange/5 hover:border-orange/15 transition-all">
              <svg className="w-4 h-4 text-txtsec" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange rounded-full flex items-center justify-center text-[.55rem] text-white font-bold">5</span>
            </button>

            {/* Date */}
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-[.72rem] text-[var(--text-primary)] font-medium">
                {new Date().toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })}
              </span>
              <span className="text-[.65rem] text-txtmuted">
                {new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>

            <div className="w-px h-8 bg-[var(--border)]" />

            {/* Visit site */}
            <Link href="/fr" target="_blank" className="hidden sm:flex items-center gap-1.5 text-[.75rem] text-txtsec hover:text-orange transition-colors px-2.5 py-1.5 rounded-lg hover:bg-orange/5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              Voir le site
            </Link>

            {/* Profile */}
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <Image src="/images/admin-avatar.png" alt="Admin" width={32} height={32}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-orange/20" />
              <div className="hidden md:block">
                <div className="text-[.78rem] font-semibold text-[var(--text-primary)] group-hover:text-orange transition-colors leading-tight">Admin</div>
                <div className="text-[.65rem] text-txtmuted leading-tight">Administrateur</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
