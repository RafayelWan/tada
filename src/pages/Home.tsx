import { useApp } from "../store/useApp";
import { BottomTabBar } from "../components/BottomTabBar";
import { Companions } from "./home/Companions";
import { Activities } from "./home/Activities";
import { Messages } from "./home/Messages";
import { Mine } from "./home/Mine";

export function Home() {
  const { homeTab } = useApp();

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="flex-1 min-h-0 flex flex-col">
        {homeTab === "companions" && <Companions />}
        {homeTab === "activities" && <Activities />}
        {homeTab === "messages" && <Messages />}
        {homeTab === "mine" && <Mine />}
      </div>
      <BottomTabBar />
    </div>
  );
}
