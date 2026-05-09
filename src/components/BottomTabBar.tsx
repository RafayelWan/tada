import { MessageCircle, Sparkles, UserRound, Users, Calendar } from "lucide-react";
import { useApp, type HomeTab } from "../store/useApp";
import { cn } from "../lib/utils";

type TabDef = {
  key: HomeTab;
  label: string;
  icon: typeof Users;
};

const LEFT_TABS: TabDef[] = [
  { key: "companions", label: "搭子", icon: Users },
  { key: "activities", label: "活动", icon: Calendar },
];
const RIGHT_TABS: TabDef[] = [
  { key: "messages", label: "消息", icon: MessageCircle },
  { key: "mine", label: "我的", icon: UserRound },
];

export function BottomTabBar() {
  const { homeTab, setHomeTab, setPage } = useApp();

  return (
    <div className="relative">
      {/* 底栏本体 */}
      <div className="h-16 bg-white/95 backdrop-blur border-t border-ink-100/60 flex items-stretch">
        <div className="flex-1 flex">
          {LEFT_TABS.map((t) => (
            <TabItem
              key={t.key}
              tab={t}
              active={homeTab === t.key}
              onClick={() => setHomeTab(t.key)}
            />
          ))}
        </div>
        {/* 中间留一块空位承载浮起按钮 */}
        <div className="w-20" />
        <div className="flex-1 flex">
          {RIGHT_TABS.map((t) => (
            <TabItem
              key={t.key}
              tab={t}
              active={homeTab === t.key}
              onClick={() => setHomeTab(t.key)}
            />
          ))}
        </div>
      </div>

      {/* 中间浮起的「去联结」主按钮 */}
      <button
        onClick={() => setPage("browse")}
        aria-label="去联结"
        className="absolute left-1/2 -translate-x-1/2 -top-6 w-16 h-16 rounded-full bg-gradient-to-br from-blush-400 via-blush-500 to-mauve-400 text-white shadow-glow flex items-center justify-center active:scale-95 group"
      >
        {/* 波纹波动 */}
        <span className="absolute inset-0 rounded-full border-2 border-blush-300/60 animate-ripple" />
        <span
          className="absolute inset-0 rounded-full border-2 border-mauve-300/60 animate-ripple"
          style={{ animationDelay: "0.6s" }}
        />
        <span className="relative flex flex-col items-center justify-center leading-none">
          <Sparkles size={22} className="drop-shadow" />
          <span className="text-[9px] mt-0.5 tracking-wide">去联结</span>
        </span>
      </button>
    </div>
  );
}

function TabItem({
  tab,
  active,
  onClick,
}: {
  tab: TabDef;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = tab.icon;
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 flex flex-col items-center justify-center gap-0.5 transition",
        active ? "text-blush-500" : "text-ink-500 hover:text-ink-700"
      )}
    >
      <Icon size={20} strokeWidth={active ? 2.2 : 1.6} />
      <span className="text-[10px]">{tab.label}</span>
    </button>
  );
}
