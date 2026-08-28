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
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={props.id} className="text-[16px] font-semibold text-smriti-text">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-smriti-muted">
          <Lock className="w-5 h-5" />
        </div>
        <input
          {...props}
          type={showPassword ? "text" : "password"}
          className={`w-full h-14 pl-12 pr-14 rounded-xl border ${error ? 'border-smriti-error bg-red-50' : 'border-gray-200 bg-gray-50'} text-lg focus:outline-none focus:ring-2 focus:ring-smriti-primary/50 focus:border-smriti-primary transition-all`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-smriti-muted hover:text-smriti-text focus:outline-none focus:text-smriti-primary touch-target"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
        </button>
      </div>
      {error && (
        <p className="text-smriti-error font-medium mt-1">{error}</p>
      )}
    </div>
  );
}
