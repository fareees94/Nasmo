"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Produits", val: "6", change: "+2 ce mois", icon: "M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25", color: "orange" },
  { label: "Services", val: "3", change: "Stable", icon: "M11.42 15.17l-5.1-5.1m0 0L12 4.37m-5.68 5.7h11.36M4.5 12a7.5 7.5 0 1015 0 7.5 7.5 0 00-15 0z", color: "navy-light" },
  { label: "Messages", val: "12", change: "+5 non lus", icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75", color: "orange" },
  { label: "Visiteurs", val: "1,240", change: "+18% ce mois", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z", color: "navy-light" },
];

const recentMessages = [
  { name: "Ahmed B.", email: "ahmed@example.com", subject: "Demande de fiche technique UPS", time: "Il y a 2h", read: false },
  { name: "Nadia K.", email: "nadia@example.com", subject: "Information stabilisateurs", time: "Il y a 5h", read: false },
  { name: "Mohamed L.", email: "mohamed@example.com", subject: "Maintenance groupe électrogène", time: "Hier", read: true },
  { name: "Fatima Z.", email: "fatima@example.com", subject: "Partenariat commercial", time: "Il y a 2j", read: true },
];

const activity = [
  { action: "Produit ajouté", detail: "EMB-2800 ajouté au catalogue", time: "Il y a 1h" },
  { action: "Service modifié", detail: "Description mise à jour pour Aéroportuaire", time: "Il y a 3h" },
  { action: "Image uploadée", detail: "hero-industrial.png remplacée", time: "Hier" },
  { action: "Message reçu", detail: "Nouvelle demande de fiche technique de Ahmed B.", time: "Hier" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-[var(--text-primary)] tracking-tight">Tableau de bord</h1>
        <p className="text-txtmuted text-[.84rem] mt-1">Vue d&apos;ensemble de votre plateforme</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .08 }}
            className="card p-5 hover:shadow-lg">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-${s.color}/10 flex items-center justify-center`}>
                <svg className={`w-5 h-5 text-${s.color}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-extrabold text-[var(--text-primary)] mb-0.5">{s.val}</div>
            <div className="text-txtmuted text-[.75rem]">{s.label}</div>
            <div className="text-[.7rem] text-orange/70 mt-1 font-medium">{s.change}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Messages */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[var(--text-primary)] text-[.95rem]">Messages récents</h3>
            <span className="text-[.7rem] bg-orange/10 text-orange px-2.5 py-1 rounded-full font-semibold">5 non lus</span>
          </div>
          <div className="space-y-1">
            {recentMessages.map((m, i) => (
              <div key={i} className={`flex items-center gap-4 p-3 rounded-xl transition-colors hover:bg-[var(--bg-alt)] cursor-pointer ${!m.read ? "bg-orange/[0.02]" : ""}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${!m.read ? "bg-orange/10" : "bg-[var(--surface-raised)]"}`}>
                  <span className={`text-[.65rem] font-bold ${!m.read ? "text-orange" : "text-txtmuted"}`}>
                    {m.name.split(' ').map(w => w[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[.82rem] font-semibold text-[var(--text-primary)] truncate">{m.name}</span>
                    {!m.read && <span className="w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0" />}
                  </div>
                  <p className="text-[.78rem] text-txtmuted truncate">{m.subject}</p>
                </div>
                <span className="text-[.7rem] text-txtmuted flex-shrink-0">{m.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="card p-5">
          <h3 className="font-bold text-[var(--text-primary)] text-[.95rem] mb-4">Activité récente</h3>
          <div className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-orange/40 mt-1.5" />
                  {i < activity.length - 1 && <div className="w-px flex-1 bg-[var(--border)] mt-1" />}
                </div>
                <div className="pb-4">
                  <div className="text-[.8rem] font-semibold text-[var(--text-primary)]">{a.action}</div>
                  <div className="text-[.75rem] text-txtmuted">{a.detail}</div>
                  <div className="text-[.68rem] text-txtmuted/60 mt-0.5">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
