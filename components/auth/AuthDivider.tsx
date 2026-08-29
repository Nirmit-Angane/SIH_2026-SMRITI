"use client";

export function AuthDivider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t-2 border-[#1a1c1c]"></div>
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="px-3 bg-[#f9f9f8] text-[#1a1c1c] font-label-caps uppercase font-bold">or continue with</span>
      </div>
    </div>
  );
}
