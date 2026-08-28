"use client";

import { motion } from "framer-motion";
import { ArrowDown, Heart, User, Image as ImageIcon } from "lucide-react";

export default function PersonalMemorySection() {
  return (
    <section className="py-24 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-smriti-text mb-6 leading-tight">
              Turn familiar memories into <span className="text-smriti-accent">meaningful activities.</span>
            </h2>
            <p className="text-xl text-smriti-muted mb-8 leading-relaxed">
              Caregivers can add family photos, names, places and personal memories. Smriti uses these approved memories to create personalized, interactive activities for the elderly user.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-smriti-primary/10 flex items-center justify-center shrink-0">
                  <ImageIcon className="w-6 h-6 text-smriti-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-smriti-text mb-2">1. Add a Memory</h4>
                  <p className="text-lg text-smriti-muted">Upload a photo of a family member, pet, or favorite place.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-smriti-accent/10 flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-smriti-accent" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-smriti-text mb-2">2. Add Context</h4>
                  <p className="text-lg text-smriti-muted">Include their name and relationship to the user.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-smriti-accent/10 flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6 text-smriti-accent" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-smriti-text mb-2">3. Play & Reconnect</h4>
                  <p className="text-lg text-smriti-muted">Smriti transforms this into a gentle recognition game.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Visual Flow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative bg-smriti-bg rounded-[32px] p-8 md:p-12 shadow-inner border border-smriti-primary/10"
          >
            <div className="flex flex-col items-center gap-6">
              {/* Family Photo Card */}
              <div className="bg-white p-4 rounded-2xl shadow-sm w-full max-w-sm border border-gray-100 flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden shrink-0">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rina&style=circle&backgroundColor=b6e3f4" alt="Rina" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-smriti-primary mb-1 uppercase tracking-wider">Family Photo</div>
                  <h4 className="text-xl font-bold text-smriti-text">Rina</h4>
                  <p className="text-smriti-muted">Relationship: Daughter</p>
                </div>
              </div>

              <motion.div 
                animate={{ y: [0, 8, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-smriti-primary/50"
              >
                <ArrowDown className="w-8 h-8" />
              </motion.div>

              {/* Game Generation Card */}
              <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm border-2 border-smriti-primary/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-smriti-primary to-smriti-secondary"></div>
                <div className="text-center mb-6 mt-2">
                  <h4 className="text-lg font-bold text-smriti-muted mb-2">Smriti creates:</h4>
                  <p className="text-2xl font-extrabold text-smriti-text mb-4">"Who is Rina?"</p>
                  
                  <div className="grid gap-3">
                    <div className="bg-smriti-bg p-4 rounded-xl border border-smriti-primary/10 text-lg font-medium text-smriti-text">
                      My Sister
                    </div>
                    <div className="bg-smriti-primary text-white p-4 rounded-xl shadow-sm text-lg font-medium flex justify-between items-center">
                      My Daughter
                      <span className="bg-white/20 px-2 py-1 rounded text-sm">✓</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
