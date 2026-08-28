"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CheckCircle2 } from "lucide-react";

type Region = "Assam" | "Meghalaya" | "Nagaland" | "Mizoram";

const regionData = {
  Assam: {
    color: "bg-red-700",
    text: "text-red-700",
    bgLight: "bg-red-50",
    pattern: "opacity-10",
    welcome: "স্বাগতম (Swagatom)",
    object: "Xorai & Japi",
    desc: "A culturally familiar theme featuring traditional Assamese symbols, colors, and language support."
  },
  Meghalaya: {
    color: "bg-emerald-700",
    text: "text-emerald-700",
    bgLight: "bg-emerald-50",
    pattern: "opacity-20",
    welcome: "Kumno (Khasi) / Namaste",
    object: "Traditional Shawls",
    desc: "A theme inspired by the lush landscapes and rich weaving traditions of Meghalaya."
  },
  Nagaland: {
    color: "bg-amber-700",
    text: "text-amber-700",
    bgLight: "bg-amber-50",
    pattern: "opacity-15",
    welcome: "Nili (Sumi) / Hello",
    object: "Hornbill Feathers & Spears",
    desc: "Vibrant earthy tones reflecting the rich tribal heritage and festivals of Nagaland."
  },
  Mizoram: {
    color: "bg-indigo-700",
    text: "text-indigo-700",
    bgLight: "bg-indigo-50",
    pattern: "opacity-15",
    welcome: "Chibai",
    object: "Puan (Traditional Cloth)",
    desc: "Cool, calm colors incorporating the distinct patterns of Mizo traditional attire."
  }
};

export default function RegionalSection() {
  const [selectedRegion, setSelectedRegion] = useState<Region>("Assam");
  const regions: Region[] = ["Assam", "Meghalaya", "Nagaland", "Mizoram"];

  return (
    <section className="py-24 bg-smriti-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-smriti-text mb-6">
            One platform. <span className="text-smriti-primary">Many cultures.</span>
          </h2>
          <p className="text-xl text-smriti-muted">
            Smriti uses configurable region-aware content packs to provide culturally familiar themes and community-reviewed content.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left: Selectors */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <h3 className="text-lg font-bold text-smriti-muted mb-4 uppercase tracking-wider">Select a Region Preview</h3>
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`p-5 rounded-2xl flex items-center justify-between text-left transition-all ${
                  selectedRegion === region
                    ? "bg-white shadow-md border-2 border-smriti-primary"
                    : "bg-white/50 border-2 border-transparent hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedRegion === region ? "bg-smriti-primary text-white" : "bg-gray-200 text-gray-500"}`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className={`text-xl font-bold ${selectedRegion === region ? "text-smriti-primary" : "text-smriti-text"}`}>
                    {region}
                  </span>
                </div>
                {selectedRegion === region && (
                  <CheckCircle2 className="w-6 h-6 text-smriti-primary" />
                )}
              </button>
            ))}
            
            <p className="text-sm text-smriti-muted mt-6 italic">
              * Note: Regional themes adapt colors, language strings, and game objects to be locally recognizable. They do not claim to represent an entire diverse state.
            </p>
          </div>

          {/* Right: Dynamic Preview */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRegion}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.4 }}
                className={`w-full aspect-[4/3] rounded-[32px] shadow-lg border-4 border-white p-8 relative overflow-hidden flex flex-col justify-between ${regionData[selectedRegion].bgLight}`}
              >
                {/* Decorative background shape representing pattern */}
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-bl-full ${regionData[selectedRegion].color} ${regionData[selectedRegion].pattern}`}></div>
                <div className={`absolute bottom-0 left-0 w-48 h-48 rounded-tr-full ${regionData[selectedRegion].color} ${regionData[selectedRegion].pattern}`}></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full ${regionData[selectedRegion].color} text-white font-bold text-sm mb-6`}>
                    Active Region: {selectedRegion}
                  </div>
                  
                  <h4 className={`text-4xl md:text-5xl font-extrabold mb-2 ${regionData[selectedRegion].text}`}>
                    {regionData[selectedRegion].welcome}
                  </h4>
                  <p className="text-2xl font-medium text-gray-800 mb-8">
                    Good Morning!
                  </p>
                </div>

                <div className="relative z-10 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50">
                  <h5 className="text-lg font-bold text-gray-800 mb-2">Cultural Objects Pack</h5>
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl ${regionData[selectedRegion].color} opacity-80 flex items-center justify-center text-white text-2xl font-bold`}>
                      {selectedRegion[0]}
                    </div>
                    <div>
                      <p className="font-bold text-xl text-gray-900">{regionData[selectedRegion].object}</p>
                      <p className="text-gray-600">{regionData[selectedRegion].desc}</p>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
