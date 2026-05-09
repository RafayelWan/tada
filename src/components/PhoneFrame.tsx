import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-full flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      <div className="relative">
        <div
          className="absolute -inset-8 rounded-[60px] bg-gradient-to-br from-white/50 via-blush-100/40 to-mauve-100/40 blur-2xl opacity-60 -z-10 pointer-events-none"
          aria-hidden
        />
        <div
          className="relative bg-[#FBF7F3] rounded-[44px] shadow-[0_30px_80px_-20px_rgba(141,90,116,0.35)] border border-white/80 overflow-hidden"
          style={{
            width: "min(390px, calc(100vw - 24px))",
            height: "min(820px, calc(100vh - 24px))",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-7 text-[11px] font-semibold text-ink-900/80 z-40 pointer-events-none">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span>●●●</span>
              <span>100%</span>
            </span>
          </div>
          <div className="absolute inset-0 pt-8 flex flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
}
