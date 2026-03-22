"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const nav = [
    { href: `/${locale}`, label: t("nav.home") },
    { href: `/${locale}/a-propos`, label: t("nav.about") },
    { href: `/${locale}/services`, label: t("nav.services") },
    { href: `/${locale}/contact`, label: t("nav.contact") },
  ];

  const services = [
    t("footer.cat.generators"),
    t("footer.cat.airport"),
    t("footer.cat.augier"),
    t("footer.cat.ups"),
  ];

  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-white/[0.06]">
      <div className="container pt-16 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 mb-16">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href={`/${locale}`} className="inline-block mb-5 group">
              <Image src="/main_logo.png" alt="NASMO" width={120} height={30}
                className="h-6 w-auto transition-opacity group-hover:opacity-70" />
            </Link>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              {t("footer.description")}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="text-[.7rem] font-bold text-white/50 uppercase tracking-[.2em] mb-5">{t("footer.navigation")}</h4>
            <ul className="space-y-3">
              {nav.map(n => (
                <li key={n.href}>
                  <Link href={n.href} className="text-white/30 hover:text-orange text-sm transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="text-[.7rem] font-bold text-white/50 uppercase tracking-[.2em] mb-5">{t("footer.categories")}</h4>
            <ul className="space-y-3">
              {services.map(c => (
                <li key={c}>
                  <Link href={`/${locale}/services`} className="text-white/30 hover:text-orange text-sm transition-colors">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-[.7rem] font-bold text-white/50 uppercase tracking-[.2em] mb-5">{t("footer.headquarters")}</h4>
            <div className="space-y-3 text-sm">
              <p className="text-white/30">{t("contact.info.addressValue")}</p>
              <p className="text-white/30">+213 (0) 551.99.55.68</p>
              <p className="text-orange/80">contact@nasmo.dz</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">&copy; {new Date().getFullYear()} NASMO. {t("footer.rights")}.</p>
          <p className="text-white/15 text-xs">{t("common.since")}</p>
        </div>
      </div>
    </footer>
  );
}
