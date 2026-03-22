"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";

export const products = [
  // Stabilisateurs de Tension
  { slug: "dlt-srv-33hi", name: "DLT SRV 33Hi", cat: "stabilisateurs", sub: "Triphasé", desc: "Stabilisateur triphasé industriel haute performance", power: "10-2000 KVA", img: "/images/product-stabilizer.png", brand: "DELTA" },
  { slug: "dlt-srv-11", name: "DLT SRV 11", cat: "stabilisateurs", sub: "Monophasé", desc: "Stabilisateur monophasé pour équipements sensibles", power: "1-30 KVA", img: "/images/product-stabilizer.png", brand: "DELTA" },
  { slug: "dlt-srv-33", name: "DLT SRV 33", cat: "stabilisateurs", sub: "Triphasé", desc: "Stabilisateur triphasé standard", power: "6-500 KVA", img: "/images/product-stabilizer.png", brand: "DELTA" },
  // Variateurs
  { slug: "mp900a4-variateur", name: "MP900A4", cat: "variateurs", sub: "Variateur", desc: "Variateur de fréquence 340KW haute performance", power: "340 KW", img: "/images/product-delta.png", brand: "NASMO" },
  // Groupes Électrogènes
  { slug: "emb-2800", name: "EMB-2800", cat: "groupes", sub: "Ouvert", desc: "Groupe électrogène diesel 2800 KVA", power: "2800 KVA", img: "/images/product-emb2800.png", brand: "Electra Molins" },
  { slug: "emb-1400-inso", name: "EMB1400 INSO", cat: "groupes", sub: "Insonorisé", desc: "Groupe électrogène insonorisé 1400 KVA", power: "1400 KVA", img: "/images/product-emb1400.png", brand: "Electra Molins" },
  { slug: "emt-3125", name: "EMT 3125", cat: "groupes", sub: "Ouvert", desc: "Groupe électrogène industriel 3125 KVA", power: "3125 KVA", img: "/images/product-emt3125.png", brand: "Electra Molins" },
  { slug: "emb-500-inso", name: "EMB 500 INSO", cat: "groupes", sub: "Insonorisé", desc: "Groupe électrogène insonorisé compact 500 KVA", power: "500 KVA", img: "/images/product-emb1400.png", brand: "Electra Molins" },
  { slug: "emb-150", name: "EMB 150", cat: "groupes", sub: "Ouvert", desc: "Groupe électrogène 150 KVA pour PME", power: "150 KVA", img: "/images/product-emb2800.png", brand: "Electra Molins" },
  // Onduleurs
  { slug: "cyclone-cl-100d", name: "CYCLONE CL 100D", cat: "onduleurs", sub: "Online", desc: "Onduleur online double conversion haute performance", power: "1-10 KVA", img: "/images/product-cyclone.png", brand: "DELTA" },
  { slug: "delta-200-series", name: "Delta 200 Series", cat: "onduleurs", sub: "Modulaire", desc: "Système UPS modulaire évolutif pour datacenters", power: "20-200 KVA", img: "/images/product-delta.png", brand: "DELTA" },
  { slug: "delta-hph-series", name: "Delta HPH Series", cat: "onduleurs", sub: "Online", desc: "UPS online triphasé haute puissance", power: "20-120 KVA", img: "/images/product-delta.png", brand: "DELTA" },
  { slug: "delta-rt-series", name: "Delta RT Series", cat: "onduleurs", sub: "Rack/Tower", desc: "UPS rack/tower compact pour serveurs", power: "1-10 KVA", img: "/images/product-cyclone.png", brand: "DELTA" },
  // Augier Energy
  { slug: "transfo-augier-100", name: "Transformateur 100 MVA", cat: "augier", sub: "Transformateurs", desc: "Transformateur de puissance haute tension", power: "100 MVA", img: "/images/service-equipment.png", brand: "Augier Energy" },
  { slug: "cellule-mt-augier", name: "Cellule MT Augier", cat: "augier", sub: "Cellules MT", desc: "Cellule de coupure et protection moyenne tension", power: "36 KV", img: "/images/service-equipment.png", brand: "Augier Energy" },
  { slug: "relais-protection", name: "Relais de Protection", cat: "augier", sub: "Protection", desc: "Relais de protection numérique multifonction", power: "-", img: "/images/service-equipment.png", brand: "Augier Energy" },
];

const categories = [
  { key: "all", label: "All Products" },
  { key: "variateurs", label: "Variateurs" },
  { key: "stabilisateurs", label: "Stabilisateurs" },
  { key: "groupes", label: "Groupes Électrogènes" },
  { key: "onduleurs", label: "Onduleurs" },
  { key: "augier", label: "Augier Energy" },
];

const catLabels: Record<string, string> = {
  stabilisateurs: "Stabilisateurs", groupes: "Groupes", onduleurs: "Onduleurs", augier: "Augier", variateurs: "Variateurs",
};

export default function ProductsPage() {
  const t = useTranslations("products");
  const locale = useLocale();
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = products.filter(p => {
    const matchCat = active === "all" || p.cat === active;
    const matchSearch = search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[300px] max-h-[400px] overflow-hidden bg-black">
        <Image src="/images/hero-industrial.png" alt="Products" fill className="object-cover opacity-30" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
        <div className="relative z-10 h-full container flex flex-col justify-end pb-14">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <div className="section-label text-white/40 mb-5">{t("sectionTag")}</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
              {t("title")}
            </h1>
            <p className="text-white/35 mt-4 max-w-lg text-base">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="section-lg bg-bg">
        <div className="container">
          {/* Search + Filters */}
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row gap-4 mb-10 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-80">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-txtmuted pointer-events-none" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input type="text" placeholder="Search products..."
                  value={search} onChange={e => setSearch(e.target.value)}
                  className="input w-full" style={{ paddingLeft: '2.5rem' }} />
              </div>

              {/* Category tabs - minimal */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map(c => (
                  <button key={c.key} onClick={() => setActive(c.key)}
                    className={`px-4 py-2 text-[.75rem] font-semibold uppercase tracking-wider transition-all duration-300 ${
                      active === c.key
                        ? "bg-orange text-black"
                        : "text-txtmuted hover:text-txt border border-line"
                    }`}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Results count */}
          <div className="flex items-center gap-3 mb-8 border-b border-line pb-4">
            <span className="text-txtmuted text-[.78rem] uppercase tracking-wider">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-line">
            <AnimatePresence mode="popLayout">
              {filtered.map(p => (
                <motion.div key={p.slug} layout
                  initial={{ opacity: 0, scale: .95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: .95 }}
                  transition={{ duration: .25 }}>
                  <Link href={`/${locale}/produits/${p.slug}`}>
                    <div className="bg-bg group cursor-pointer h-full flex flex-col hover:bg-bgalt transition-colors">
                      <div className="relative h-48 flex items-center justify-center bg-bgalt p-4 border-b border-line">
                        <Image src={p.img} alt={p.name} width={140} height={140}
                          className="object-contain transition-all duration-500 group-hover:scale-110" />
                        <span className="absolute top-3 left-3 text-[.6rem] font-bold uppercase tracking-[.15em] text-txtmuted">
                          {catLabels[p.cat]}
                        </span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="text-[.6rem] text-orange font-bold uppercase tracking-[.2em] mb-1.5">{p.brand}</div>
                        <h3 className="text-[.88rem] font-bold text-txt group-hover:text-orange transition-colors mb-1.5">{p.name}</h3>
                        <p className="text-txtmuted text-[.75rem] mb-3 flex-1 leading-relaxed">{p.desc}</p>
                        {p.power !== "-" && (
                          <div className="text-[.7rem] text-txtsec font-medium mb-3">
                            {p.power}
                          </div>
                        )}
                        <span className="text-orange text-[.72rem] font-bold uppercase tracking-wider inline-flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                          {t("viewDetails")}
                          <span className="w-4 h-px bg-orange group-hover:w-7 transition-all" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-txtsec text-sm font-medium">No products found</p>
              <p className="text-txtmuted text-[.78rem] mt-1">Try adjusting your filters</p>
            </div>
          )}

          {/* Download */}
          <AnimatedSection>
            <div className="text-center mt-16 pt-10 border-t border-line">
              <a href="https://nasmo.dz/wp-content/uploads/2020/09/nasmo-catalogue-22-pages.pdf"
                target="_blank" rel="noopener noreferrer" className="btn btn-outline-orange">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                </svg>
                {t("downloadCatalog")} (PDF)
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
