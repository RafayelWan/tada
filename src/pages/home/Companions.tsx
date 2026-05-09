import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Avatar } from "../../components/ui/Avatar";
import { Badge } from "../../components/ui/Badge";
import { companions } from "../../data/content";
import { useApp } from "../../store/useApp";
import { cn } from "../../lib/utils";

const SUB_TABS = ["发现", "同城"] as const;

export function Companions() {
  const { openDetail, profile } = useApp();
  const [sub, setSub] = useState<(typeof SUB_TABS)[number]>("发现");

  const list =
    sub === "同城" && profile.city
      ? companions.filter((c) => c.city === profile.city)
      : companions;
  const displayList = list.length ? list : companions;

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <TopBar sub={sub} setSub={setSub} />

      <div className="flex-1 min-h-0 overflow-y-auto px-4 pt-3 pb-4 scrollbar-hide">
        <TipBanner />
        <div className="grid grid-cols-2 gap-3">
          {displayList.map((c) => (
            <CompanionCell key={c.id} c={c} onClick={() => openDetail(c)} />
          ))}
          {/* 再重复几张凑瀑布流感 */}
          {displayList.slice(0, 3).map((c) => (
            <CompanionCell
              key={`r-${c.id}`}
              c={c}
              onClick={() => openDetail(c)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TopBar({
  sub,
  setSub,
}: {
  sub: (typeof SUB_TABS)[number];
  setSub: (s: (typeof SUB_TABS)[number]) => void;
}) {
  return (
    <div className="px-4 pt-3 pb-2 bg-cream/80 backdrop-blur">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-9 rounded-full bg-white/80 border border-ink-100 flex items-center px-3 gap-2">
          <Search size={14} className="text-ink-500" />
          <span className="text-[12px] text-ink-500">
            搜一个同频的她
          </span>
        </div>
      </div>
      <div className="flex gap-5 pl-1">
        {SUB_TABS.map((s) => (
          <button
            key={s}
            onClick={() => setSub(s)}
            className="relative pb-2"
          >
            <span
              className={cn(
                "text-[15px] transition",
                sub === s
                  ? "text-ink-900 font-semibold"
                  : "text-ink-500"
              )}
            >
              {s}
            </span>
            {sub === s && (
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-0.5 w-5 rounded-full bg-gradient-to-r from-blush-400 to-mauve-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function TipBanner() {
  return (
    <div className="mb-3 p-3 rounded-2xl bg-gradient-to-br from-blush-50 to-mauve-50 border border-mauve-100 flex items-start gap-2">
      <Sparkles size={14} className="text-mauve-500 mt-0.5 shrink-0" />
      <p className="text-[12px] text-ink-700 leading-relaxed">
        不知道找谁搭？试试中间的 <span className="text-blush-500 font-medium">去联结 ✨</span>，给你开盲盒。
      </p>
    </div>
  );
}

function CompanionCell({
  c,
  onClick,
}: {
  c: (typeof companions)[number];
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-2xl bg-white border border-white/80 shadow-soft overflow-hidden active:scale-[0.98] transition"
    >
      <div className="relative h-32 bg-gradient-to-br from-blush-100 via-blush-200 to-mauve-200 flex items-end p-3">
        <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-white/40 blur-md" />
        <div className="absolute bottom-2 left-3 w-8 h-8 rounded-full bg-mauve-100/50 blur-sm" />
        <Avatar
          name={c.name}
          emoji={c.emoji}
          size={48}
          className="ring-2 ring-white relative z-10"
        />
      </div>
      <div className="p-3 space-y-1.5">
        <div className="flex items-baseline gap-1.5">
          <div className="text-[13px] font-semibold text-ink-900 truncate">
            {c.name}
          </div>
          <div className="text-[10px] text-ink-500">{c.city}</div>
        </div>
        <p className="text-[11px] text-ink-700 line-clamp-2 leading-snug">
          ⭐ {c.aiSummary}
        </p>
        <div className="flex flex-wrap gap-1 pt-0.5">
          {c.tags.slice(0, 2).map((t) => (
            <Badge key={t} variant="mauve" className="text-[10px] px-2 py-0">
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </button>
  );
}
