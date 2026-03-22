"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import AnimatedSection from "@/components/AnimatedSection";

const fade = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <About />
      <Clients />
      <CTA />
    </>
  );
}

/* ══════════════════ HERO ══════════════════ */
function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");
  const locale = useLocale();
  const [current, setCurrent] = useState(0);

  const slides = [
    { title: t("slide1Title"), desc: t("slide1Desc"), img: "/images/hero1.jpg", imgMobile: "/images/hero-industrial.png" },
    { title: t("slide2Title"), desc: t("slide2Desc"), img: "/images/hero2.jpg", imgMobile: "/images/hero-airport.png" },
    { title: t("slide3Title"), desc: t("slide3Desc"), img: "/images/hero3.jpg", imgMobile: "/images/hero-generators.png" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-black">
      {/* Background images */}
      {slides.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-[1500ms] ${i === current ? "opacity-100" : "opacity-0"}`}>
          <Image src={s.imgMobile} alt={s.title} fill className="object-cover lg:hidden" sizes="100vw" priority={i === 0} />
          <Image src={s.img} alt={s.title} fill className="object-cover hidden lg:block" sizes="100vw" priority={i === 0} />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />

      {/* Content */}
      <div className="relative z-10 h-full container flex flex-col justify-end pb-20 lg:pb-28">
        <motion.div key={current} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8, ease: [.25,.1,.25,1] }}>

          <div className="section-label text-white/50 mb-6">
            {tc("since")}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] max-w-4xl mb-6">
            {slides[current].title}
          </h1>

          <p className="text-white/50 text-base lg:text-lg max-w-xl mb-10 leading-relaxed">
            {slides[current].desc}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href={`/${locale}/services`} className="btn btn-primary">
              {t("cta")}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link href={`/${locale}/contact`} className="btn btn-ghost">{t("ctaContact")}</Link>
          </div>
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 end-8 lg:end-12 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-500 ${i === current ? "w-10 bg-orange" : "w-4 bg-white/20 hover:bg-white/40"}`} />
          ))}
        </div>
      </div>

    </section>
  );
}

/* ══════════════════ COUNT UP ══════════════════ */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return <div ref={ref} className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-orange tabular-nums mb-1 min-w-[70px] sm:min-w-[80px]">{count}{suffix}</div>;
}

/* ══════════════════ STATS ══════════════════ */
function Stats() {
  const t = useTranslations("about");

  const stats = [
    { target: 10, suffix: "+", label: t("stats.years") },
    { target: 500, suffix: "+", label: t("stats.projects") },
    { target: 50, suffix: "+", label: t("stats.clients") },
    { target: 48, suffix: "", label: t("stats.coverage") },
  ];

  return (
    <section className="py-14 lg:py-20 bg-bg relative overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`text-center ${i < stats.length - 1 ? "lg:border-e lg:border-line/40" : ""}`}
            >
              <CountUp target={s.target} suffix={s.suffix} />
              <div className="text-txtsec text-[.65rem] sm:text-[.7rem] font-medium uppercase tracking-[.15em] mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ SERVICES ══════════════════ */
function Services() {
  const t = useTranslations("services");
  const locale = useLocale();

  const items = [
    {
      slug: "truck-maintenance", title: t("electrical.title"), desc: t("electrical.desc"),
      img: "/images/service-electrical.png", num: "01",
    },
    {
      slug: "construction-equipment", title: t("airport.title"), desc: t("airport.desc"),
      img: "/images/service-airport.png", num: "02",
    },
    {
      slug: "mobile-service", title: t("equipment.title"), desc: t("equipment.desc"),
      img: "/images/service-equipment.png", num: "03",
    },
  ];

  return (
    <section className="bg-bgalt relative overflow-hidden">
      {/* Section header */}
      <div className="section bg-bg">
        <div className="container">
          <AnimatedSection>
            <div className="section-label mb-6">{t("sectionTag")}</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-txt tracking-tight leading-[1.1]">
                {t("title")}
              </h2>
              <p className="text-txtsec text-[.95rem] leading-relaxed lg:text-right max-w-md lg:ml-auto">
                {t("subtitle")}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Service cards - full-width alternating */}
      {items.map((s, i) => (
        <div key={i} className="border-t border-line">
          <div className="container">
            <AnimatedSection>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[500px] ${i % 2 === 1 ? "direction-reverse" : ""}`}>
                {/* Image */}
                <div className={`relative overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative h-[300px] lg:h-full w-full">
                    <Image src={s.img} alt={s.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {/* Number overlay */}
                    <div className="absolute top-4 left-4 z-20 text-[8rem] lg:text-[10rem] font-black text-orange/40 leading-none select-none pointer-events-none">
                      {s.num}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex flex-col justify-center p-8 lg:p-16 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="section-label mb-5">Service {s.num}</div>
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-txt tracking-tight mb-5 leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-txtsec text-[.92rem] leading-[1.85] mb-8 max-w-md">
                    {s.desc}
                  </p>
                  <Link href={`/${locale}/services/${s.slug}`}
                    className="inline-flex items-center gap-3 text-orange text-[.8rem] font-semibold uppercase tracking-wider group">
                    {t("learnMore")}
                    <span className="w-8 h-px bg-orange group-hover:w-12 transition-all" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ══════════════════ ABOUT ══════════════════ */
function About() {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <section className="section-lg bg-bg relative overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Image */}
          <AnimatedSection>
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
                <Image src="/images/about-team.png" alt="NASMO team" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-orange text-black p-6 lg:p-8">
                <div className="text-3xl lg:text-4xl font-black leading-none mb-1">10+</div>
                <div className="text-[.7rem] font-bold uppercase tracking-wider opacity-70">{t("yearsLabel")}</div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right - Content */}
          <AnimatedSection>
            <div className="section-label mb-6">{t("sectionTag")}</div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-txt tracking-tight leading-[1.1] mb-6">
              {t("title")}
            </h2>
            <p className="text-txtsec text-[.92rem] leading-[1.9] mb-5">
              {t("description")}
            </p>
            <p className="text-txtsec text-[.92rem] leading-[1.9] mb-8">
              {t("description2")}
            </p>

            {/* Key points */}
            <div className="space-y-4 mb-10">
              {[t("service1"), t("service2"), t("service3")].map((s, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-orange" />
                  </div>
                  <span className="text-txt text-[.88rem] font-medium">{s}</span>
                </div>
              ))}
            </div>

            <Link href={`/${locale}/a-propos`} className="btn btn-outline-orange">
              {t("aboutBtn")}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ CLIENTS ══════════════════ */
function Clients() {
  const t = useTranslations("clients");
  const names = ["GCB", "Cosider", "ETRHB", "SAPTA", "Sonatrach", "Sonelgaz", "ENGOA", "Naftal", "SEROR", "GICA"];

  return (
    <section className="section bg-bgalt border-t border-line">
      <div className="container">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="section-label justify-center mb-6">{t("sectionTag")}</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-txt tracking-tight">
              {t("title")}
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-line">
          {names.map((name, i) => (
            <AnimatedSection key={i}>
              <div className="bg-bgalt flex items-center justify-center h-28 hover:bg-surface transition-colors group cursor-default">
                <span className="text-txtmuted text-lg font-bold tracking-wider group-hover:text-orange transition-colors">
                  {name}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ CTA ══════════════════ */
function CTA() {
  const locale = useLocale();
  const t = useTranslations("common");

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[400px] lg:h-[500px]">
        <Image src="/images/hero-generators.png" alt="NASMO mobile service" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 h-full container flex flex-col items-center justify-center text-center">
          <AnimatedSection>
            <div className="section-label text-white/50 justify-center mb-6">{t("contactUs")}</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5 max-w-2xl leading-tight">
              {t("ctaHeading")}
            </h2>
            <p className="text-white/40 mb-10 text-lg">
              {t("ctaCall")} <span className="text-orange font-bold">+213 551 99 55 68</span>
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                {t("contactUs")}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a href="tel:+213551995568" className="btn btn-ghost">
                {t("callNow")}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
