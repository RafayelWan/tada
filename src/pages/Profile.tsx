import { useMemo, useState } from "react";
import { ChevronLeft, Sparkles } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input, Textarea } from "../components/ui/Input";
import { Progress } from "../components/ui/Progress";
import { Badge } from "../components/ui/Badge";
import {
  ageRanges,
  cities,
  hobbies,
  professions,
  scenarioTags,
  valueQuestions,
} from "../data/content";
import { useApp, type UserProfile } from "../store/useApp";
import { cn } from "../lib/utils";

const STEPS = ["基础信息", "三观问答", "场景标签"];
const AVATAR_CHOICES = ["✨", "🌸", "🌿", "🪷", "🌾", "🌰", "🦌", "🍃", "☕️", "🍓"];

export function ProfileSetup() {
  const { setPage, setProfile, openHome } = useApp();
  const [step, setStep] = useState(0);

  // step 1 state
  const [nickname, setNick] = useState("");
  const [avatarEmoji, setAvatarEmoji] = useState("✨");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [profession, setProfession] = useState("");
  // 大类 至少 1 个；小类可选可不选
  const [pickedGroups, setPickedGroups] = useState<string[]>([]);
  const [pickedSub, setPickedSub] = useState<string[]>([]);

  // step 2 state — pick 3 questions from 10
  const [selectedQs, setSelectedQs] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // step 3 state
  const [scenarios, setScenarios] = useState<string[]>([]);

  const canStep1 =
    nickname.trim() && age && city && profession && pickedGroups.length > 0;

  const step2Valid = useMemo(() => {
    if (selectedQs.length !== 3) return false;
    return selectedQs.every((q) => {
      const a = (answers[q] ?? "").trim();
      const def = valueQuestions.find((x) => x.id === q)!;
      if (def.type === "choice") return !!a;
      if (def.type === "fill") return a.length >= 5;
      return a.length >= 20 && a.length <= 150;
    });
  }, [selectedQs, answers]);

  const canStep3 = scenarios.length > 0;

  const progress = ((step + 1) / STEPS.length) * 100;

  function toggleGroup(g: string) {
    setPickedGroups((prev) => {
      if (prev.includes(g)) {
        // 收起大类时一并清掉它下面选中的小类
        const items = hobbies.find((x) => x.group === g)?.items ?? [];
        setPickedSub((s) => s.filter((h) => !items.includes(h)));
        return prev.filter((x) => x !== g);
      }
      return [...prev, g];
    });
  }
  function toggleSub(h: string) {
    setPickedSub((p) =>
      p.includes(h) ? p.filter((x) => x !== h) : [...p, h]
    );
  }
  function toggleQ(id: string) {
    setSelectedQs((qs) => {
      if (qs.includes(id)) return qs.filter((x) => x !== id);
      if (qs.length >= 3) return qs;
      return [...qs, id];
    });
  }
  function toggleScene(k: string) {
    setScenarios((s) => {
      if (s.includes(k)) return s.filter((x) => x !== k);
      if (s.length >= 3) return s;
      return [...s, k];
    });
  }

  function finish() {
    const profile: UserProfile = {
      nickname: nickname.trim(),
      avatarEmoji,
      age,
      city,
      profession,
      // 合并大类 + 选中的小类，便于后续展示
      hobbies: [...pickedGroups, ...pickedSub],
      scenarios,
      values: selectedQs.map((qId) => {
        const def = valueQuestions.find((x) => x.id === qId)!;
        return { qId, question: def.question, answer: answers[qId] ?? "" };
      }),
      completed: true,
    };
    setProfile(profile);
    openHome("companions");
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="px-6 pt-4 pb-2 flex items-center gap-3">
        <button
          className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center text-ink-700"
          onClick={() => (step === 0 ? setPage("welcome") : setStep(step - 1))}
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-ink-500">
              Step {step + 1} / {STEPS.length}
            </span>
            <span className="text-xs text-ink-700 font-medium">
              {STEPS[step]}
            </span>
          </div>
          <Progress value={progress} />
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-4 scrollbar-hide">
        {step === 0 && (
          <div className="space-y-5 animate-fadeUp">
            <Header
              title="先认识一下你"
              desc="真实、不夸张、留点空间给惊喜。"
            />

            <Field label="头像" required>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blush-300 to-mauve-400 flex items-center justify-center shadow-soft shrink-0">
                  <span className="text-3xl">{avatarEmoji}</span>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow">
                    <Sparkles size={10} className="text-blush-400" />
                  </span>
                </div>
                <div className="flex-1 flex flex-wrap gap-1.5">
                  {AVATAR_CHOICES.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setAvatarEmoji(e)}
                      className={cn(
                        "w-8 h-8 rounded-full border text-lg flex items-center justify-center transition",
                        avatarEmoji === e
                          ? "bg-blush-100 border-blush-300"
                          : "bg-white/80 border-ink-100 hover:border-blush-200"
                      )}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-ink-500 mt-2">
                默认星星 ✨，也可以选一个小图标。
              </p>
            </Field>

            <Field label="昵称" required>
              <Input
                value={nickname}
                maxLength={12}
                placeholder="最多 12 字"
                onChange={(e) => setNick(e.target.value)}
              />
              <span className="text-[11px] text-ink-500 mt-1 block">
                {nickname.length}/12
              </span>
            </Field>
            <Field label="年龄" required>
              <div className="flex flex-wrap gap-2">
                {ageRanges.map((a) => (
                  <Chip
                    key={a}
                    active={age === a}
                    onClick={() => setAge(a)}
                  >
                    {a}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label="主要活动城市" required>
              <div className="relative">
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
              </div>
            </Field>
            <Field label="职业/身份" required>
              <div className="flex flex-wrap gap-2">
                {professions.map((p) => (
                  <Chip
                    key={p}
                    active={profession === p}
                    onClick={() => setProfession(p)}
                  >
                    {p}
                  </Chip>
                ))}
              </div>
              <p className="text-[11px] text-ink-500 mt-2">
                用一个宽泛的标签描述自己就好。
              </p>
            </Field>
            <Field label="爱好" required>
              <p className="text-[11px] text-ink-500 mb-3">
                先选至少 1 个大类，展开后可继续选小类（小类选填）。
              </p>
              <div className="space-y-2.5">
                {hobbies.map((g) => {
                  const groupActive = pickedGroups.includes(g.group);
                  return (
                    <div
                      key={g.group}
                      className={cn(
                        "rounded-2xl border transition",
                        groupActive
                          ? "border-blush-300 bg-white shadow-soft"
                          : "border-ink-100 bg-white/70"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => toggleGroup(g.group)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left"
                      >
                        <span className="text-[14px] font-medium text-ink-900">
                          {g.group}
                        </span>
                        <span
                          className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center text-[11px]",
                            groupActive
                              ? "bg-blush-400 border-blush-400 text-white"
                              : "border-ink-300 text-ink-300"
                          )}
                        >
                          {groupActive ? "✓" : "+"}
                        </span>
                      </button>
                      {groupActive && (
                        <div className="px-4 pb-3 flex flex-wrap gap-2 animate-fadeUp">
                          {g.items.map((h) => (
                            <Chip
                              key={h}
                              active={pickedSub.includes(h)}
                              onClick={() => toggleSub(h)}
                            >
                              {h}
                            </Chip>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4 animate-fadeUp">
            <Header
              title="三观问答"
              desc={`选 3 题认真回答（${selectedQs.length}/3）。这是匹配的核心。`}
            />
            {valueQuestions.map((q) => {
              const active = selectedQs.includes(q.id);
              const disabled = !active && selectedQs.length >= 3;
              return (
                <div
                  key={q.id}
                  className={cn(
                    "rounded-2xl border transition overflow-hidden",
                    active
                      ? "border-blush-300 bg-white shadow-soft"
                      : "border-ink-100 bg-white/70",
                    disabled && "opacity-50"
                  )}
                >
                  <button
                    type="button"
                    className="w-full text-left px-4 py-3 flex items-start gap-3"
                    onClick={() => !disabled && toggleQ(q.id)}
                  >
                    <span
                      className={cn(
                        "mt-0.5 w-5 h-5 rounded-full border shrink-0 flex items-center justify-center",
                        active
                          ? "bg-blush-400 border-blush-400 text-white"
                          : "border-ink-300"
                      )}
                    >
                      {active && "✓"}
                    </span>
                    <span className="text-[14px] leading-relaxed text-ink-900">
                      {q.question}
                    </span>
                  </button>
                  {active && (
                    <div className="px-4 pb-4 pt-1 space-y-2 animate-fadeUp">
                      {q.type === "choice" ? (
                        <div className="flex flex-col gap-2">
                          {q.options!.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() =>
                                setAnswers((a) => ({ ...a, [q.id]: opt }))
                              }
                              className={cn(
                                "text-left px-4 py-2.5 rounded-xl border text-[13px] transition",
                                answers[q.id] === opt
                                  ? "border-blush-300 bg-blush-50 text-blush-500"
                                  : "border-ink-100 bg-white text-ink-700 hover:border-blush-200"
                              )}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      ) : q.type === "fill" ? (
                        <>
                          <Input
                            value={answers[q.id] ?? ""}
                            placeholder={q.placeholder}
                            onChange={(e) =>
                              setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
                            }
                          />
                          <p className="text-[11px] text-blush-500">
                            🌟 真诚的回答会让同频的姐妹更容易找到你
                          </p>
                        </>
                      ) : (
                        <>
                          <Textarea
                            rows={4}
                            value={answers[q.id] ?? ""}
                            placeholder={q.placeholder}
                            onChange={(e) =>
                              setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
                            }
                          />
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-blush-500">
                              🌟 真诚的回答会让同频的姐妹更容易找到你
                            </span>
                            <span
                              className={cn(
                                "text-ink-500",
                                (answers[q.id]?.length ?? 0) < 20 &&
                                  "text-blush-500"
                              )}
                            >
                              {answers[q.id]?.length ?? 0}/20–150
                            </span>
                          </div>
                          {(answers[q.id]?.length ?? 0) > 0 &&
                            (answers[q.id]?.length ?? 0) < 20 && (
                              <p className="text-[11px] text-blush-500">
                                至少需要 20 字，让姐妹更了解你
                              </p>
                            )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 animate-fadeUp">
            <Header
              title="场景标签"
              desc={`多选，最多 3 个（${scenarios.length}/3）。`}
            />
            <div className="grid grid-cols-2 gap-3">
              {scenarioTags.map((t) => {
                const active = scenarios.includes(t.key);
                const disabled = !active && scenarios.length >= 3;
                return (
                  <button
                    key={t.key}
                    onClick={() => !disabled && toggleScene(t.key)}
                    className={cn(
                      "rounded-2xl p-4 border text-left transition",
                      active
                        ? "border-blush-300 bg-white shadow-soft"
                        : "border-ink-100 bg-white/70",
                      disabled && "opacity-50"
                    )}
                  >
                    <div className="text-2xl">{t.emoji}</div>
                    <div className="mt-2 text-[14px] font-medium text-ink-900">
                      {t.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="px-6 pt-2 pb-5 border-t border-ink-100/60 bg-cream/80 backdrop-blur">
        {step === 0 && (
          <Button className="w-full" size="lg" disabled={!canStep1} onClick={() => setStep(1)}>
            继续
          </Button>
        )}
        {step === 1 && (
          <Button
            className="w-full"
            size="lg"
            disabled={!step2Valid}
            onClick={() => setStep(2)}
          >
            {selectedQs.length < 3
              ? `还需选择 ${3 - selectedQs.length} 道题目`
              : "继续"}
          </Button>
        )}
        {step === 2 && (
          <Button className="w-full" size="lg" disabled={!canStep3} onClick={finish}>
            完成 · 进入搭塔
          </Button>
        )}
      </div>
    </div>
  );
}

function Header({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="pt-2">
      <h2 className="text-xl font-semibold text-ink-900">{title}</h2>
      <p className="text-ink-500 text-[13px] mt-1">{desc}</p>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[13px] font-medium text-ink-900 mb-2">
        {label}
        {required && <span className="text-blush-400 ml-1">*</span>}
      </div>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 rounded-full text-[13px] transition border",
        active
          ? "bg-blush-100 border-blush-300 text-blush-500"
          : "bg-white/80 border-ink-100 text-ink-700 hover:border-blush-200"
      )}
    >
      {children}
    </button>
  );
}

// quiet unused import
void Badge;
