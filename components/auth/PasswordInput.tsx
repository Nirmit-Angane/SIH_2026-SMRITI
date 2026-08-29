"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function PasswordInput({ label = "Password", error, className = "", ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={props.id} className="font-label-caps text-xs font-bold uppercase text-[#1a1c1c]">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1a1c1c]">
          <Lock className="w-5 h-5" />
        </div>
        <input
          {...props}
          type={showPassword ? "text" : "password"}
          className={`w-full h-13 pl-11 pr-12 bg-white neo-border-2 font-body-md text-lg text-[#1a1c1c] focus:outline-none focus:bg-[#dbe1ff]/20 focus:border-[#2563eb] transition-all ${error ? 'border-[#ba1a1a] bg-[#ffdad6]/30' : ''}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#1a1c1c] hover:text-[#2563eb] focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      {error && (
        <p className="font-bold text-xs text-[#ba1a1a] mt-1">{error}</p>
      )}
    </div>
  );
}
