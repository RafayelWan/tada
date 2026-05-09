import { useMemo, useState } from "react";
import { ChevronLeft, Sparkles } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input, Textarea } from "../components/ui/Input";
import { cities, sceneTypes } from "../data/content";
import { useApp, type DemandPost } from "../store/useApp";
import { cn } from "../lib/utils";

const times = ["今天", "明天", "本周末", "下周", "具体日期"];
const budgets = ["无所谓", "人均 50 以下", "50–200", "200+"];

export function Publish() {
  const { profile, publishActivity, openHome } = useApp();
  const [scene, setScene] = useState("");
  const [city, setCity] = useState(profile.city);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [timeDetail, setTimeDetail] = useState("");
  const [people, setPeople] = useState(1);
  const [desc, setDesc] = useState("");
  const [budget, setBudget] = useState("无所谓");
  const [shake, setShake] = useState(false);
  const [toast, setToast] = useState(false);

  const canSubmit = useMemo(
    () => scene && city && title.trim() && time && people >= 1,
    [scene, city, title, time, people]
  );

  function submit() {
    if (!canSubmit) return;
    const post: DemandPost = {
      scene,
      city,
      title: title.trim(),
      time,
      timeDetail,
      people,
      desc: desc.trim(),
      budget,
    };
    publishActivity(post);
    setToast(true);
    setTimeout(() => {
      setToast(false);
      openHome("activities");
    }, 1600);
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col relative">
      <TopBar onBack={() => openHome("activities")} />

      <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-4 scrollbar-hide">
        <div className="pt-2 pb-4">
          <h2 className="text-xl font-semibold text-ink-900">创建活动</h2>
          <p className="text-ink-500 text-[13px] mt-1">
            30 秒写完，靠「三观同频」帮你筛掉不合适的人。
          </p>
        </div>

        <Block title="场景" required>
          <div className="grid grid-cols-4 gap-2">
            {sceneTypes.map((s) => (
              <button
                key={s.key}
                onClick={() => setScene(s.label)}
                className={cn(
                  "rounded-2xl py-3 border flex flex-col items-center gap-1 transition",
                  scene === s.label
                    ? "bg-white shadow-soft border-blush-300"
                    : "bg-white/70 border-ink-100 hover:border-blush-200"
                )}
              >
                <span className="text-xl">{s.emoji}</span>
                <span className="text-[11px] text-ink-700">{s.label}</span>
              </button>
            ))}
          </div>
        </Block>

        <Block title="活动城市" required>
          <select
            className="w-full h-11 px-4 rounded-2xl bg-white/80 border border-ink-100 text-ink-900 outline-none focus:border-blush-300 appearance-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">选择城市…</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-ink-500 mt-2">
            默认是你的主要活动城市，可以修改。
          </p>
        </Block>

        <Block title="需求标题" required>
          <div className={cn("transition", shake && "animate-[pop_0.2s]")}>
            <Input
              value={title}
              placeholder="比如：周六晚上 798 看展，找一起"
              maxLength={20}
              onChange={(e) => {
                if (e.target.value.length >= 20 && title.length < 20) {
                  setShake(true);
                  setTimeout(() => setShake(false), 200);
                }
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-ink-500 mt-1">
            <span>言简意赅，20 字内</span>
            <span>{title.length}/20</span>
          </div>
        </Block>

        <Block title="活动时间" required>
          <div className="flex flex-wrap gap-2">
            {times.map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={cn(
                  "px-4 py-1.5 rounded-full border text-[13px] transition",
                  time === t
                    ? "bg-blush-100 border-blush-300 text-blush-500"
                    : "bg-white/80 border-ink-100 text-ink-700"
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <Input
            className="mt-3"
            value={timeDetail}
            placeholder="具体时间（选填）如：周六 19:00 – 22:00"
            onChange={(e) => setTimeDetail(e.target.value)}
          />
        </Block>

        <Block title="人数需求" required>
          <div className="flex items-center gap-3">
            <StepperBtn onClick={() => setPeople(Math.max(1, people - 1))}>
              －
            </StepperBtn>
            <span className="w-10 text-center text-[15px] font-semibold text-ink-900">
              {people}
            </span>
            <StepperBtn onClick={() => setPeople(people + 1)}>＋</StepperBtn>
            <span className="text-[12px] text-ink-500 ml-1">（想约几个姐妹）</span>
          </div>
        </Block>

        <Block title="补充描述">
          <Textarea
            rows={3}
            value={desc}
            maxLength={100}
            placeholder="再写一点吧：想要什么样的同伴？有什么偏好？"
            onChange={(e) => setDesc(e.target.value)}
          />
          <div className="text-right text-[11px] text-ink-500 mt-1">
            {desc.length}/100
          </div>
        </Block>

        <Block title="消费偏好">
          <div className="flex flex-wrap gap-2">
            {budgets.map((b) => (
              <button
                key={b}
                onClick={() => setBudget(b)}
                className={cn(
                  "px-4 py-1.5 rounded-full border text-[13px] transition",
                  budget === b
                    ? "bg-mauve-100 border-mauve-300 text-mauve-500"
                    : "bg-white/80 border-ink-100 text-ink-700"
                )}
              >
                {b}
              </button>
            ))}
          </div>
        </Block>
      </div>

      <div className="px-6 pt-2 pb-5 border-t border-ink-100/60 bg-cream/80 backdrop-blur">
        <Button
          size="lg"
          className="w-full"
          disabled={!canSubmit}
          onClick={submit}
        >
          发布活动
        </Button>
      </div>

      {toast && <SuccessToast />}
    </div>
  );
}

function TopBar({ onBack }: { onBack: () => void }) {
  return (
    <div className="px-5 pt-3 pb-2 flex items-center gap-3">
      <button
        onClick={onBack}
        className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center text-ink-700"
        aria-label="返回"
      >
        <ChevronLeft size={18} />
      </button>
      <div className="flex-1">
        <div className="text-[12px] text-ink-500">活动 · 创建</div>
        <div className="text-[15px] font-semibold text-ink-900">
          写一个你想去的活动
        </div>
      </div>
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blush-300 to-mauve-300 shadow-soft flex items-center justify-center text-white">
        <Sparkles size={16} />
      </div>
    </div>
  );
}

function Block({
  title,
  required,
  children,
}: {
  title: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="text-[13px] font-medium text-ink-900 mb-2">
        {title}
        {required && <span className="text-blush-400 ml-1">*</span>}
      </div>
      {children}
    </div>
  );
}

function StepperBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 rounded-full bg-white border border-ink-100 text-ink-900 flex items-center justify-center shadow-soft active:scale-95"
    >
      {children}
    </button>
  );
}

function SuccessToast() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-ink-900/20 backdrop-blur-sm">
      <div className="bg-white rounded-3xl px-8 py-6 shadow-glow flex flex-col items-center animate-pop">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-blush-200/50 animate-ripple" />
          <div className="absolute inset-0 rounded-full bg-blush-300/40 animate-ripple [animation-delay:0.3s]" />
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blush-300 to-mauve-300 flex items-center justify-center text-white">
            <span className="dada-font text-lg">da</span>
          </div>
        </div>
        <div className="mt-4 text-ink-900 font-semibold">活动已发布</div>
        <div className="text-[12px] text-ink-500 mt-1">啪嗒 · 姐妹可以看到啦</div>
      </div>
    </div>
  );
}
