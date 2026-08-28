"use client";

import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Clock, Activity, FileText } from "lucide-react";

export default function CaregiverSection() {
  return (
    <section className="py-24 bg-smriti-surface overflow-hidden">
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
              Families stay connected, <span className="text-smriti-primary">without feeling overwhelmed.</span>
            </h2>
            <p className="text-xl text-smriti-muted mb-8 leading-relaxed">
              We replace complicated medical charts with simple, natural-language summaries. Caregivers can monitor activity, participation, and daily routines at a glance.
            </p>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-smriti-primary">
              <div className="flex gap-4">
                <FileText className="w-8 h-8 text-smriti-primary shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-smriti-muted uppercase tracking-wider mb-2">Weekly Summary</h4>
                  <p className="text-lg font-medium text-smriti-text italic">
                    "This week, Amma completed 5 memory activities. Picture activities were her most consistent activity. She missed 1 hydration reminder on Tuesday."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-[32px] shadow-xl border border-gray-100"
          >
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
              <div>
                <h3 className="text-2xl font-bold text-smriti-text">Caregiver Dashboard</h3>
                <p className="text-smriti-muted">Viewing: Amma</p>
              </div>
              <div className="text-sm font-medium text-smriti-primary bg-smriti-primary/10 px-3 py-1 rounded-full flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Synced just now
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-smriti-muted">Activities</h4>
                  <Activity className="w-5 h-5 text-smriti-primary" />
                </div>
                <p className="text-3xl font-black text-smriti-text mb-1">3 <span className="text-lg font-medium text-smriti-muted">done</span></p>
                <p className="text-sm text-smriti-success font-medium flex items-center gap-1"><TrendingUp className="w-4 h-4"/> Consistent</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-smriti-muted">Reminders</h4>
                  <CheckCircle2 className="w-5 h-5 text-smriti-accent" />
                </div>
                <p className="text-3xl font-black text-smriti-text mb-1">4 <span className="text-lg font-medium text-smriti-muted">/ 5</span></p>
                <p className="text-sm text-smriti-muted font-medium">1 pending</p>
              </div>
            </div>
            
            <div className="mt-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
               <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-smriti-muted">Participation Rate</h4>
                  <span className="text-xl font-bold text-smriti-primary">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-smriti-primary h-3 rounded-full" style={{ width: '78%' }}></div>
                </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
