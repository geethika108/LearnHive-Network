import { useState } from "react";

function Search() {

  const [skill, setSkill] =
    useState("");

  const [results, setResults] =
    useState([]);

  const handleSearch = () => {

    const users =
      JSON.parse(
        localStorage.getItem(
          "allUsers"
        )
      ) || [];

    const filtered = users.filter(
      (u) =>
        u.skillsKnown
          ?.toLowerCase()
          .includes(
            skill.toLowerCase()
          )
    );

    setResults(filtered);
  };

  return (
    <div className="panel">

      <h2>Skill Search</h2>

      <p>
        Search users by skill.
      </p>

      <div className="form-group">

        <label>Skill</label>

        <input
          placeholder="JavaScript"
          value={skill}
          onChange={(e) =>
            setSkill(
              e.target.value
            )
          }
        />

      </div>

      <button
        className="btn-main"
        onClick={handleSearch}
      >
        Find Users
      </button>

      <div className="search-results">

        {results.map((user) => (

          <div
            key={user.id}
            className="user-card"
          >

            <strong>
              {user.name}
            </strong>

            <p>
              Offers:
              {" "}
              {user.skillsKnown}
            </p>

            <p>
              Wants:
              {" "}
              {user.skillsLearning}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Search;