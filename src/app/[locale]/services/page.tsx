"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

export default function ServicesPage() {
  const t = useTranslations("services");
  const locale = useLocale();

  const items = [
    {
      slug: "truck-maintenance", title: t("electrical.title"), desc: t("electrical.desc"),
      img: "/images/service-electrical.png", num: "01",
      feats: [t("electrical.features.f1"), t("electrical.features.f2"), t("electrical.features.f3"), t("electrical.features.f4")],
    },
    {
      slug: "construction-equipment", title: t("airport.title"), desc: t("airport.desc"),
      img: "/images/service-airport.png", num: "02",
      feats: [t("airport.features.f1"), t("airport.features.f2"), t("airport.features.f3"), t("airport.features.f4")],
    },
    {
      slug: "mobile-service", title: t("equipment.title"), desc: t("equipment.desc"),
      img: "/images/service-equipment.png", num: "03",
      feats: [t("equipment.features.f1"), t("equipment.features.f2"), t("equipment.features.f3"), t("equipment.features.f4")],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[550px] overflow-hidden bg-black">
        <Image src="/images/hero-airport.png" alt="Services" fill className="object-cover opacity-60 lg:hidden" sizes="100vw" />
        <Image src="/images/hero2.jpg" alt="Services" fill className="object-cover opacity-60 hidden lg:block" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
        <div className="relative z-10 h-full container flex flex-col justify-end pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <div className="section-label text-white/40 mb-5">{t("sectionTag")}</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
              {t("title")}
            </h1>
            <p className="text-white/35 mt-4 max-w-lg text-base">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      {items.map((s, i) => (
        <section key={i} className={`border-t border-line ${i % 2 === 0 ? "bg-bg" : "bg-bgalt"}`}>
          <div className="container">
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[550px]">
                {/* Image */}
                <div className={`relative overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative h-[350px] lg:h-full w-full">
                    <Image src={s.img} alt={s.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-4 left-4 z-20 text-[8rem] lg:text-[10rem] font-black text-orange/40 leading-none select-none pointer-events-none">
                      {s.num}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex flex-col justify-center p-8 lg:p-16 xl:p-20 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="section-label mb-5">Service {s.num}</div>
                  <h2 className="text-2xl lg:text-4xl font-extrabold text-txt tracking-tight mb-6 leading-tight">
                    {s.title}
                  </h2>
                  <p className="text-txtsec text-[.92rem] leading-[1.9] mb-8 max-w-md">
                    {s.desc}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-10">
                    {s.feats.map((f, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-orange flex-shrink-0" />
                        <span className="text-txt text-[.82rem] font-medium">{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={`/${locale}/services/${s.slug}`}
                    className="inline-flex items-center gap-3 text-orange text-[.8rem] font-semibold uppercase tracking-wider group">
                    {t("learnMore")}
                    <span className="w-8 h-px bg-orange group-hover:w-14 transition-all duration-300" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="relative h-[350px] overflow-hidden">
        <Image src="/images/hero-generators.png" alt="Contact" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 h-full container flex flex-col items-center justify-center text-center">
          <AnimatedSection>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-4 tracking-tight">{t("ctaTitle")}</h3>
            <p className="text-white/35 mb-8">
              {t("ctaPhone")} <span className="text-orange font-bold">+213 551 99 55 68</span>
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-primary">{t("ctaButton")}</Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
