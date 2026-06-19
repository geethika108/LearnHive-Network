import { useState } from "react";

function Goals() {

  const [goal,setGoal] = useState("");
  const [goals,setGoals] = useState(
    JSON.parse(localStorage.getItem("goals")) || []
  );

  const addGoal = () => {

    if(!goal) return;

    const updated = [
      ...goals,
      {
        id: Date.now(),
        title: goal,
        progress: 0
      }
    ];

    setGoals(updated);

    localStorage.setItem(
      "goals",
      JSON.stringify(updated)
    );

    setGoal("");
  };

  return (
    <div className="panel">

      <h2>Learning Goals</h2>

      <input
        value={goal}
        onChange={(e)=>setGoal(e.target.value)}
        placeholder="Learn React"
      />

      <button
        className="btn-main"
        onClick={addGoal}
      >
        Add Goal
      </button>

      {goals.map((g)=>(
        <div key={g.id} className="user-card">
          <strong>{g.title}</strong>
          <p>Progress: {g.progress}%</p>
        </div>
      ))}

    </div>
  );
}

export default Goals;