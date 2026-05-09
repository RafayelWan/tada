import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Avatar } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { Textarea } from "../components/ui/Input";
import { ratingTagsNegative, ratingTagsPositive } from "../data/content";
import { useApp } from "../store/useApp";
import { cn } from "../lib/utils";

const rematch = ["愿意", "不太想", "无所谓"] as const;

export function Rating() {
  const { ratingTarget, setPage, openHome } = useApp();
  const [posTags, setPos] = useState<string[]>([]);
  const [negTags, setNeg] = useState<string[]>([]);
  const [msg, setMsg] = useState("");
  const [willing, setWilling] = useState<(typeof rematch)[number] | "">("");
  const [done, setDone] = useState(false);

  if (!ratingTarget) return null;

  function toggle(list: string[], setList: (x: string[]) => void, v: string) {
    setList(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  }

  const canSubmit =
    (posTags.length > 0 || negTags.length > 0 || msg.trim()) && willing;

  if (done) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 animate-fadeUp">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-mauve-100/70 animate-breathe" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-mauve-300 to-blush-300 flex items-center justify-center text-white shadow-glow">
            💜
          </div>
        </div>
        <div className="mt-6 text-center">
          <div className="text-[18px] font-semibold text-ink-900">
            感谢你的反馈
          </div>
          <div className="text-[13px] text-ink-500 mt-2 leading-relaxed max-w-[18rem]">
            帮助我们为姐妹们创造更好的空间 💜
          </div>
        </div>
        <div className="w-full space-y-2 mt-10">
          <Button
            size="lg"
            className="w-full"
            onClick={() => setPage("chat")}
          >
            回到聊天
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => openHome("messages")}
          >
            回到首页
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <button
          className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center text-ink-700"
          onClick={() => setPage("chat")}
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex-1">
          <div className="text-[12px] text-ink-500">搭子评价</div>
          <div className="text-[15px] font-semibold text-ink-900">
            这次跟 {ratingTarget.name} 的体验怎么样？
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-5 pt-3 pb-4 scrollbar-hide">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-ink-100 shadow-soft">
          <Avatar name={ratingTarget.name} emoji={ratingTarget.emoji} size={48} />
          <div>
            <div className="text-[14px] font-semibold text-ink-900">
              {ratingTarget.name}
            </div>
            <div className="text-[12px] text-ink-500">
              {ratingTarget.city}
            </div>
          </div>
        </div>

        <Section title="正向标签" desc="欣赏对方的地方，多选">
          <div className="flex flex-wrap gap-2">
            {ratingTagsPositive.map((t) => (
              <TagChip
                key={t}
                active={posTags.includes(t)}
                onClick={() => toggle(posTags, setPos, t)}
                tone="sage"
              >
                {t}
              </TagChip>
            ))}
          </div>
        </Section>

        <Section title="不太舒服的地方" desc="可选，如果遇到可以提醒我们">
          <div className="flex flex-wrap gap-2">
            {ratingTagsNegative.map((t) => (
              <TagChip
                key={t}
                active={negTags.includes(t)}
                onClick={() => toggle(negTags, setNeg, t)}
                tone="blush"
              >
                {t}
              </TagChip>
            ))}
          </div>
        </Section>

        <Section title="留一句温暖的话" desc="会显示给对方">
          <Textarea
            rows={3}
            value={msg}
            placeholder="例如：和你一起看展很自在～"
            onChange={(e) => setMsg(e.target.value)}
          />
        </Section>

        <Section
          title="是否愿意再搭"
          desc="不展示，仅用于推荐算法 · 不推送至对方"
        >
          <div className="flex flex-wrap gap-2">
            {rematch.map((r) => (
              <button
                key={r}
                onClick={() => setWilling(r)}
                className={cn(
                  "px-4 py-1.5 rounded-full border text-[13px] transition",
                  willing === r
                    ? "bg-mauve-100 border-mauve-300 text-mauve-500"
                    : "bg-white/80 border-ink-100 text-ink-700"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </Section>
      </div>

      <div className="px-5 pt-3 pb-5 border-t border-ink-100/60 bg-cream/80 backdrop-blur">
        <Button
          size="lg"
          className="w-full"
          disabled={!canSubmit}
          onClick={() => setDone(true)}
        >
          提交评价
        </Button>
      </div>
    </div>
  );
}

function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <div className="text-[14px] font-medium text-ink-900">{title}</div>
      {desc && <div className="text-[12px] text-ink-500 mt-0.5 mb-3">{desc}</div>}
      {children}
    </div>
  );
}

function TagChip({
  active,
  onClick,
  children,
  tone,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  tone: "sage" | "blush";
}) {
  const tones = {
    sage: "bg-sage-50 border-sage-200 text-sage-500",
    blush: "bg-blush-50 border-blush-200 text-blush-500",
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 rounded-full text-[13px] border transition",
        active ? tones[tone] : "bg-white/80 border-ink-100 text-ink-700"
      )}
    >
      {children}
    </button>
  );
}
