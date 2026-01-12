import React from "react";
import { Check, ArrowRight, ShieldCheck, Zap, Globe, Layout, Search, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CalendarDialog from "@/components/CalendarDialog";

const PricingSection = () => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground font-display mb-4"
          >
            Professional Website, Without Agency Prices
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            I build modern, conversion-focused websites for businesses that want to look credible, fast.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-lg rounded-3xl border border-white/10 shadow-2xl ring-1 ring-white/10 relative overflow-hidden"
        >
          {/* Subtle gradient overlay - Removed */}

          <div className="relative p-8 sm:p-10">
            <div className="flex items-center justify-between gap-x-4">
              <h3 id="tier-professional" className="text-xl font-semibold leading-8 text-foreground">
                Professional Website Package
              </h3>
              <div className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary border border-primary/20">
                Limited-Time Offer
              </div>
            </div>

            <div className="mt-6 flex items-baseline gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-foreground">$250</span>
              <span className="text-sm font-semibold leading-6 text-muted-foreground">USD</span>
              <span className="text-lg text-muted-foreground line-through ml-2">$499</span>
            </div>

            <CalendarDialog>
              <Button className="mt-8 w-full h-12 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300" size="lg">
                Claim This Offer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CalendarDialog>

            <p className="mt-4 text-xs text-center text-muted-foreground">
              One-time payment · No hidden fees · USD pricing only
            </p>

            <div className="mt-10 space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Everything included:</h4>
              <ul role="list" className="space-y-4 text-sm leading-6 text-muted-foreground">
                {[
                  { text: "Up to 5–8 professionally designed pages", icon: Layout },
                  { text: "Modern, conversion-focused layout", icon: Zap },
                  { text: "Fully responsive (mobile, tablet, desktop)", icon: Globe },
                  { text: "CMS access (easy content editing)", icon: ShieldCheck },
                  { text: "SSL & basic performance optimization", icon: ShieldCheck },
                  { text: "Contact forms / lead capture", icon: Mail },
                  { text: "Basic on-page SEO setup", icon: Search },
                  { text: "Launch-ready website", icon: Check },
                ].map((feature, index) => (
                  <li key={index} className="flex gap-x-3 items-center">
                    <div className="flex-none rounded-full bg-primary/10 p-1 text-primary">
                      <feature.icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
