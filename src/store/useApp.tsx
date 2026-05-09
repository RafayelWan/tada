import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Companion } from "../data/content";

export type Page =
  | "welcome"
  | "profile"
  | "home"
  | "publish"
  | "browse"
  | "match"
  | "chat"
  | "detail"
  | "rating";

export type HomeTab = "companions" | "activities" | "messages" | "mine";

export interface UserProfile {
  nickname: string;
  avatarEmoji: string;
  age: string;
  city: string;
  profession: string;
  hobbies: string[];
  scenarios: string[];
  values: { qId: string; question: string; answer: string }[];
  completed: boolean;
}

export interface DemandPost {
  scene: string;
  city: string;
  title: string;
  time: string;
  timeDetail?: string;
  people: number;
  desc: string;
  budget: string;
}

export interface ChatMessage {
  id: string;
  from: "me" | "them";
  text?: string;
  kind?: "text" | "activity-card" | "system";
  activity?: DemandPost;
  accepted?: boolean;
  ts: number;
}

interface AppState {
  page: Page;
  homeTab: HomeTab;
  profile: UserProfile;
  activeDemand: DemandPost | null;
  publishedActivities: DemandPost[];
  matchTarget: Companion | null;
  appliedIds: string[];
  matchedIds: string[];
  applyMessage: string;
  chatMessages: ChatMessage[];
  detailTarget: Companion | null;
  ratingTarget: Companion | null;
  safeCheckOpen: boolean;
  safeCheckDismissed: boolean;
}

interface AppContext extends AppState {
  setPage: (p: Page) => void;
  openHome: (tab?: HomeTab) => void;
  setHomeTab: (t: HomeTab) => void;
  setProfile: (p: UserProfile) => void;
  setDemand: (d: DemandPost) => void;
  publishActivity: (d: DemandPost) => void;
  applyTo: (c: Companion, msg: string) => void;
  acceptMatch: (c: Companion) => void;
  openDetail: (c: Companion) => void;
  openRating: (c: Companion) => void;
  addChat: (m: Omit<ChatMessage, "id" | "ts">) => void;
  acceptActivity: (msgId: string) => void;
  triggerSafeCheck: () => void;
  dismissSafeCheck: () => void;
  closeSafeCheck: () => void;
  resetAll: () => void;
}

const Ctx = createContext<AppContext | null>(null);

const initialProfile: UserProfile = {
  nickname: "",
  avatarEmoji: "✨",
  age: "",
  city: "",
  profession: "",
  hobbies: [],
  scenarios: [],
  values: [],
  completed: false,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>("welcome");
  const [homeTab, setHomeTab] = useState<HomeTab>("companions");
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [activeDemand, setDemand] = useState<DemandPost | null>(null);
  const [publishedActivities, setPublished] = useState<DemandPost[]>([]);
  const [matchTarget, setMatchTarget] = useState<Companion | null>(null);
  const [appliedIds, setApplied] = useState<string[]>([]);
  const [matchedIds, setMatched] = useState<string[]>([]);
  const [applyMessage, setApplyMessage] = useState("");
  const [chatMessages, setChat] = useState<ChatMessage[]>([]);
  const [detailTarget, setDetail] = useState<Companion | null>(null);
  const [ratingTarget, setRating] = useState<Companion | null>(null);
  const [safeCheckOpen, setSafeOpen] = useState(false);
  const [safeCheckDismissed, setSafeDismissed] = useState(false);

  const value = useMemo<AppContext>(
    () => ({
      page,
      homeTab,
      profile,
      activeDemand,
      publishedActivities,
      matchTarget,
      appliedIds,
      matchedIds,
      applyMessage,
      chatMessages,
      detailTarget,
      ratingTarget,
      safeCheckOpen,
      safeCheckDismissed,
      setPage,
      openHome: (tab) => {
        if (tab) setHomeTab(tab);
        setPage("home");
      },
      setHomeTab,
      setProfile: (p) => setProfile({ ...p, completed: true }),
      setDemand,
      publishActivity: (d) => {
        setDemand(d);
        setPublished((list) => [d, ...list]);
      },
      applyTo: (c, msg) => {
        setApplied((a) => (a.includes(c.id) ? a : [...a, c.id]));
        setApplyMessage(msg);
        setMatchTarget(c);
      },
      acceptMatch: (c) => {
        setMatched((m) => (m.includes(c.id) ? m : [...m, c.id]));
        setMatchTarget(c);
        const introMsg: ChatMessage = {
          id: `m_${Date.now()}`,
          from: "me",
          kind: "text",
          text: applyMessage || "你好呀，我是在 Tada 被你打动啦～",
          ts: Date.now(),
        };
        const introReply: ChatMessage = {
          id: `m_${Date.now() + 1}`,
          from: "them",
          kind: "text",
          text: "看到你啦～同频的感觉好奇妙。",
          ts: Date.now() + 1000,
        };
        const activityCard: ChatMessage | null = activeDemand
          ? {
              id: `m_${Date.now() + 2}`,
              from: "me",
              kind: "activity-card",
              activity: activeDemand,
              accepted: false,
              ts: Date.now() + 2000,
            }
          : null;
        setChat(activityCard ? [introMsg, introReply, activityCard] : [introMsg, introReply]);
        setSafeDismissed(false);
      },
      openDetail: (c) => {
        setDetail(c);
        setPage("detail");
      },
      openRating: (c) => {
        setRating(c);
        setPage("rating");
      },
      addChat: (m) =>
        setChat((list) => [
          ...list,
          { ...m, id: `m_${Date.now()}_${Math.random()}`, ts: Date.now() },
        ]),
      acceptActivity: (msgId) =>
        setChat((list) =>
          list.map((m) => (m.id === msgId ? { ...m, accepted: true } : m))
        ),
      triggerSafeCheck: () => {
        if (!safeCheckDismissed) setSafeOpen(true);
      },
      dismissSafeCheck: () => {
        setSafeDismissed(true);
        setSafeOpen(false);
      },
      closeSafeCheck: () => setSafeOpen(false),
      resetAll: () => {
        setPage("welcome");
        setHomeTab("companions");
        setProfile(initialProfile);
        setDemand(null);
        setPublished([]);
        setMatchTarget(null);
        setApplied([]);
        setMatched([]);
        setApplyMessage("");
        setChat([]);
        setDetail(null);
        setRating(null);
        setSafeOpen(false);
        setSafeDismissed(false);
      },
    }),
    [
      page,
      homeTab,
      profile,
      activeDemand,
      publishedActivities,
      matchTarget,
      appliedIds,
      matchedIds,
      applyMessage,
      chatMessages,
      detailTarget,
      ratingTarget,
      safeCheckOpen,
      safeCheckDismissed,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
