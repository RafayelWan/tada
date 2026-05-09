import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, MoreHorizontal, Send, Calendar, ShieldCheck, Sparkles } from "lucide-react";
import { Avatar } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { useApp, type ChatMessage } from "../store/useApp";
import { chatIcebreakerSuggestions, safeKeywords } from "../data/content";
import { cn } from "../lib/utils";

export function Chat() {
  const {
    matchTarget,
    profile,
    chatMessages,
    addChat,
    acceptActivity,
    activeDemand,
    openHome,
    openRating,
    triggerSafeCheck,
    safeCheckOpen,
    closeSafeCheck,
    dismissSafeCheck,
  } = useApp();

  const [input, setInput] = useState("");
  const [icebreakerIdx, setIcebreakerIdx] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const personalizedIcebreaker = useMemo(() => {
    if (!matchTarget) return chatIcebreakerSuggestions[0];
    const pool = [...matchTarget.icebreakers, ...chatIcebreakerSuggestions];
    return pool[icebreakerIdx % pool.length];
  }, [matchTarget, icebreakerIdx]);

  const myMessageCount = chatMessages.filter((m) => m.from === "me" && m.kind !== "activity-card").length;

  useEffect(() => {
    if (myMessageCount > 1) setHidden(true);
  }, [myMessageCount]);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatMessages]);

  function send() {
    const t = input.trim();
    if (!t) return;
    addChat({ from: "me", kind: "text", text: t });
    setInput("");
    setHidden(true);

    if (safeKeywords.some((k) => t.includes(k))) {
      setTimeout(() => triggerSafeCheck(), 400);
    }

    setTimeout(() => {
      const replies = [
        "嗯！我也是这么觉得的~",
        "哇这个点我也想过，你是怎么发现自己在意这个的？",
        "同频同频，要不我们定个时间？",
        "我这周末其实也有点想去，能聊具体吗？",
      ];
      addChat({
        from: "them",
        kind: "text",
        text: replies[Math.floor(Math.random() * replies.length)],
      });
    }, 900);
  }

  if (!matchTarget) return null;

  return (
    <div className="flex-1 min-h-0 flex flex-col relative bg-[#F7EFE9]">
      <TopBar
        name={matchTarget.name}
        emoji={matchTarget.emoji}
        onBack={() => openHome("messages")}
        onMenu={() => setMenuOpen(true)}
        demand={activeDemand?.title ?? ""}
      />

      <div
        ref={listRef}
        className="flex-1 min-h-0 overflow-y-auto px-4 py-3 scrollbar-hide"
      >
        {!hidden && (
          <IcebreakerCard
            text={personalizedIcebreaker}
            onChange={() => setIcebreakerIdx((i) => i + 1)}
            onUse={() => setInput(personalizedIcebreaker)}
          />
        )}

        <div className="space-y-2 pt-2">
          {chatMessages.map((m, idx) => (
            <Bubble
              key={m.id}
              m={m}
              showTime={
                idx === 0 ||
                m.ts - chatMessages[idx - 1].ts > 5 * 60 * 1000
              }
              meName={profile.nickname || "你"}
              themName={matchTarget.name}
              themEmoji={matchTarget.emoji}
              onAccept={() => acceptActivity(m.id)}
            />
          ))}
        </div>
      </div>

      {safeCheckOpen && (
        <SafeCheck onClose={closeSafeCheck} onDismiss={dismissSafeCheck} />
      )}

      {menuOpen && (
        <SafetyMenu
          onClose={() => setMenuOpen(false)}
          onRate={() => {
            setMenuOpen(false);
            openRating(matchTarget);
          }}
        />
      )}

      {activityOpen && (
        <ActivityPicker
          onClose={() => setActivityOpen(false)}
          onSend={(text) => {
            addChat({
              from: "me",
              kind: "activity-card",
              activity: {
                scene: "日常",
                city: profile.city,
                title: text,
                time: "本周末",
                people: 2,
                desc: "",
                budget: "无所谓",
              },
              accepted: false,
            });
            setActivityOpen(false);
          }}
        />
      )}

      <div className="px-3 pt-2 pb-4 bg-white/85 backdrop-blur border-t border-ink-100/60">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivityOpen(true)}
            className="w-11 h-11 shrink-0 rounded-full bg-blush-100 text-blush-500 flex items-center justify-center"
          >
            <Calendar size={18} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="说点什么…"
            className="flex-1 h-11 px-4 rounded-full bg-white border border-ink-100 outline-none focus:border-blush-300 text-[14px]"
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-blush-400 to-blush-500 text-white flex items-center justify-center shadow-soft disabled:opacity-40"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="flex justify-end mt-2">
          <button
            onClick={() => openRating(matchTarget)}
            className="text-[12px] text-ink-500 underline-offset-2 hover:underline"
          >
            见面后去评价 →
          </button>
        </div>
      </div>
    </div>
  );
}

function TopBar({
  name,
  emoji,
  onBack,
  onMenu,
  demand,
}: {
  name: string;
  emoji: string;
  onBack: () => void;
  onMenu: () => void;
  demand: string;
}) {
  return (
    <div className="bg-white/80 backdrop-blur border-b border-ink-100/60">
      <div className="px-4 pt-3 pb-2 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-ink-100/60 flex items-center justify-center text-ink-700"
        >
          <ChevronLeft size={18} />
        </button>
        <Avatar name={name} emoji={emoji} size={36} />
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-semibold text-ink-900 truncate">
            {name}
          </div>
          <div className="text-[11px] text-ink-500 truncate">
            {demand ? `共同活动：${demand}` : "已配对 · Tada"}
          </div>
        </div>
        <button
          onClick={onMenu}
          className="w-9 h-9 rounded-full bg-ink-100/60 flex items-center justify-center text-ink-700"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}

function IcebreakerCard({
  text,
  onChange,
  onUse,
}: {
  text: string;
  onChange: () => void;
  onUse: () => void;
}) {
  return (
    <div className="mx-1 my-3 rounded-2xl bg-gradient-to-br from-mauve-50 to-blush-50 border border-mauve-100 p-4 animate-fadeUp">
      <div className="flex items-center gap-1.5 text-[11px] text-mauve-500 mb-2">
        <Sparkles size={12} />
        <span>AI 联结建议（基于她的三观回答）</span>
      </div>
      <p className="text-[14px] leading-relaxed text-ink-900">{text}</p>
      <div className="flex gap-2 mt-3">
        <Button size="sm" variant="soft" onClick={onUse}>
          用这句
        </Button>
        <Button size="sm" variant="ghost" onClick={onChange}>
          换一条
        </Button>
      </div>
    </div>
  );
}

function Bubble({
  m,
  showTime,
  meName,
  themName,
  themEmoji,
  onAccept,
}: {
  m: ChatMessage;
  showTime: boolean;
  meName: string;
  themName: string;
  themEmoji: string;
  onAccept: () => void;
}) {
  const mine = m.from === "me";
  return (
    <div>
      {showTime && (
        <div className="text-center text-[11px] text-ink-500 my-2">
          {new Date(m.ts).toLocaleTimeString("zh-CN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      )}
      <div className={cn("flex items-end gap-2", mine ? "justify-end" : "justify-start")}>
        {!mine && <Avatar name={themName} emoji={themEmoji} size={28} />}
        {m.kind === "activity-card" && m.activity ? (
          <div
            className={cn(
              "max-w-[75%] rounded-2xl p-3 border animate-fadeUp",
              mine
                ? "bg-white border-blush-100"
                : "bg-white border-ink-100"
            )}
          >
            <div className="flex items-center gap-1.5 text-[11px] text-blush-500 mb-1">
              <Calendar size={12} />
              活动卡片
            </div>
            <div className="text-[14px] font-semibold text-ink-900">
              {m.activity.title}
            </div>
            <div className="text-[12px] text-ink-500 mt-1">
              {m.activity.scene} · {m.activity.city} · {m.activity.time}
              {m.activity.timeDetail ? ` · ${m.activity.timeDetail}` : ""}
            </div>
            {m.activity.desc && (
              <div className="text-[12px] text-ink-700 mt-2 leading-relaxed">
                {m.activity.desc}
              </div>
            )}
            <div className="pt-3">
              {m.accepted ? (
                <div className="text-[12px] text-sage-500 flex items-center gap-1">
                  <ShieldCheck size={12} /> {mine ? themName : meName} 确认参与
                </div>
              ) : mine ? (
                <div className="text-[12px] text-ink-500">
                  等待对方确认…
                </div>
              ) : (
                <Button size="sm" onClick={onAccept}>
                  确认参加
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "max-w-[75%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed animate-fadeUp",
              mine
                ? "bg-gradient-to-br from-blush-300 to-blush-400 text-white rounded-br-md"
                : "bg-white text-ink-900 border border-ink-100 rounded-bl-md"
            )}
          >
            {m.text}
          </div>
        )}
        {mine && <div className="w-6" />}
      </div>
    </div>
  );
}

function SafeCheck({
  onClose,
  onDismiss,
}: {
  onClose: () => void;
  onDismiss: () => void;
}) {
  return (
    <div className="absolute inset-0 z-40 flex items-end">
      <div className="absolute inset-0 bg-ink-900/25" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-[28px] p-5 pb-6 animate-fadeUp">
        <div className="w-12 h-1.5 bg-ink-100 rounded-full mx-auto mb-3" />
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-sage-100 text-sage-500 flex items-center justify-center shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div className="flex-1">
            <div className="text-[15px] font-semibold text-ink-900">
              你们好像要见面了 👀
            </div>
            <div className="text-[13px] text-ink-500 mt-1 leading-relaxed">
              要开启「安全 Check-in」吗？预计返回时间到时会提醒你～
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => {
              onDismiss();
            }}
          >
            不用了
          </Button>
          <Button className="flex-1" onClick={onClose}>
            开启
          </Button>
        </div>
      </div>
    </div>
  );
}

function SafetyMenu({
  onClose,
  onRate,
}: {
  onClose: () => void;
  onRate: () => void;
}) {
  const items = [
    { label: "见面后评价", hint: "写下你的感受", action: onRate, tone: "primary" },
    { label: "举报", hint: "疑似非女性/骚扰/诈骗…", action: onClose, tone: "normal" },
    { label: "拉黑", hint: "对方不再看到你", action: onClose, tone: "normal" },
    { label: "屏蔽消息提醒", hint: "关闭该会话的推送", action: onClose, tone: "normal" },
  ];
  return (
    <div className="absolute inset-0 z-40 flex items-end">
      <div className="absolute inset-0 bg-ink-900/25" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-[28px] p-4 pb-5 animate-fadeUp">
        <div className="w-12 h-1.5 bg-ink-100 rounded-full mx-auto mb-3" />
        <div className="divide-y divide-ink-100">
          {items.map((it) => (
            <button
              key={it.label}
              onClick={it.action}
              className="w-full text-left py-3.5 px-2 flex items-center justify-between"
            >
              <div>
                <div
                  className={cn(
                    "text-[15px] font-medium",
                    it.tone === "primary" ? "text-blush-500" : "text-ink-900"
                  )}
                >
                  {it.label}
                </div>
                <div className="text-[12px] text-ink-500 mt-0.5">{it.hint}</div>
              </div>
              <span className="text-ink-300">›</span>
            </button>
          ))}
        </div>
        <Button variant="ghost" className="w-full mt-2" onClick={onClose}>
          取消
        </Button>
      </div>
    </div>
  );
}

function ActivityPicker({
  onClose,
  onSend,
}: {
  onClose: () => void;
  onSend: (t: string) => void;
}) {
  const { activeDemand } = useApp();
  const options = [
    activeDemand?.title || "周六下午一起逛展",
    "这周末一起喝咖啡看书",
    "下周找时间一起普拉提",
  ].filter(Boolean);
  return (
    <div className="absolute inset-0 z-40 flex items-end">
      <div className="absolute inset-0 bg-ink-900/25" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-[28px] p-5 pb-6 animate-fadeUp">
        <div className="w-12 h-1.5 bg-ink-100 rounded-full mx-auto mb-3" />
        <div className="text-[15px] font-semibold text-ink-900 mb-1">
          约活动 📅
        </div>
        <div className="text-[12px] text-ink-500 mb-4">
          从你已创建的活动中选一个，或新建一个。
        </div>
        <div className="space-y-2">
          {options.map((t, i) => (
            <button
              key={i}
              onClick={() => onSend(t)}
              className="w-full text-left p-3 rounded-2xl border border-ink-100 bg-cream hover:border-blush-200 text-[14px] text-ink-900"
            >
              {t}
            </button>
          ))}
        </div>
        <Button
          variant="secondary"
          className="w-full mt-3"
          onClick={() => onSend("去新建活动…")}
        >
          去新建活动
        </Button>
        <Button variant="ghost" className="w-full mt-1" onClick={onClose}>
          取消
        </Button>
      </div>
    </div>
  );
}
