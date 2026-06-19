import { useState } from "react";

function MentorMatching() {

  const mentors = [

    {
      id: 1,
      name: "John Smith",
      skill: "React",
      experience: "5 Years",
      email: "john@mentor.com",
      photo: "https://i.pravatar.cc/150?img=11"
    },

    {
      id: 2,
      name: "Sarah Johnson",
      skill: "Node.js",
      experience: "6 Years",
      email: "sarah@mentor.com",
      photo: "https://i.pravatar.cc/150?img=32"
    },

    {
      id: 3,
      name: "David Lee",
      skill: "Java",
      experience: "8 Years",
      email: "david@mentor.com",
      photo: "https://i.pravatar.cc/150?img=15"
    }

  ];

  const [selectedMentor, setSelectedMentor] =
    useState(null);

  return (
    <div className="panel">

      <h2>🎓 Mentor Guidance</h2>

      <p>
        Connect with experienced mentors
        based on your learning goals.
      </p>

      <div className="mentor-grid">

        {mentors.map((mentor) => (

          <div
            key={mentor.id}
            className="mentor-card"
          >

            <img
              src={mentor.photo}
              alt=""
              className="mentor-avatar"
            />

            <h3>{mentor.name}</h3>

            <p>
              Skill:
              {" "}
              {mentor.skill}
            </p>

            <p>
              Experience:
              {" "}
              {mentor.experience}
            </p>

            <button
              className="btn-main"
              onClick={() =>
                setSelectedMentor(mentor)
              }
            >
              View Mentor
            </button>

          </div>

        ))}

      </div>

      {selectedMentor && (

        <div className="mentor-details">

          <h3>
            Mentor Details
          </h3>

          <p>
            Name:
            {" "}
            {selectedMentor.name}
          </p>

          <p>
            Skill:
            {" "}
            {selectedMentor.skill}
          </p>

          <p>
            Experience:
            {" "}
            {selectedMentor.experience}
          </p>

          <p>
            Contact:
            {" "}
            {selectedMentor.email}
          </p>

        </div>

      )}

    </div>
  );
}

export default MentorMatching;