"use client";

import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const heroImages: Record<string, string> = {
  "truck-maintenance": "/images/service-electrical.png",
  "construction-equipment": "/images/service-airport.png",
  "mobile-service": "/images/service-equipment.png",
};

const validSlugs = ["truck-maintenance", "construction-equipment", "mobile-service"];

export default function ServiceDetailPage() {
  const t = useTranslations("services");
  const tc = useTranslations("common");
  const locale = useLocale();
  const params = useParams();
  const slug = params.slug as string;

  if (!validSlugs.includes(slug)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-txt mb-4">{t("notFound")}</h1>
          <Link href={`/${locale}/services`} className="btn btn-primary">{t("backToServices")}</Link>
        </div>
      </div>
    );
  }

  const d = `detail.${slug}`;
  const hero = heroImages[slug];

  const features = [1, 2, 3, 4, 5, 6].map(i => ({
    title: t(`${d}.f${i}`),
    desc: t(`${d}.f${i}d`),
  }));

  const specs = [1, 2, 3, 4].map(i => ({
    label: t(`${d}.s${i}l`),
    value: t(`${d}.s${i}v`),
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[550px] overflow-hidden bg-black">
        <Image src={hero} alt={t(`${d}.title`)} fill className="object-cover opacity-60" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
        <div className="relative z-10 h-full container flex flex-col justify-end pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <Link href={`/${locale}/services`}
              className="inline-flex items-center gap-2 text-white/30 text-[.78rem] font-medium hover:text-orange transition-colors mb-5 uppercase tracking-wider">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {t("allServices")}
            </Link>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
              {t(`${d}.title`)}
            </h1>
            <p className="text-white/35 mt-4 max-w-xl text-base">{t(`${d}.subtitle`)}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-lg bg-bg">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-14">
              <AnimatedSection>
                <div className="section-label mb-5">{t("overview")}</div>
                <p className="text-txtsec text-[.95rem] leading-[1.9]">{t(`${d}.longDesc`)}</p>
              </AnimatedSection>

              <AnimatedSection>
                <div className="section-label mb-6">{t("whatWeOffer")}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {features.map((f, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * .05 }}
                      className="border-t border-line pt-4 group">
                      <h3 className="text-[.88rem] font-bold text-txt mb-1 group-hover:text-orange transition-colors">{f.title}</h3>
                      <p className="text-txtmuted text-[.8rem] leading-relaxed">{f.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div>
              <AnimatedSection>
                <div className="bg-surface border border-line p-6 lg:p-8 sticky top-24">
                  <div className="section-label mb-5">{t("details")}</div>
                  <div className="space-y-4">
                    {specs.map((sp, i) => (
                      <div key={i} className="flex justify-between items-center pb-4 border-b border-line last:border-0 last:pb-0">
                        <span className="text-txtmuted text-[.8rem]">{sp.label}</span>
                        <span className="text-txt text-[.82rem] font-semibold">{sp.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 space-y-3">
                    <Link href={`/${locale}/contact`}
                      className="btn btn-primary w-full justify-center text-[.8rem]">
                      {t("requestService")}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                    <a href="tel:+213551995568" className="btn btn-secondary w-full justify-center text-[.8rem]">
                      {t("callNow")}
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative h-[300px] overflow-hidden">
        <Image src="/images/hero-generators.png" alt="Contact" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 h-full container flex flex-col items-center justify-center text-center">
          <AnimatedSection>
            <h3 className="text-xl lg:text-2xl font-extrabold text-white mb-3 tracking-tight">{t("interestedCta")}</h3>
            <p className="text-white/35 mb-6">
              <span className="text-orange font-bold">+213 551 99 55 68</span>
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-primary">{tc("contactUs")}</Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
