"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface RoleSelectorProps {
  selectedRole: string;
  onChange: (role: string) => void;
}

export function RoleSelector({ selectedRole, onChange }: RoleSelectorProps) {
  const roles = [
    { id: "patient", label: "For myself" },
    { id: "family", label: "For a family member" },
    { id: "caregiver", label: "For someone I care for" },
  ];

  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-[18px] font-bold text-smriti-text mb-2">
        Who will use SMRITI?
      </label>
      <div className="flex flex-col gap-3">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onChange(role.id)}
              className={`relative flex items-center justify-between p-4 rounded-xl border text-left touch-target transition-all ${
                isSelected 
                  ? 'border-smriti-primary bg-smriti-primary/5 shadow-sm' 
                  : 'border-gray-200 bg-white hover:border-smriti-primary/30'
              }`}
            >
              <span className={`text-lg font-medium ${isSelected ? 'text-smriti-primary' : 'text-smriti-text'}`}>
                {role.label}
              </span>
              {isSelected && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <CheckCircle2 className="w-6 h-6 text-smriti-primary" />
                </motion.div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
