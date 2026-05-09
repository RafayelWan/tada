import { Button } from "../components/ui/Button";
import { useApp } from "../store/useApp";
import { brandCopy } from "../data/content";

export function Welcome() {
  const { setPage } = useApp();
  return (
    <div className="flex-1 flex flex-col items-center justify-between px-8 py-10">
      <div className="w-full flex flex-col items-center mt-10">
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-blush-200/30 blur-2xl animate-breathe" />
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-blush-300 via-blush-400 to-mauve-400 flex items-center justify-center shadow-glow">
            <span className="dada-font text-white text-4xl">Tada</span>
          </div>
        </div>
        <h1 className="text-3xl font-semibold text-ink-900 tracking-tight">
          Tada · 她搭
        </h1>
        <p className="mt-3 text-ink-700 text-[15px]">{brandCopy.tagline}</p>
        <p className="mt-2 text-ink-500 text-[13px] text-center leading-relaxed max-w-[16rem]">
          {brandCopy.heroSub}
        </p>
      </div>

      <div className="w-full flex flex-col items-center gap-3 text-ink-700 text-sm">
        <Row emoji="🌸" text="三观同频，第一维度" />
        <Row emoji="🤝" text="姐妹、伙伴，非恋爱" />
        <Row emoji="🕊️" text="安全、友好、克制的空间" />
      </div>

      <div className="w-full space-y-3">
        <Button size="lg" className="w-full" onClick={() => setPage("profile")}>
          开始搭塔
        </Button>
        <p className="text-center text-[12px] text-ink-500">
          继续即表示你已阅读并同意《社区公约》
        </p>
      </div>
    </div>
  );
}

function Row({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-center gap-3 bg-white/60 border border-white/80 rounded-full px-4 py-2 w-full shadow-soft">
      <span>{emoji}</span>
      <span>{text}</span>
    </div>
  );
}
