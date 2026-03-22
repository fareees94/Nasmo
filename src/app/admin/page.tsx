"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — Image side */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        <Image
          src="/images/hero-industrial.png"
          alt="NASMO Industrial"
          fill
          className="object-cover"
          priority
          sizes="55vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/90 via-navy/80 to-navy-dark/95" />

        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none" />

        {/* Decorative blobs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange/[0.06] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-navy-light/[0.08] rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          {/* Logo */}
          <div>
            <Image
              src="/main_logo.png"
              alt="NASMO"
              width={140}
              height={35}
              className="h-8 w-auto brightness-0 invert"
            />
          </div>

          {/* Center text */}
          <div className="max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                <span className="text-[.65rem] font-bold tracking-[.2em] uppercase text-white/40">
                  Espace Administrateur
                </span>
              </div>
              <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight">
                Gérez votre
                <br />
                <span className="text-gradient">plateforme</span>
              </h1>
              <p className="text-white/35 text-[.9rem] leading-relaxed">
                Accédez au tableau de bord pour gérer les produits, services et
                demandes de contact de votre entreprise.
              </p>
            </motion.div>
          </div>

          {/* Bottom features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            {[
              { icon: "M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25", label: "Gestion des produits et services" },
              { icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75", label: "Messagerie et demandes de fiche technique" },
              { icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605", label: "Tableau de bord et statistiques" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/[0.03] rounded-xl px-4 py-3 border border-white/[0.05]">
                <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-orange" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                  </svg>
                </div>
                <span className="text-white/45 text-[.8rem] font-medium">{f.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right — Login form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-10 bg-[var(--bg)]">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden mb-10 text-center">
            <Image
              src="/main_logo.png"
              alt="NASMO"
              width={120}
              height={30}
              className="h-7 w-auto brightness-0 invert mx-auto mb-4"
            />
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight mb-2">
              Bienvenue
            </h2>
            <p className="text-[var(--text-muted)] text-[.88rem]">
              Connectez-vous à votre espace administrateur
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-txtsec text-[.7rem] font-semibold uppercase tracking-wider mb-2">
                Adresse e-mail
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-txtmuted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@NASMO.dz"
                  className="input"
                  style={{ paddingLeft: '2.75rem' }}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-txtsec text-[.7rem] font-semibold uppercase tracking-wider mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-txtmuted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input"
                  style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-txtmuted hover:text-txt transition-colors"
                >
                  {showPwd ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[var(--border)] bg-[var(--bg-alt)] text-orange accent-orange"
                />
                <span className="text-txtmuted text-[.8rem] group-hover:text-txtsec transition-colors">
                  Se souvenir de moi
                </span>
              </label>
              <a href="#" className="text-orange text-[.8rem] font-medium hover:text-orange-light transition-colors">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full text-[.84rem] relative overflow-hidden disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Connexion en cours...
                </div>
              ) : (
                <>
                  Se connecter
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 pt-6 border-t border-[var(--border)]">
            <p className="text-center text-txtmuted text-[.78rem]">
              <svg className="w-3.5 h-3.5 inline -mt-0.5 mr-1.5 text-orange/50" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Connexion sécurisée | NASMO © {new Date().getFullYear()}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
