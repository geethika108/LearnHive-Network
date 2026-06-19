import { useState, useEffect } from "react";
import Chat from "./Chat";

function Requests() {
  const currentUser = JSON.parse(
    localStorage.getItem("learnhiveUser")
  );

  const [receiverId, setReceiverId] =
    useState("");

  const [skill, setSkill] =
    useState("");

  const [requests, setRequests] =
    useState([]);

  const [activeChat, setActiveChat] =
    useState(null);

  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem("requests")
      ) || [];

    setRequests(saved);
  }, []);

  const saveRequests = (updated) => {
    setRequests(updated);

    localStorage.setItem(
      "requests",
      JSON.stringify(updated)
    );
  };

  const sendRequest = () => {
    if (!receiverId || !skill) {
      alert("Please fill all fields");
      return;
    }

    if (!currentUser) {
      alert("Login required");
      return;
    }

    const newRequest = {
      id: Date.now(),

      senderId: currentUser.id,

      senderName: currentUser.name,

      receiverId: Number(receiverId),

      skill,

      status: "Pending",

      messages: [],
    };

    const updated = [
      ...requests,
      newRequest,
    ];

    saveRequests(updated);

    setReceiverId("");
    setSkill("");

    alert("Request Sent Successfully");
  };

  const acceptRequest = (id) => {
    const updated = requests.map((req) =>
      req.id === id
        ? {
            ...req,
            status: "Accepted",
          }
        : req
    );

    saveRequests(updated);
  };

  const rejectRequest = (id) => {
    const updated = requests.map((req) =>
      req.id === id
        ? {
            ...req,
            status: "Rejected",
          }
        : req
    );

    saveRequests(updated);
  };

  const sentRequests =
    requests.filter(
      (req) =>
        req.senderId === currentUser?.id
    );

  const receivedRequests =
    requests.filter(
      (req) =>
        req.receiverId === currentUser?.id
    );

  return (
    <div className="panel">
      <h2>Swap Requests</h2>

      <p>
        Send, Accept and Chat
        with learners.
      </p>

      <div className="form-grid">
        <div className="form-group">
          <label>
            Receiver User ID
          </label>

          <input
            type="number"
            placeholder="Enter User ID"
            value={receiverId}
            onChange={(e) =>
              setReceiverId(
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label>Skill</label>

          <input
            type="text"
            placeholder="React"
            value={skill}
            onChange={(e) =>
              setSkill(
                e.target.value
              )
            }
          />
        </div>
      </div>

      <button
        className="btn-main"
        onClick={sendRequest}
      >
        Send Request
      </button>

      <div className="request-grid">
        {/* SENT REQUESTS */}

        <div className="request-box">
          <h3>Sent Requests</h3>

          {sentRequests.length === 0 && (
            <p>No Requests Found</p>
          )}

          {sentRequests.map((req) => (
            <div
              key={req.id}
              className="user-card"
            >
              <p>
                Receiver ID:
                {" "}
                {req.receiverId}
              </p>

              <p>
                Skill:
                {" "}
                {req.skill}
              </p>

              <p>
                Status:
                {" "}
                <strong>
                  {req.status}
                </strong>
              </p>

              {req.status ===
                "Accepted" && (
                <button
                  className="btn-main"
                  onClick={() =>
                    setActiveChat(req)
                  }
                >
                  Open Chat
                </button>
              )}
            </div>
          ))}
        </div>

        {/* RECEIVED REQUESTS */}

        <div className="request-box">
          <h3>
            Received Requests
          </h3>

          {receivedRequests.length ===
            0 && (
            <p>No Requests Found</p>
          )}

          {receivedRequests.map(
            (req) => (
              <div
                key={req.id}
                className="user-card"
              >
                <p>
                  From:
                  {" "}
                  {req.senderName}
                </p>

                <p>
                  Skill:
                  {" "}
                  {req.skill}
                </p>

                <p>
                  Status:
                  {" "}
                  <strong>
                    {req.status}
                  </strong>
                </p>

                {req.status ===
                  "Pending" && (
                  <>
                    <button
                      className="btn-main"
                      onClick={() =>
                        acceptRequest(
                          req.id
                        )
                      }
                    >
                      Accept
                    </button>

                    <button
                      className="btn-main"
                      onClick={() =>
                        rejectRequest(
                          req.id
                        )
                      }
                    >
                      Reject
                    </button>
                  </>
                )}

                {req.status ===
                  "Accepted" && (
                  <button
                    className="btn-main"
                    onClick={() =>
                      setActiveChat(req)
                    }
                  >
                    Open Chat
                  </button>
                )}
              </div>
            )
          )}
        </div>
      </div>

      {activeChat && (
        <Chat
          request={activeChat}
          closeChat={() =>
            setActiveChat(null)
          }
        />
      )}
    </div>
  );
}

export default Requests;