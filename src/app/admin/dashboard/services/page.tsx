"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const initialServices = [
  { id: 1, title: "Installations Électriques", desc: "Installation et mise en service d'équipements électriques industriels BT/MT pour tous secteurs d'activité.", features: ["BT/MT", "Industrie", "Tertiaire", "Distribution"], active: true },
  { id: 2, title: "Systèmes Aéroportuaires", desc: "Fourniture et installation de systèmes d'aide à la navigation aérienne et balisage lumineux.", features: ["Navigation", "Balisage", "Maintenance", "Certification"], active: true },
  { id: 3, title: "Équipements de Puissance", desc: "Groupes électrogènes, onduleurs UPS, stabilisateurs et transformateurs de puissance.", features: ["UPS", "Groupes", "Stabilisateurs", "Transformateurs"], active: true },
];

export default function ServicesAdminPage() {
  const [services, setServices] = useState(initialServices);
  const [editId, setEditId] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newService, setNewService] = useState({ title: "", desc: "", features: "" });

  const toggleActive = (id: number) => {
    setServices(services.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const deleteService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
  };

  const addService = () => {
    if (!newService.title) return;
    setServices([...services, {
      id: Date.now(), title: newService.title, desc: newService.desc,
      features: newService.features.split(",").map(f => f.trim()).filter(Boolean), active: true,
    }]);
    setNewService({ title: "", desc: "", features: "" });
    setShowAdd(false);
  };

  const saveEdit = (id: number, field: string, value: string) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[var(--text-primary)] tracking-tight">Services</h1>
          <p className="text-txtmuted text-[.84rem] mt-1">Gérez vos offres de services</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn btn-primary text-[.8rem]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Ajouter un service
        </button>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="card p-6 border-orange/20">
            <h3 className="font-bold text-[var(--text-primary)] mb-4">Nouveau service</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-txtsec text-[.7rem] font-semibold uppercase tracking-wider mb-1.5">Titre</label>
                <input className="input" value={newService.title} onChange={e => setNewService({ ...newService, title: e.target.value })} placeholder="Titre du service" />
              </div>
              <div>
                <label className="block text-txtsec text-[.7rem] font-semibold uppercase tracking-wider mb-1.5">Tags (séparés par virgule)</label>
                <input className="input" value={newService.features} onChange={e => setNewService({ ...newService, features: e.target.value })} placeholder="Tag1, Tag2, Tag3" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-txtsec text-[.7rem] font-semibold uppercase tracking-wider mb-1.5">Description</label>
              <textarea className="input resize-none" rows={3} value={newService.desc} onChange={e => setNewService({ ...newService, desc: e.target.value })} placeholder="Description du service" />
            </div>
            <div className="flex gap-2">
              <button onClick={addService} className="btn btn-primary text-[.78rem]">Ajouter</button>
              <button onClick={() => setShowAdd(false)} className="btn btn-secondary text-[.78rem]">Annuler</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {services.map(s => (
          <motion.div key={s.id} layout className="card p-5 hover:shadow-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-orange" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                {editId === s.id ? (
                  <input className="input text-[.9rem] font-bold" value={s.title} onChange={e => saveEdit(s.id, "title", e.target.value)} style={{ padding: '.4rem .6rem' }} />
                ) : (
                  <h3 className="font-bold text-[var(--text-primary)] text-[.95rem]">{s.title}</h3>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => toggleActive(s.id)}
                  className={`text-[.68rem] px-2 py-0.5 rounded-full font-semibold ${s.active ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                  {s.active ? "Actif" : "Inactif"}
                </button>
              </div>
            </div>

            {editId === s.id ? (
              <textarea className="input resize-none text-[.84rem] mb-3" rows={2} value={s.desc} onChange={e => saveEdit(s.id, "desc", e.target.value)} />
            ) : (
              <p className="text-txtsec text-[.84rem] leading-relaxed mb-3">{s.desc}</p>
            )}

            <div className="flex flex-wrap gap-1.5 mb-4">
              {s.features.map((f, j) => (
                <span key={j} className="px-2.5 py-1 rounded-lg bg-[var(--bg-alt)] text-txtsec text-[.7rem] font-medium border border-[var(--border)]">{f}</span>
              ))}
            </div>

            <div className="flex gap-1 pt-3 border-t border-[var(--border)]">
              <button onClick={() => setEditId(editId === s.id ? null : s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[.75rem] font-medium transition-colors ${editId === s.id ? "bg-orange/10 text-orange" : "hover:bg-[var(--surface-raised)] text-txtmuted"}`}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                {editId === s.id ? "Sauvegarder" : "Modifier"}
              </button>
              <button onClick={() => deleteService(s.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[.75rem] font-medium hover:bg-red-500/10 text-txtmuted hover:text-red-400 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                Supprimer
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
