import { ChevronRight, Settings, Sparkles } from "lucide-react";
import { Avatar } from "../../components/ui/Avatar";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { companions, activities } from "../../data/content";
import { useApp } from "../../store/useApp";

export function Mine() {
  const {
    profile,
    matchedIds,
    appliedIds,
    publishedActivities,
    setPage,
    resetAll,
  } = useApp();

  const myCompanions = companions.filter(
    (c) => matchedIds.includes(c.id) || appliedIds.includes(c.id)
  );
  // 默认兜底 2 个"想去"的活动，让 Demo 有内容可看
  const myActivities = [
    ...publishedActivities.map((p, i) => ({
      id: `mine-${i}`,
      title: p.title,
      scene: p.scene,
      city: p.city,
      time: p.time,
    })),
    ...activities.slice(0, 2).map((a) => ({
      id: a.id,
      title: a.title,
      scene: a.scene,
      city: a.city,
      time: a.time,
    })),
  ];

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <div className="text-[18px] font-semibold text-ink-900">我的</div>
        <button
          aria-label="设置"
          className="w-9 h-9 rounded-full bg-white/70 border border-ink-100 flex items-center justify-center text-ink-700"
          onClick={() => resetAll()}
        >
          <Settings size={16} />
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-4 scrollbar-hide">
        <ProfileCard />

        <Section title="我的场景">
          <div className="flex flex-wrap gap-2">
            {profile.scenarios.length > 0 ? (
              profile.scenarios.map((s) => (
                <Badge key={s} variant="blush">
                  {s}
                </Badge>
              ))
            ) : (
              <span className="text-[12px] text-ink-500">
                还没选，去完善画像
              </span>
            )}
          </div>
        </Section>

        <Section title={`我的搭子 (${myCompanions.length})`}>
          {myCompanions.length === 0 ? (
            <EmptyMini text="试试下方 ✨ 开一个搭子盲盒" />
          ) : (
            <div className="space-y-2">
              {myCompanions.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-2xl bg-white border border-ink-100 flex items-center gap-3"
                >
                  <Avatar name={c.name} emoji={c.emoji} size={40} />
                  <div className="flex-1">
                    <div className="text-[13px] font-medium text-ink-900">
                      {c.name}
                    </div>
                    <div className="text-[11px] text-ink-500">{c.city}</div>
                  </div>
                  {matchedIds.includes(c.id) ? (
                    <Badge variant="sage">已搭上</Badge>
                  ) : (
                    <Badge variant="muted">等待联结</Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </Section>

        <Section title={`参加的活动 (${myActivities.length})`}>
          {myActivities.length === 0 ? (
            <EmptyMini text="还没参加活动" />
          ) : (
            <div className="space-y-2">
              {myActivities.slice(0, 4).map((a) => (
                <div
                  key={a.id}
                  className="p-3 rounded-2xl bg-white border border-ink-100"
                >
                  <div className="text-[13px] font-medium text-ink-900 line-clamp-1">
                    {a.title}
                  </div>
                  <div className="text-[11px] text-ink-500 mt-0.5">
                    {a.scene} · {a.city} · {a.time}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>

        <Section title="我的三观">
          {profile.values.length === 0 ? (
            <EmptyMini text="还没填，去完善画像" />
          ) : (
            <div className="space-y-2">
              {profile.values.map((v) => (
                <div
                  key={v.qId}
                  className="p-3 rounded-2xl bg-white border border-ink-100"
                >
                  <div className="text-[12px] text-mauve-400 mb-1">✦ 三观</div>
                  <div className="text-[13px] font-medium text-ink-900 leading-snug">
                    {v.question}
                  </div>
                  <p className="text-[12px] text-ink-700 mt-1.5 leading-relaxed whitespace-pre-wrap">
                    {v.answer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Section>

        <Button
          variant="ghost"
          className="w-full mt-4 text-ink-500"
          onClick={() => setPage("profile")}
        >
          完善 / 修改画像 →
        </Button>
      </div>
    </div>
  );
}

function ProfileCard() {
  const { profile } = useApp();
  return (
    <div className="p-4 rounded-3xl bg-gradient-to-br from-blush-50 via-cream to-mauve-50 border border-white/70 shadow-soft flex items-center gap-3 mb-4">
      <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blush-300 to-mauve-400 flex items-center justify-center shadow-soft shrink-0">
        <span className="text-3xl">{profile.avatarEmoji || "✨"}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <div className="text-[16px] font-semibold text-ink-900 truncate">
            {profile.nickname || "还没取名字"}
          </div>
          <Sparkles size={14} className="text-mauve-400" />
        </div>
        <div className="text-[12px] text-ink-500 mt-0.5">
          {[profile.city, profile.age, profile.profession]
            .filter(Boolean)
            .join(" · ") || "去完善画像"}
        </div>
      </div>
      <ChevronRight size={18} className="text-ink-300" />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <div className="text-[13px] font-medium text-ink-900 mb-2">{title}</div>
      {children}
    </div>
  );
}

function EmptyMini({ text }: { text: string }) {
  return (
    <div className="text-[12px] text-ink-500 py-2">
      {text}
    </div>
  );
}
