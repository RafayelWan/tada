import { Avatar } from "../../components/ui/Avatar";
import { companions } from "../../data/content";
import { useApp } from "../../store/useApp";

export function Messages() {
  const { matchedIds, appliedIds, chatMessages, setPage, matchTarget } =
    useApp();

  const matched = companions.filter((c) => matchedIds.includes(c.id));
  const applying = companions.filter(
    (c) => appliedIds.includes(c.id) && !matchedIds.includes(c.id)
  );

  const hasAny = matched.length + applying.length > 0;

  const lastText = (() => {
    const t = [...chatMessages]
      .reverse()
      .find((m) => m.kind === "text" && m.text);
    return t?.text ?? "开始聊天吧～";
  })();

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="px-5 pt-4 pb-3">
        <div className="text-[18px] font-semibold text-ink-900">消息</div>
        <div className="text-[12px] text-ink-500 mt-0.5">
          和同频的她慢慢聊
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-4 scrollbar-hide">
        {!hasAny && <EmptyState />}

        {matched.map((c) => (
          <button
            key={c.id}
            onClick={() => setPage("chat")}
            className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-white/70 active:bg-white transition"
          >
            <Avatar name={c.name} emoji={c.emoji} size={48} />
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[14px] font-medium text-ink-900">
                  {c.name}
                </span>
                <span className="text-[11px] text-ink-500 shrink-0">
                  刚刚
                </span>
              </div>
              <div className="text-[12px] text-ink-500 truncate mt-0.5">
                {matchTarget?.id === c.id ? lastText : "开始聊天吧～"}
              </div>
            </div>
          </button>
        ))}

        {applying.map((c) => (
          <div
            key={c.id}
            className="w-full flex items-center gap-3 p-3 rounded-2xl opacity-70"
          >
            <Avatar name={c.name} emoji={c.emoji} size={48} />
            <div className="flex-1 min-w-0 text-left">
              <div className="text-[14px] font-medium text-ink-900">
                {c.name}
              </div>
              <div className="text-[12px] text-blush-500 mt-0.5">
                联结申请发出中…
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-20 flex flex-col items-center px-8 text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blush-200 to-mauve-200 flex items-center justify-center text-3xl shadow-soft">
        ✨
      </div>
      <div className="mt-4 text-[15px] font-medium text-ink-900">
        还没开始联结
      </div>
      <p className="mt-1.5 text-[12px] text-ink-500 leading-relaxed max-w-[16rem]">
        点击下方中间的 <span className="text-blush-500">去联结 ✨</span> 按钮，开一个搭子盲盒。
      </p>
    </div>
  );
}
