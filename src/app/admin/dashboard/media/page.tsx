"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const initialImages = [
  { id: 1, name: "hero-industrial.png", path: "/images/hero-industrial.png", size: "2.4 MB", used: "Hero Section" },
  { id: 2, name: "hero-equipment.png", path: "/images/hero-equipment.png", size: "1.8 MB", used: "Hero Section" },
  { id: 3, name: "hero-team.png", path: "/images/hero-team.png", size: "2.1 MB", used: "Hero Section" },
  { id: 4, name: "about-team.png", path: "/images/about-team.png", size: "1.5 MB", used: "À Propos" },
  { id: 5, name: "service-electrical.png", path: "/images/service-electrical.png", size: "980 KB", used: "Services" },
  { id: 6, name: "service-airport.png", path: "/images/service-airport.png", size: "1.2 MB", used: "Services" },
  { id: 7, name: "service-equipment.png", path: "/images/service-equipment.png", size: "1.1 MB", used: "Services" },
  { id: 8, name: "product-cyclone.png", path: "/images/product-cyclone.png", size: "340 KB", used: "Produits" },
  { id: 9, name: "product-delta.png", path: "/images/product-delta.png", size: "280 KB", used: "Produits" },
  { id: 10, name: "product-stabilizer.png", path: "/images/product-stabilizer.png", size: "310 KB", used: "Produits" },
  { id: 11, name: "product-emb2800.png", path: "/images/product-emb2800.png", size: "420 KB", used: "Produits" },
  { id: 12, name: "product-emb1400.png", path: "/images/product-emb1400.png", size: "390 KB", used: "Produits" },
];

export default function MediaAdminPage() {
  const [images, setImages] = useState(initialImages);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");

  const categories = ["all", "Hero Section", "À Propos", "Services", "Produits"];
  const filtered = filter === "all" ? images : images.filter(i => i.used === filter);

  const deleteImage = (id: number) => {
    setImages(images.filter(i => i.id !== id));
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[var(--text-primary)] tracking-tight">Médias</h1>
          <p className="text-txtmuted text-[.84rem] mt-1">Gérez les images du site ({images.length} fichiers)</p>
        </div>
        <button className="btn btn-primary text-[.8rem]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          Uploader une image
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-[.75rem] font-medium transition-all ${
                filter === c ? "bg-orange/10 text-orange border border-orange/15" : "text-txtmuted hover:text-txtsec border border-transparent"
              }`}>
              {c === "all" ? "Tous" : c}
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-1 bg-[var(--surface)] border border-[var(--border)] rounded-lg p-0.5">
          <button onClick={() => setView("grid")} className={`p-1.5 rounded-md transition-colors ${view === "grid" ? "bg-orange/10 text-orange" : "text-txtmuted"}`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
          </button>
          <button onClick={() => setView("list")} className={`p-1.5 rounded-md transition-colors ${view === "list" ? "bg-orange/10 text-orange" : "text-txtmuted"}`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid view */}
      {view === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map(img => (
            <motion.div key={img.id} layout
              onClick={() => setSelected(selected === img.id ? null : img.id)}
              className={`card overflow-hidden cursor-pointer group ${selected === img.id ? "ring-2 ring-orange" : ""}`}>
              <div className="relative aspect-square bg-[var(--bg-alt)] flex items-center justify-center p-3">
                <Image src={img.path} alt={img.name} width={120} height={120}
                  className="object-contain max-h-full transition-transform group-hover:scale-105" />
                {selected === img.id && (
                  <div className="absolute inset-0 bg-navy-dark/50 flex items-center justify-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); deleteImage(img.id); }}
                      className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <div className="p-2.5">
                <p className="text-[.72rem] font-medium text-[var(--text-primary)] truncate">{img.name}</p>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[.65rem] text-txtmuted">{img.size}</span>
                  <span className="text-[.62rem] text-orange/60">{img.used}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List view */
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left text-[.7rem] font-semibold text-txtmuted uppercase tracking-wider p-4">Image</th>
                <th className="text-left text-[.7rem] font-semibold text-txtmuted uppercase tracking-wider p-4">Nom</th>
                <th className="text-left text-[.7rem] font-semibold text-txtmuted uppercase tracking-wider p-4">Utilisé dans</th>
                <th className="text-left text-[.7rem] font-semibold text-txtmuted uppercase tracking-wider p-4">Taille</th>
                <th className="text-right text-[.7rem] font-semibold text-txtmuted uppercase tracking-wider p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(img => (
                <tr key={img.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-alt)] transition-colors">
                  <td className="p-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--bg-alt)] flex items-center justify-center overflow-hidden">
                      <Image src={img.path} alt={img.name} width={32} height={32} className="object-contain" />
                    </div>
                  </td>
                  <td className="p-4 text-[.82rem] font-medium text-[var(--text-primary)]">{img.name}</td>
                  <td className="p-4"><span className="text-[.72rem] px-2.5 py-1 rounded-full bg-orange/5 text-orange/70 font-medium">{img.used}</span></td>
                  <td className="p-4 text-[.82rem] text-txtmuted">{img.size}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => deleteImage(img.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/10 text-txtmuted hover:text-red-400 transition-colors ml-auto">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
