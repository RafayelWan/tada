import { useState } from "react";
import { Plus } from "lucide-react";
import { Avatar } from "../../components/ui/Avatar";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { activities, type ActivityCard } from "../../data/content";
import { useApp } from "../../store/useApp";
import { cn } from "../../lib/utils";

const SUB_TABS = ["关注", "发现", "同城"] as const;

export function Activities() {
  const { setPage, profile } = useApp();
  const [sub, setSub] = useState<(typeof SUB_TABS)[number]>("发现");
  const [openId, setOpenId] = useState<string | null>(null);

  const list =
    sub === "同城" && profile.city
      ? activities.filter((a) => a.city === profile.city)
      : sub === "关注"
      ? activities.slice(0, 3)
      : activities;
  const display = list.length ? list : activities;
  const current = display.find((a) => a.id === openId) ?? null;

  return (
    <div className="flex-1 min-h-0 flex flex-col relative">
      <div className="px-4 pt-3 pb-2 bg-cream/80 backdrop-blur">
        <div className="flex gap-5 pl-1">
          {SUB_TABS.map((s) => (
            <button key={s} onClick={() => setSub(s)} className="relative pb-2">
              <span
                className={cn(
                  "text-[15px] transition",
                  sub === s ? "text-ink-900 font-semibold" : "text-ink-500"
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

      <div className="flex-1 min-h-0 overflow-y-auto px-4 pt-3 pb-4 scrollbar-hide">
        <div className="grid grid-cols-2 gap-3">
          {display.map((a) => (
            <ActivityCell
              key={a.id}
              a={a}
              onClick={() => setOpenId(a.id)}
            />
          ))}
          {display.slice(0, 2).map((a) => (
            <ActivityCell
              key={`r-${a.id}`}
              a={a}
              onClick={() => setOpenId(a.id)}
            />
          ))}
        </div>
      </div>

      {/* 右下 floating 创建活动按钮 */}
      <button
        onClick={() => setPage("publish")}
        className="absolute right-4 bottom-5 h-12 pl-4 pr-5 rounded-full bg-gradient-to-br from-blush-400 to-blush-500 text-white shadow-glow flex items-center gap-2 active:scale-95"
      >
        <Plus size={18} strokeWidth={2.4} />
        <span className="text-[13px] font-medium">创建活动</span>
      </button>

      {current && (
        <ActivityDetailSheet
          a={current}
          onClose={() => setOpenId(null)}
          onJoin={() => setOpenId(null)}
        />
      )}
    </div>
  );
}

function ActivityCell({
  a,
  onClick,
}: {
  a: ActivityCard;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-2xl bg-white border border-white/80 shadow-soft overflow-hidden active:scale-[0.98] transition"
    >
      <div className="relative h-28 bg-gradient-to-br from-mauve-100 via-blush-100 to-sage-100 flex items-center justify-center">
        <span className="text-5xl">{a.cover}</span>
      </div>
      <div className="p-3 space-y-1.5">
        <div className="text-[12px] font-semibold text-ink-900 leading-snug line-clamp-2">
          {a.title}
        </div>
        <div className="flex items-center gap-1.5">
          <Avatar name={a.host.name} emoji={a.host.emoji} size={18} />
          <span className="text-[10px] text-ink-500 truncate">
            {a.host.name} · {a.city}
          </span>
        </div>
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[10px] text-ink-500">{a.time}</span>
          <span className="text-[10px] text-blush-500">
            {a.attendees} 人想去
          </span>
        </div>
      </div>
    </button>
  );
}

function ActivityDetailSheet({
  a,
  onClose,
  onJoin,
}: {
  a: ActivityCard;
  onClose: () => void;
  onJoin: () => void;
}) {
  return (
    <div className="absolute inset-0 z-40 flex items-end">
      <div className="absolute inset-0 bg-ink-900/30" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-[28px] p-5 pb-6 animate-fadeUp max-h-[86%] overflow-y-auto scrollbar-hide">
        <div className="w-12 h-1.5 bg-ink-100 rounded-full mx-auto mb-4" />
        <div className="h-32 rounded-2xl bg-gradient-to-br from-mauve-100 via-blush-100 to-sage-100 flex items-center justify-center mb-3">
          <span className="text-6xl">{a.cover}</span>
        </div>
        <div className="text-[16px] font-semibold text-ink-900 leading-snug">
          {a.title}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Avatar name={a.host.name} emoji={a.host.emoji} size={28} />
          <div className="text-[12px] text-ink-700">
            {a.host.name} · {a.host.city}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="blush">{a.scene}</Badge>
          <Badge variant="mauve">{a.time}</Badge>
          <Badge variant="sage">{a.attendees} 人想去</Badge>
        </div>
        {a.desc && (
          <p className="mt-3 text-[13px] text-ink-700 leading-relaxed">
            {a.desc}
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {a.tags.map((t) => (
            <Badge key={t} variant="outline">
              #{t}
            </Badge>
          ))}
        </div>
        <Button size="lg" className="w-full mt-5" onClick={onJoin}>
          申请参加活动
        </Button>
        <Button
          variant="ghost"
          className="w-full mt-1"
          onClick={onClose}
        >
          稍后再看
        </Button>
      </div>
    </div>
  );
}
