import { useEffect, useState } from "react";

function Recommendations() {

  const [recommendations,
  setRecommendations] = useState([]);

  useEffect(()=>{

    const user =
      JSON.parse(
        localStorage.getItem(
          "learnhiveUser"
        )
      );

    if(!user) return;

    const skills =
      user.skillsKnown.toLowerCase();

    let recs = [];

    if(skills.includes("javascript"))
      recs.push("React");

    if(skills.includes("react"))
      recs.push("Node.js");

    if(skills.includes("java"))
      recs.push("Spring Boot");

    setRecommendations(recs);

  },[]);

  return (

    <div className="panel">

      <h2>Recommendations</h2>

      {recommendations.map((item,index)=>(

        <div
          key={index}
          className="user-card"
        >
          {item}
        </div>

      ))}

    </div>
  );
}

export default Recommendations;