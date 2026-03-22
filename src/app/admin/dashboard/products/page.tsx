"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const initialProducts = [
  { id: 1, name: "CYCLONE CL 100D", cat: "UPS", desc: "Onduleur haute performance pour protection électrique continue", img: "/images/product-cyclone.png", active: true },
  { id: 2, name: "Delta 200 Series UPS", cat: "UPS", desc: "Système UPS modulaire pour datacenters", img: "/images/product-delta.png", active: true },
  { id: 3, name: "DLT SRV 33Hi", cat: "Stabilisateurs", desc: "Stabilisateur triphasé industriel", img: "/images/product-stabilizer.png", active: true },
  { id: 4, name: "EMB-2800", cat: "Groupes Électrogènes", desc: "Groupe électrogène 2800 KVA", img: "/images/product-emb2800.png", active: true },
  { id: 5, name: "EMB1400 INSO", cat: "Groupes Électrogènes", desc: "Groupe insonorisé 1400 KVA", img: "/images/product-emb1400.png", active: false },
  { id: 6, name: "EMT 3125", cat: "Groupes Électrogènes", desc: "Groupe industriel 3125 KVA", img: "/images/product-emt3125.png", active: true },
];

export default function ProductsAdminPage() {
  const [products, setProducts] = useState(initialProducts);
  const [editId, setEditId] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [newProduct, setNewProduct] = useState({ name: "", cat: "UPS", desc: "", img: "/images/product-cyclone.png" });

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.cat.toLowerCase().includes(search.toLowerCase()));

  const toggleActive = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addProduct = () => {
    if (!newProduct.name) return;
    setProducts([...products, { ...newProduct, id: Date.now(), active: true }]);
    setNewProduct({ name: "", cat: "UPS", desc: "", img: "/images/product-cyclone.png" });
    setShowAdd(false);
  };

  const saveEdit = (id: number, field: string, value: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[var(--text-primary)] tracking-tight">Produits</h1>
          <p className="text-txtmuted text-[.84rem] mt-1">Gérez votre catalogue de produits</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn btn-primary text-[.8rem]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Ajouter un produit
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-txtmuted pointer-events-none" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
          className="input" style={{ paddingLeft: '2.5rem' }} />
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="card p-6 border-orange/20">
            <h3 className="font-bold text-[var(--text-primary)] mb-4">Nouveau produit</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-txtsec text-[.7rem] font-semibold uppercase tracking-wider mb-1.5">Nom</label>
                <input className="input" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Nom du produit" />
              </div>
              <div>
                <label className="block text-txtsec text-[.7rem] font-semibold uppercase tracking-wider mb-1.5">Catégorie</label>
                <select className="input" value={newProduct.cat} onChange={e => setNewProduct({ ...newProduct, cat: e.target.value })}>
                  <option>UPS</option>
                  <option>Stabilisateurs</option>
                  <option>Groupes Électrogènes</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-txtsec text-[.7rem] font-semibold uppercase tracking-wider mb-1.5">Description</label>
              <textarea className="input resize-none" rows={2} value={newProduct.desc} onChange={e => setNewProduct({ ...newProduct, desc: e.target.value })} placeholder="Description du produit" />
            </div>
            <div className="flex gap-2">
              <button onClick={addProduct} className="btn btn-primary text-[.78rem]">Ajouter</button>
              <button onClick={() => setShowAdd(false)} className="btn btn-secondary text-[.78rem]">Annuler</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left text-[.7rem] font-semibold text-txtmuted uppercase tracking-wider p-4">Produit</th>
                <th className="text-left text-[.7rem] font-semibold text-txtmuted uppercase tracking-wider p-4">Catégorie</th>
                <th className="text-left text-[.7rem] font-semibold text-txtmuted uppercase tracking-wider p-4">Description</th>
                <th className="text-left text-[.7rem] font-semibold text-txtmuted uppercase tracking-wider p-4">Statut</th>
                <th className="text-right text-[.7rem] font-semibold text-txtmuted uppercase tracking-wider p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-alt)] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[var(--bg-alt)] flex items-center justify-center overflow-hidden flex-shrink-0">
                        <Image src={p.img} alt={p.name} width={32} height={32} className="object-contain" />
                      </div>
                      {editId === p.id ? (
                        <input className="input text-[.82rem]" value={p.name} onChange={e => saveEdit(p.id, "name", e.target.value)} style={{ padding: '.4rem .6rem' }} />
                      ) : (
                        <span className="text-[.84rem] font-semibold text-[var(--text-primary)]">{p.name}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-[.72rem] px-2.5 py-1 rounded-full bg-[var(--surface-raised)] text-txtsec font-medium border border-[var(--border)]">{p.cat}</span>
                  </td>
                  <td className="p-4">
                    {editId === p.id ? (
                      <input className="input text-[.82rem]" value={p.desc} onChange={e => saveEdit(p.id, "desc", e.target.value)} style={{ padding: '.4rem .6rem' }} />
                    ) : (
                      <span className="text-[.82rem] text-txtmuted">{p.desc}</span>
                    )}
                  </td>
                  <td className="p-4">
                    <button onClick={() => toggleActive(p.id)}
                      className={`text-[.72rem] px-2.5 py-1 rounded-full font-semibold ${p.active ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                      {p.active ? "Actif" : "Inactif"}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setEditId(editId === p.id ? null : p.id)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${editId === p.id ? "bg-orange/10 text-orange" : "hover:bg-[var(--surface-raised)] text-txtmuted"}`}>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>
                      <button onClick={() => deleteProduct(p.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/10 text-txtmuted hover:text-red-400 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
