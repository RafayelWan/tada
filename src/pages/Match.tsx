import { useEffect, useState } from "react";
import { Avatar } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { useApp } from "../store/useApp";

// Tada · 水滴声：两滴水 + 一段温润长尾，柔和非恋爱化
function playTadaDrops() {
  try {
    const A =
      (window as unknown as { AudioContext?: typeof AudioContext })
        .AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!A) return;
    const c = new A();
    const t0 = c.currentTime;
    const drop = (freq: number, start: number, dur = 0.6, peak = 0.32) => {
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq * 1.6, t0 + start);
      osc.frequency.exponentialRampToValueAtTime(freq, t0 + start + 0.04);
      g.gain.setValueAtTime(0, t0 + start);
      g.gain.linearRampToValueAtTime(peak, t0 + start + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + start + dur);
      osc.connect(g).connect(c.destination);
      osc.start(t0 + start);
      osc.stop(t0 + start + dur + 0.05);
    };
    drop(523, 0.0); // Ta · C5
    drop(784, 0.22); // Da · G5 (五度)
    // 温润长尾
    const tailOsc = c.createOscillator();
    const tailG = c.createGain();
    tailOsc.type = "sine";
    tailOsc.frequency.value = 523;
    tailG.gain.setValueAtTime(0, t0 + 0.55);
    tailG.gain.linearRampToValueAtTime(0.14, t0 + 0.75);
    tailG.gain.exponentialRampToValueAtTime(0.001, t0 + 1.4);
    tailOsc.connect(tailG).connect(c.destination);
    tailOsc.start(t0 + 0.55);
    tailOsc.stop(t0 + 1.45);
  } catch {
    // 静默降级：不影响视觉
  }
}

export function Match() {
  const { matchTarget, profile, acceptMatch, setPage } = useApp();
  const [phase, setPhase] = useState<"approach" | "ripple" | "message">(
    "approach"
  );

  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase("ripple");
      playTadaDrops();
    }, 800);
    const t2 = setTimeout(() => setPhase("message"), 1600);
    const t3 = setTimeout(() => {
      if (matchTarget) acceptMatch(matchTarget);
    }, 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!matchTarget) return null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blush-100/70 via-cream to-mauve-100/70" />

      <div className="absolute inset-0 flex items-center justify-center">
        {phase !== "approach" && (
          <>
            <span className="absolute w-40 h-40 rounded-full border-2 border-blush-300/60 animate-ripple" />
            <span className="absolute w-40 h-40 rounded-full border-2 border-mauve-300/60 animate-ripple [animation-delay:0.3s]" />
            <span className="absolute w-40 h-40 rounded-full border-2 border-blush-200/60 animate-ripple [animation-delay:0.6s]" />
          </>
        )}
      </div>

      <div className="relative flex items-center justify-center gap-4 z-10">
        <div
          className="transition-transform duration-700 ease-out"
          style={{
            transform:
              phase === "approach"
                ? "translateX(-40px) scale(0.95)"
                : "translateX(0) scale(1)",
          }}
        >
          <Avatar
            name={profile.nickname || "我"}
            size={96}
            className="ring-4 ring-white shadow-soft"
          />
        </div>

        {phase !== "approach" && (
          <div className="relative w-14 h-14 flex items-center justify-center animate-pop">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blush-300 to-mauve-300 shadow-glow" />
            <span className="relative text-white dada-font text-2xl">Tada</span>
          </div>
        )}

        <div
          className="transition-transform duration-700 ease-out"
          style={{
            transform:
              phase === "approach"
                ? "translateX(40px) scale(0.95)"
                : "translateX(0) scale(1)",
          }}
        >
          <Avatar
            name={matchTarget.name}
            emoji={matchTarget.emoji}
            size={96}
            className="ring-4 ring-white shadow-soft"
          />
        </div>
      </div>

      {phase === "message" && (
        <div className="relative z-10 mt-10 flex flex-col items-center animate-fadeUp">
          <div className="text-[22px] font-semibold text-ink-900">
            你们同频了 ✨
          </div>
          <div className="text-[13px] text-ink-500 mt-1.5">
            Tada · 温柔而坚定的 Hello
          </div>
          <Button
            className="mt-8 px-10"
            size="lg"
            onClick={() => setPage("chat")}
          >
            开始聊天
          </Button>
        </div>
      )}
    </div>
  );
}
