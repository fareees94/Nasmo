"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const initialMessages = [
  { id: 1, name: "Ahmed Benali", email: "ahmed.benali@example.com", phone: "+213 555 12 34 56", subject: "Demande de fiche technique UPS", message: "Bonjour, je souhaite obtenir une fiche technique pour l'installation d'un système UPS pour notre usine située à Oran. Nous avons besoin d'une capacité de 500 KVA. Merci de nous contacter rapidement.", date: "2026-03-08", read: false },
  { id: 2, name: "Nadia Khelifi", email: "nadia.k@example.com", phone: "+213 555 98 76 54", subject: "Information stabilisateurs", message: "Pourriez-vous me fournir plus d'informations sur vos stabilisateurs triphasés ? Nous cherchons une solution pour protéger nos équipements médicaux.", date: "2026-03-08", read: false },
  { id: 3, name: "Mohamed Larbi", email: "m.larbi@example.com", phone: "+213 555 44 33 22", subject: "Maintenance groupe électrogène", message: "Notre groupe électrogène EMB-2800 nécessite une maintenance préventive. Quand pouvez-vous intervenir ?", date: "2026-03-07", read: false },
  { id: 4, name: "Fatima Zerhouni", email: "f.zerhouni@example.com", phone: "+213 555 11 22 33", subject: "Partenariat commercial", message: "Nous sommes une entreprise de distribution d'équipements industriels et souhaitons discuter d'un partenariat commercial avec NASMO.", date: "2026-03-06", read: true },
  { id: 5, name: "Karim Boudia", email: "k.boudia@example.com", phone: "+213 555 66 77 88", subject: "Installation électrique", message: "Nous construisons une nouvelle usine à Blida et avons besoin d'une installation électrique complète BT/MT. Pouvez-vous nous envoyer un technicien pour une étude ?", date: "2026-03-05", read: true },
];

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const filtered = filter === "all" ? messages : messages.filter(m => filter === "unread" ? !m.read : m.read);
  const unreadCount = messages.filter(m => !m.read).length;
  const selectedMsg = messages.find(m => m.id === selected);

  const markRead = (id: number) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter(m => m.id !== id));
    if (selected === id) setSelected(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[var(--text-primary)] tracking-tight">Messages</h1>
          <p className="text-txtmuted text-[.84rem] mt-1">{unreadCount} message{unreadCount !== 1 ? "s" : ""} non lu{unreadCount !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex gap-1 bg-[var(--surface)] border border-[var(--border)] rounded-lg p-0.5">
          {([["all", "Tous"], ["unread", "Non lus"], ["read", "Lus"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-md text-[.75rem] font-medium transition-all ${
                filter === key ? "bg-orange/10 text-orange" : "text-txtmuted hover:text-txtsec"
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5" style={{ minHeight: '500px' }}>
        {/* Message List */}
        <div className="lg:col-span-1 card p-2 overflow-y-auto" style={{ maxHeight: '600px' }}>
          <div className="space-y-1">
            {filtered.map(m => (
              <button key={m.id} onClick={() => { setSelected(m.id); markRead(m.id); }}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  selected === m.id ? "bg-orange/10 border border-orange/15" : "hover:bg-[var(--bg-alt)] border border-transparent"
                }`}>
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${!m.read ? "bg-orange/10" : "bg-[var(--surface-raised)]"}`}>
                    <span className={`text-[.55rem] font-bold ${!m.read ? "text-orange" : "text-txtmuted"}`}>
                      {m.name.split(' ').map(w => w[0]).join('')}
                    </span>
                  </div>
                  <span className="text-[.8rem] font-semibold text-[var(--text-primary)] truncate flex-1">{m.name}</span>
                  {!m.read && <span className="w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0" />}
                </div>
                <p className="text-[.75rem] font-medium text-txtsec truncate pl-9">{m.subject}</p>
                <p className="text-[.68rem] text-txtmuted pl-9 mt-0.5">{m.date}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 card p-6">
          {selectedMsg ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={selectedMsg.id}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] text-[1.1rem] mb-1">{selectedMsg.subject}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-[.78rem] text-txtmuted">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      {selectedMsg.name}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      {selectedMsg.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      {selectedMsg.phone}
                    </span>
                  </div>
                </div>
                <button onClick={() => deleteMessage(selectedMsg.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/10 text-txtmuted hover:text-red-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>

              <div className="border-t border-[var(--border)] pt-5">
                <p className="text-[.88rem] text-txtsec leading-relaxed">{selectedMsg.message}</p>
              </div>

              <div className="mt-6 pt-5 border-t border-[var(--border)]">
                <h4 className="text-[.78rem] font-semibold text-[var(--text-primary)] mb-3">Répondre</h4>
                <textarea className="input resize-none mb-3" rows={3} placeholder="Écrivez votre réponse..." />
                <button className="btn btn-primary text-[.78rem]">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  Envoyer
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-[var(--bg-alt)] flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-txtmuted" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <p className="text-txtsec text-[.88rem] font-medium">Sélectionnez un message</p>
              <p className="text-txtmuted text-[.78rem] mt-1">Cliquez sur un message pour le lire</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
