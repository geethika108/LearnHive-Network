import { useEffect, useState } from "react";

function Achievements() {

  const [badges,setBadges] =
    useState([]);

  useEffect(()=>{

    const goals =
      JSON.parse(
        localStorage.getItem(
          "goals"
        )
      ) || [];

    const feed =
      JSON.parse(
        localStorage.getItem(
          "feed"
        )
      ) || [];

    const awards = [];

    if(goals.length >= 1)
      awards.push(
        "🎯 Goal Setter"
      );

    if(feed.length >= 1)
      awards.push(
        "📚 Knowledge Sharer"
      );

    setBadges(awards);

  },[]);

  return (

    <div className="panel">

      <h2>Achievements</h2>

      {badges.map((badge,index)=>(
        <div
          key={index}
          className="user-card"
        >
          {badge}
        </div>
      ))}

    </div>
  );
}

export default Achievements;