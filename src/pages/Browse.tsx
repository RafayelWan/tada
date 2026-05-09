import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Avatar } from "../components/ui/Avatar";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Textarea } from "../components/ui/Input";
import { companions, type Companion } from "../data/content";
import { useApp } from "../store/useApp";
import { cn } from "../lib/utils";

export function Browse() {
  const { setPage, openHome, applyTo, appliedIds, openDetail } = useApp();
  const [index, setIndex] = useState(0);
  const [applying, setApplying] = useState<Companion | null>(null);

  const list = useMemo(() => companions, []);

  const current = list[index];

  function next() {
    setIndex((i) => Math.min(list.length - 1, i + 1));
  }
  function prev() {
    setIndex((i) => Math.max(0, i - 1));
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col relative">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <button
          className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center text-ink-700"
          onClick={() => openHome("companions")}
          aria-label="返回"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex-1">
          <div className="text-[12px] text-ink-500">去联结 · 开盲盒</div>
          <div className="text-[15px] font-semibold text-ink-900">
            为你精选了 {list.length} 个同频的她
          </div>
        </div>
        <div className="text-[11px] text-ink-500">
          {index + 1} / {list.length}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center justify-start px-5 pt-2 pb-4 scrollbar-hide">
        {current && (
          <CompanionCard
            key={current.id}
            c={current}
            applied={appliedIds.includes(current.id)}
            onDada={() => setApplying(current)}
            onOpen={() => openDetail(current)}
          />
        )}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={prev}
            disabled={index === 0}
            className="w-11 h-11 rounded-full bg-white border border-ink-100 flex items-center justify-center shadow-soft disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-[12px] text-ink-500">左右切换</span>
          <button
            onClick={next}
            disabled={index === list.length - 1}
            className="w-11 h-11 rounded-full bg-white border border-ink-100 flex items-center justify-center shadow-soft disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {applying && (
        <ApplyPanel
          c={applying}
          onClose={() => setApplying(null)}
          onSend={(msg) => {
            applyTo(applying, msg);
            setApplying(null);
            // show waiting animation on card; then auto-accept after short pause
            setTimeout(() => {
              setPage("match");
            }, 1400);
          }}
        />
      )}
    </div>
  );
}

function CompanionCard({
  c,
  applied,
  onDada,
  onOpen,
}: {
  c: Companion;
  applied: boolean;
  onDada: () => void;
  onOpen: () => void;
}) {
  return (
    <div
      className="w-full rounded-[28px] bg-white shadow-soft border border-white/80 overflow-hidden animate-fadeUp"
      onClick={onOpen}
      role="button"
    >
      <div className="relative h-44 bg-gradient-to-br from-blush-100 via-blush-200 to-mauve-200 flex items-end p-5">
        <div className="absolute inset-0 opacity-60 pointer-events-none">
          <div className="absolute top-3 left-6 w-20 h-20 rounded-full bg-white/30 blur-xl" />
          <div className="absolute bottom-2 right-10 w-16 h-16 rounded-full bg-mauve-100/40 blur-xl" />
        </div>
        <div className="relative flex items-end gap-3">
          <Avatar name={c.name} emoji={c.emoji} size={72} className="ring-4 ring-white" />
          <div className="mb-1">
            <div className="text-[17px] font-semibold text-ink-900">
              {c.name}
            </div>
            <div className="text-[12px] text-ink-700">
              {c.city} · {c.age} · {c.profession}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <div className="text-[11px] text-mauve-400 mb-1.5 tracking-wider">
            AI 同频摘要
          </div>
          <p className="text-[14px] leading-relaxed text-ink-900">
            ⭐ {c.aiSummary}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {c.tags.map((t) => (
            <Badge key={t} variant="mauve">
              {t}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {c.scenarios.map((s) => (
            <Badge key={s} variant="blush">
              {s}
            </Badge>
          ))}
        </div>

        <div className="pt-1 flex items-center justify-between">
          <div className="text-[11px] text-ink-500">点卡片查看她的三观 →</div>
          {applied ? (
            <WaitingButton />
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDada();
              }}
              className="group relative overflow-hidden px-6 h-11 rounded-full bg-gradient-to-br from-blush-400 to-blush-500 text-white shadow-glow active:scale-[0.98] flex items-center gap-2"
            >
              <Heart size={16} className="fill-white" />
              <span className="dada-font text-xl leading-none">Dada</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function WaitingButton() {
  return (
    <div className="px-6 h-11 rounded-full bg-ink-100 text-ink-500 flex items-center gap-1.5 text-[13px]">
      <span>等待联结</span>
      <DadaDots />
    </div>
  );
}

export function DadaDots() {
  return (
    <span className="inline-flex items-baseline gap-0.5">
      {"Dada".split("").map((ch, i) => (
        <span
          key={i}
          className="dada-font text-blush-500 inline-block animate-bounceDot"
          style={{ animationDelay: `${i * 0.12}s` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

function ApplyPanel({
  c,
  onClose,
  onSend,
}: {
  c: Companion;
  onClose: () => void;
  onSend: (msg: string) => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const ok = msg.trim().length >= 10;

  return (
    <div className="absolute inset-0 z-40 flex items-end">
      <div className="absolute inset-0 bg-ink-900/30" onClick={onClose} />
      <div className="relative w-full bg-cream rounded-t-[28px] shadow-[0_-10px_40px_-10px_rgba(141,90,116,0.35)] p-5 pb-6 animate-fadeUp max-h-[88%] overflow-y-auto scrollbar-hide">
        <div className="w-12 h-1.5 bg-ink-100 rounded-full mx-auto mb-4" />
        <div className="flex items-start gap-3 mb-4">
          <Avatar name={c.name} emoji={c.emoji} size={48} />
          <div>
            <div className="text-[15px] font-semibold text-ink-900">
              发起联结申请
            </div>
            <div className="text-[12px] text-ink-500">
              向 {c.name} · 基于她的三观回答生成的建议 ↓
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {c.icebreakers.map((line) => (
            <button
              key={line}
              onClick={() => {
                setPicked(line);
                setMsg(line);
              }}
              className={cn(
                "w-full text-left px-4 py-3 rounded-2xl border text-[13px] leading-relaxed transition",
                picked === line
                  ? "bg-blush-50 border-blush-300 text-ink-900"
                  : "bg-white border-ink-100 text-ink-700 hover:border-blush-200"
              )}
            >
              <span className="text-blush-500 mr-1">✦</span>
              {line}
            </button>
          ))}
        </div>

        <Textarea
          rows={4}
          value={msg}
          placeholder="点击上方建议，或自己写（至少 10 字）"
          onChange={(e) => setMsg(e.target.value)}
        />
        <div className="flex items-center justify-between text-[11px] mt-2">
          <span className={cn(!ok ? "text-blush-500" : "text-ink-500")}>
            {!ok
              ? "多写几个字让对方感受到你的诚意"
              : "看起来很真诚！"}
          </span>
          <span className="text-ink-500">{msg.length} 字</span>
        </div>

        <Button
          size="lg"
          className="w-full mt-4"
          disabled={!ok}
          onClick={() => onSend(msg.trim())}
        >
          发送申请
        </Button>
      </div>
    </div>
  );
}
