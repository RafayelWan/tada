import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Avatar } from "../components/ui/Avatar";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { useApp } from "../store/useApp";
import { companions } from "../data/content";
import { cn } from "../lib/utils";

const TABS = ["我的三观", "我的场景", "我发布的需求", "我的搭子"] as const;

export function Detail() {
  const { detailTarget, openHome, appliedIds, matchedIds, openRating } =
    useApp();
  const [tab, setTab] = useState<(typeof TABS)[number]>("我的三观");
  const c = detailTarget;
  if (!c) return null;

  const myCompanions = companions.filter((x) =>
    matchedIds.includes(x.id) || appliedIds.includes(x.id)
  );

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="px-5 pt-3 pb-2 flex items-center">
        <button
          className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center text-ink-700"
          onClick={() => openHome("companions")}
        >
          <ChevronLeft size={18} />
        </button>
      </div>
      <div className="px-5 pt-2 flex items-center gap-4">
        <Avatar name={c.name} emoji={c.emoji} size={72} className="ring-4 ring-white shadow-soft" />
        <div>
          <div className="text-[18px] font-semibold text-ink-900">{c.name}</div>
          <div className="text-[12px] text-ink-500">
            {c.city} · {c.age} · {c.profession}
          </div>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {c.tags.map((t) => (
              <Badge key={t} variant="mauve">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 mt-4 flex gap-1.5 overflow-x-auto scrollbar-hide">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 h-8 rounded-full text-[13px] shrink-0 transition",
              tab === t
                ? "bg-blush-100 text-blush-500"
                : "bg-white/70 text-ink-700 border border-ink-100"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-5 pt-4 pb-24 scrollbar-hide">
        {tab === "我的三观" && (
          <div className="space-y-3 animate-fadeUp">
            {c.values.map((v) => (
              <div
                key={v.q}
                className="p-4 rounded-2xl bg-white border border-ink-100 shadow-soft"
              >
                <div className="text-[12px] text-mauve-400 mb-1.5 tracking-wide">
                  ✦ 三观
                </div>
                <div className="text-[14px] font-medium text-ink-900 leading-relaxed">
                  {v.q}
                </div>
                <p className="text-[13px] text-ink-700 mt-2 leading-relaxed whitespace-pre-wrap">
                  {v.a}
                </p>
              </div>
            ))}
          </div>
        )}
        {tab === "我的场景" && (
          <div className="animate-fadeUp">
            <div className="flex flex-wrap gap-2">
              {c.scenarios.map((s) => (
                <Badge key={s} variant="blush" className="text-[13px] py-1.5 px-4">
                  {s}
                </Badge>
              ))}
            </div>
            <div className="mt-6 text-[13px] text-ink-700 leading-relaxed">
              兴趣：
              <div className="mt-2 flex flex-wrap gap-2">
                {c.hobbies.map((h) => (
                  <Badge key={h} variant="muted">
                    {h}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === "我发布的需求" && (
          <div className="space-y-3 animate-fadeUp">
            {c.posts.map((p, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white border border-ink-100 shadow-soft"
              >
                <div className="text-[14px] font-medium text-ink-900">
                  {p.title}
                </div>
                <div className="text-[12px] text-ink-500 mt-1">
                  {p.scene} · {p.time}
                </div>
              </div>
            ))}
            {c.posts.length === 0 && (
              <div className="text-[13px] text-ink-500">她暂时还没有发布需求～</div>
            )}
          </div>
        )}
        {tab === "我的搭子" && (
          <div className="animate-fadeUp">
            {myCompanions.length === 0 ? (
              <div className="text-[13px] text-ink-500">
                还没有匹配的搭子，去广场看看吧～
              </div>
            ) : (
              <div className="space-y-3">
                {myCompanions.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 rounded-2xl bg-white border border-ink-100 flex items-center gap-3"
                  >
                    <Avatar name={m.name} emoji={m.emoji} size={44} />
                    <div className="flex-1">
                      <div className="text-[14px] font-medium text-ink-900">
                        {m.name}
                      </div>
                      <div className="text-[12px] text-ink-500">{m.city}</div>
                    </div>
                    {matchedIds.includes(m.id) ? (
                      <Badge variant="sage">已搭上</Badge>
                    ) : (
                      <Badge variant="muted">等待联结</Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="px-5 pt-3 pb-5 border-t border-ink-100/60 bg-cream/80 backdrop-blur flex gap-2">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => openHome("companions")}
        >
          返回广场
        </Button>
        <Button
          className="flex-1"
          onClick={() => openRating(c)}
          variant="mauve"
        >
          见面后评价
        </Button>
      </div>
    </div>
  );
}
