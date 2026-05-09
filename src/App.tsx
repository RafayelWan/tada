import { AppProvider, useApp } from "./store/useApp";
import { PhoneFrame } from "./components/PhoneFrame";
import { Welcome } from "./pages/Welcome";
import { ProfileSetup } from "./pages/Profile";
import { Home } from "./pages/Home";
import { Publish } from "./pages/Publish";
import { Browse } from "./pages/Browse";
import { Match } from "./pages/Match";
import { Chat } from "./pages/Chat";
import { Detail } from "./pages/Detail";
import { Rating } from "./pages/Rating";

function Router() {
  const { page } = useApp();
  switch (page) {
    case "welcome":
      return <Welcome />;
    case "profile":
      return <ProfileSetup />;
    case "home":
      return <Home />;
    case "publish":
      return <Publish />;
    case "browse":
      return <Browse />;
    case "match":
      return <Match />;
    case "chat":
      return <Chat />;
    case "detail":
      return <Detail />;
    case "rating":
      return <Rating />;
    default:
      return <Welcome />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <PhoneFrame>
        <Router />
      </PhoneFrame>
    </AppProvider>
  );
}
