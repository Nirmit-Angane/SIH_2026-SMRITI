"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ACTIVITIES } from "@/lib/activities";
import { useLanguage } from "@/components/LanguageProvider";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export function ActivityGrid() {
  const { t } = useLanguage();
  return (
    <section className="w-full max-w-4xl mx-auto px-4 mb-10">
      <h2 className="text-2xl font-extrabold text-smriti-text mb-6 text-center md:text-left">{t("home.whatToDo") || "What would you like to do?"}</h2>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {ACTIVITIES.map((activity) => {
          const Icon = activity.icon;
          return (
            <motion.div key={activity.id} variants={itemVariants}>
              <Link 
                href={activity.href}
                className="block h-full bg-white border-2 border-smriti-border rounded-[24px] p-6 hover:border-smriti-primary hover:shadow-xl hover:shadow-smriti-primary/5 transition-all duration-300 group"
              >
                <div className="flex items-start gap-5 h-full">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-smriti-surface border border-smriti-primary/20 text-smriti-primary transition-colors group-hover:bg-smriti-primary/10">
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <div className="flex flex-col flex-grow h-full justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-smriti-text mb-1 group-hover:text-smriti-primary transition-colors">{t(`activities.${activity.id}.title`) || activity.title}</h3>
                      <p className="text-lg text-smriti-muted leading-snug">{t(`activities.${activity.id}.desc`) || activity.desc}</p>
                    </div>
                    
                    <div className="inline-flex items-center font-bold text-smriti-primary text-lg gap-2 mt-auto">
                      {t(`common.${activity.cta.toLowerCase().replace(/ /g, "")}`) || activity.cta}
                      <div className="w-8 h-8 rounded-full bg-smriti-primary/10 flex items-center justify-center group-hover:bg-smriti-primary group-hover:text-white transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

// Simple local arrow icon just for this component's CTA styling
function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
