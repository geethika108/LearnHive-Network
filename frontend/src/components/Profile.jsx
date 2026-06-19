import { useState, useEffect } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  const [skillsKnown, setSkillsKnown] = useState("");
  const [skillsLearning, setSkillsLearning] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("learnhiveUser")
    );

    if (currentUser) {
      setUser(currentUser);

      setSkillsKnown(
        currentUser.skillsKnown || ""
      );

      setSkillsLearning(
        currentUser.skillsLearning || ""
      );
    }
  }, []);

  const saveProfile = () => {
    const updatedUser = {
      ...user,
      skillsKnown,
      skillsLearning,
    };

    localStorage.setItem(
      "learnhiveUser",
      JSON.stringify(updatedUser)
    );

    const users =
      JSON.parse(
        localStorage.getItem("allUsers")
      ) || [];

    const updatedUsers = users.map((u) =>
      u.id === updatedUser.id
        ? updatedUser
        : u
    );

    localStorage.setItem(
      "allUsers",
      JSON.stringify(updatedUsers)
    );

    setUser(updatedUser);

    alert("Profile Updated");
  };

  if (!user) return null;

  return (
    <div className="panel">

      <div className="profile-header">

        <img
          src={
            user.photo ||
            "https://via.placeholder.com/100"
          }
          alt=""
          className="avatar"
        />

        <div className="user-details">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>

      </div>

      <h2>Profile</h2>

      <p>
        Reads and updates profile data.
      </p>

      <div className="form-grid">

        <div className="form-group">
          <label>Skills I Know</label>

          <input
            value={skillsKnown}
            onChange={(e) =>
              setSkillsKnown(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>
            Skills I Want To Learn
          </label>

          <input
            value={skillsLearning}
            onChange={(e) =>
              setSkillsLearning(
                e.target.value
              )
            }
          />
        </div>

      </div>

      <button
        className="btn-main"
        onClick={saveProfile}
      >
        Save Profile
      </button>

    </div>
  );
}

export default Profile;