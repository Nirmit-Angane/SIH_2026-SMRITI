"use client";

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
    <div className="flex flex-col gap-3 mb-6">
      <label className="font-headline-lg text-lg uppercase font-black text-[#1a1c1c]">
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
              className={`relative flex items-center justify-between p-4 sm:p-5 text-left transition-all ${
                isSelected 
                  ? 'bg-[#dbe1ff] border-[4px] border-[#1a1c1c] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[#00174b]' 
                  : 'bg-white border-[2px] border-[#1a1c1c] hover:bg-[#f4f4f3] text-[#1a1c1c]'
              }`}
            >
              <span className="font-headline-lg text-lg font-black uppercase tracking-tight">
                {role.label}
              </span>
              {isSelected ? (
                <div className="w-7 h-7 bg-[#2563eb] text-white neo-border flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 stroke-[3]" />
                </div>
              ) : (
                <div className="w-7 h-7 bg-white neo-border-2"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
