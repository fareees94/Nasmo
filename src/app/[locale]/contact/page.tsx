"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();

  const contactInfo = [
    { label: t("info.address"), value: t("info.addressValue") },
    { label: t("info.phone"), value: t("info.phoneValue") },
    { label: t("info.email"), value: t("info.emailValue") },
    { label: t("info.technical"), value: t("info.technicalValue") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[550px] overflow-hidden bg-black">
        <Image src="/images/hero-generators.png" alt="Contact" fill className="object-cover opacity-60 lg:hidden" sizes="100vw" />
        <Image src="/images/hero3.jpg" alt="Contact" fill className="object-cover opacity-60 hidden lg:block" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
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

      {/* Contact Info Bar */}
      <section className="bg-bgalt border-b border-line">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px">
            {contactInfo.map((c, i) => (
              <AnimatedSection key={i}>
                <div className="py-8 px-4 lg:px-6 text-center">
                  <div className="text-[.65rem] text-txtmuted font-bold uppercase tracking-[.2em] mb-2">{c.label}</div>
                  <div className="text-txt text-sm font-semibold">{c.value}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Form */}
      <section className="section-lg bg-bg">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <AnimatedSection>
              <div className="overflow-hidden border border-line h-full min-h-[460px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.272!2d2.97!3d36.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ1JzAwLjAiTiAywrA1OCcxMi4wIkU!5e0!3m2!1sfr!2sdz!4v1"
                  width="100%" height="100%"
                  style={{ border: 0, minHeight: "460px" }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="NASMO" />
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection>
              <div className="bg-surface border border-line p-8 lg:p-10">
                <h2 className="text-xl font-extrabold text-txt mb-2 tracking-tight">
                  {locale === "ar" ? "أرسل لنا رسالة" : locale === "en" ? "Send us a message" : "Envoyez-nous un message"}
                </h2>
                <p className="text-txtmuted text-sm mb-8">{t("subtitle")}</p>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-txtsec text-[.7rem] font-bold uppercase tracking-[.15em] mb-2">{t("form.name")}</label>
                      <input type="text" placeholder={t("form.name")} className="input" />
                    </div>
                    <div>
                      <label className="block text-txtsec text-[.7rem] font-bold uppercase tracking-[.15em] mb-2">{t("form.email")}</label>
                      <input type="email" placeholder={t("form.email")} className="input" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-txtsec text-[.7rem] font-bold uppercase tracking-[.15em] mb-2">{t("form.phone")}</label>
                      <input type="tel" placeholder={t("form.phone")} className="input" />
                    </div>
                    <div>
                      <label className="block text-txtsec text-[.7rem] font-bold uppercase tracking-[.15em] mb-2">{t("form.subject")}</label>
                      <input type="text" placeholder={t("form.subject")} className="input" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-txtsec text-[.7rem] font-bold uppercase tracking-[.15em] mb-2">{t("form.message")}</label>
                    <textarea rows={5} placeholder={t("form.message")} className="input resize-none" />
                  </div>
                  <button type="submit" className="btn btn-primary w-full">
                    {t("form.send")}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                    </svg>
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
