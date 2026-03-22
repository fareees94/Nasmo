"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { products } from "../page";

const specsData: Record<string, { label: string; value: string }[]> = {
  "dlt-srv-33hi": [
    { label: "Type", value: "Triphasé" }, { label: "Puissance", value: "10-2000 KVA" },
    { label: "Entrée", value: "380V ± 30%" }, { label: "Sortie", value: "380V ± 1%" },
    { label: "Rendement", value: "> 98%" }, { label: "Refroidissement", value: "Air forcé" },
  ],
  "cyclone-cl-100d": [
    { label: "Technologie", value: "Online Double Conversion" }, { label: "Puissance", value: "1-10 KVA" },
    { label: "Entrée", value: "220V / 380V" }, { label: "Autonomie", value: "5-30 min" },
    { label: "Forme d'onde", value: "Sinusoïdale pure" }, { label: "Rendement", value: "> 94%" },
  ],
  "emb-2800": [
    { label: "Moteur", value: "MTU Diesel" }, { label: "Puissance", value: "2800 KVA" },
    { label: "Tension", value: "400V / 6.6KV" }, { label: "Fréquence", value: "50 Hz" },
    { label: "Carburant", value: "Diesel" }, { label: "Démarrage", value: "Automatique" },
  ],
};

export default function ProductDetailPage() {
  const locale = useLocale();
  const params = useParams();
  const slug = params.slug as string;
  const product = products.find(p => p.slug === slug);

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", quantity: "1", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-txt mb-4">Produit non trouvé</h1>
          <Link href={`/${locale}/produits`} className="btn btn-primary">Retour aux produits</Link>
        </div>
      </div>
    );
  }

  const specs = specsData[slug] || [
    { label: "Catégorie", value: product.cat === "stabilisateurs" ? "Stabilisateur" : product.cat === "groupes" ? "Groupe Électrogène" : product.cat === "onduleurs" ? "Onduleur" : product.cat === "augier" ? "Augier Energy" : "Aéroport" },
    { label: "Sous-catégorie", value: product.sub },
    { label: "Puissance", value: product.power },
    { label: "Marque", value: product.brand },
  ];

  const related = products.filter(p => p.cat === product.cat && p.slug !== slug).slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1500);
  };

  const catLabels: Record<string, string> = {
    stabilisateurs: "Stabilisateurs", groupes: "Groupes Électrogènes", onduleurs: "Onduleurs", augier: "Augier Energy", aeroport: "Aéroport",
  };

  return (
    <>
      {/* Hero */}
      <section className="page-hero pt-20 pb-8 lg:pt-24 lg:pb-10">
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
            <Link href={`/${locale}/produits`}
              className="inline-flex items-center gap-2 text-white/40 text-[.78rem] font-medium hover:text-orange transition-colors mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Retour aux produits
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-[.65rem] font-semibold px-3 py-1 rounded-full bg-white/10 text-white/50 border border-white/10">
                {catLabels[product.cat]}
              </span>
              <span className="text-[.65rem] font-medium px-2.5 py-1 rounded-full bg-orange/10 text-orange border border-orange/15">
                {product.sub}
              </span>
              <span className="text-[.65rem] font-medium text-white/30">{product.brand}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product detail */}
      <section className="section bg-bg relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.025] pointer-events-none" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
            {/* Image */}
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden bg-bgalt border border-line p-8 lg:p-12 flex items-center justify-center aspect-square max-h-[500px]">
                <Image src={product.img} alt={product.name} width={350} height={350}
                  className="object-contain drop-shadow-2xl" />
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
              </div>
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection delay={.15}>
              <div>
                <h1 className="text-2xl lg:text-3xl font-extrabold text-txt tracking-tight mb-2">{product.name}</h1>
                <p className="text-txtsec text-[.95rem] leading-relaxed mb-6">{product.desc}</p>

                {product.power !== "-" && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange/5 border border-orange/10 mb-6">
                    <svg className="w-4 h-4 text-orange" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                    <span className="text-[.85rem] font-bold text-orange">{product.power}</span>
                  </div>
                )}

                {/* Specs */}
                <div className="card p-5 mb-6">
                  <h3 className="text-[.9rem] font-bold text-txt mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange" />
                    Caractéristiques techniques
                  </h3>
                  <div className="space-y-3">
                    {specs.map((sp, i) => (
                      <div key={i} className="flex justify-between items-center pb-2.5 border-b border-line last:border-0 last:pb-0">
                        <span className="text-txtmuted text-[.8rem]">{sp.label}</span>
                        <span className="text-txt text-[.82rem] font-semibold">{sp.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="flex flex-wrap gap-3">
                  <a href="#fiche-technique" className="btn btn-primary text-[.82rem]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    Demander une fiche technique
                  </a>
                  <a href="tel:+21321910835" className="btn btn-ghost text-[.82rem]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    Appeler
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Quote form */}
          <div id="fiche-technique" className="scroll-mt-24">
            <AnimatedSection>
              <div className="card p-8 lg:p-10 max-w-3xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-orange" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-extrabold text-txt tracking-tight mb-2">Demande de fiche technique</h2>
                  <p className="text-txtmuted text-[.84rem]">
                    Remplissez le formulaire ci-dessous pour recevoir une fiche technique pour <strong className="text-txt">{product.name}</strong>
                  </p>
                </div>

                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-txt mb-2">Demande envoyée !</h3>
                    <p className="text-txtsec text-[.88rem] mb-1">Nous avons bien reçu votre demande de fiche technique pour <strong>{product.name}</strong>.</p>
                    <p className="text-txtmuted text-[.82rem]">Un email de confirmation a été envoyé à <strong className="text-orange">{formData.email}</strong></p>
                    <p className="text-txtmuted text-[.78rem] mt-3">Notre équipe commerciale vous contactera dans les 24h.</p>
                    <button onClick={() => setSubmitted(false)} className="btn btn-ghost text-[.8rem] mt-6">Nouvelle demande</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Product badge */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-bgalt border border-line">
                      <Image src={product.img} alt="" width={40} height={40} className="object-contain" />
                      <div>
                        <div className="text-[.82rem] font-semibold text-txt">{product.name}</div>
                        <div className="text-[.7rem] text-txtmuted">{product.brand} | {product.power}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-txtsec text-[.7rem] font-semibold uppercase tracking-wider mb-1.5">Nom complet *</label>
                        <input className="input" required value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Votre nom" />
                      </div>
                      <div>
                        <label className="block text-txtsec text-[.7rem] font-semibold uppercase tracking-wider mb-1.5">Email *</label>
                        <input className="input" type="email" required value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="votre@email.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-txtsec text-[.7rem] font-semibold uppercase tracking-wider mb-1.5">Téléphone *</label>
                        <input className="input" type="tel" required value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+213 5XX XX XX XX" />
                      </div>
                      <div>
                        <label className="block text-txtsec text-[.7rem] font-semibold uppercase tracking-wider mb-1.5">Entreprise</label>
                        <input className="input" value={formData.company}
                          onChange={e => setFormData({ ...formData, company: e.target.value })} placeholder="Nom de votre entreprise" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-txtsec text-[.7rem] font-semibold uppercase tracking-wider mb-1.5">Quantité</label>
                      <input className="input max-w-[120px]" type="number" min="1" value={formData.quantity}
                        onChange={e => setFormData({ ...formData, quantity: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-txtsec text-[.7rem] font-semibold uppercase tracking-wider mb-1.5">Message</label>
                      <textarea className="input resize-none" rows={3} value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Précisez vos besoins, spécifications particulières..." />
                    </div>

                    <button type="submit" disabled={sending}
                      className="btn btn-primary w-full justify-center text-[.85rem] py-3.5">
                      {sending ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                          </svg>
                          Envoyer la demande de fiche technique
                        </>
                      )}
                    </button>

                    <p className="text-center text-txtmuted text-[.7rem]">
                      En soumettant ce formulaire, vous recevrez un email de confirmation d&apos;NASMO avec les détails de votre demande.
                    </p>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-20">
              <AnimatedSection>
                <h2 className="text-xl font-extrabold text-txt tracking-tight mb-8 text-center">Produits similaires</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {related.map(p => (
                    <Link key={p.slug} href={`/${locale}/produits/${p.slug}`}>
                      <div className="card group cursor-pointer overflow-hidden hover:shadow-xl">
                        <div className="relative h-40 flex items-center justify-center bg-bgalt p-4">
                          <Image src={p.img} alt={p.name} width={120} height={120}
                            className="object-contain transition-transform group-hover:scale-110" />
                        </div>
                        <div className="p-4 border-t border-line text-center">
                          <div className="text-[.65rem] text-orange/60 font-semibold uppercase tracking-wider mb-0.5">{p.brand}</div>
                          <h3 className="text-[.88rem] font-bold text-txt group-hover:text-orange transition-colors">{p.name}</h3>
                          <p className="text-txtmuted text-[.72rem] mt-0.5">{p.power}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
