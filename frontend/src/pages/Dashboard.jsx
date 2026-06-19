import Profile from "../components/Profile";
import Search from "../components/Search";
import Requests from "../components/Requests";
import MentorMatching from "../components/MentorMatching";
import Roadmaps from "../components/Roadmaps";
import Recommendations from "../components/Recommendations";
import Feed from "../components/Feed";
import Achievements from "../components/Achievements";
import Goals from "../components/Goals";

function Dashboard() {
  return (
    <div className="dashboard">

      <Profile />

      <Goals />

      <Search />

      <Requests />

      <MentorMatching />

      <Roadmaps />

      <Recommendations />

      <Feed />

      <Achievements />

    </div>
  );
}

export default Dashboard;