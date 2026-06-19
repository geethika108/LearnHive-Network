import { useState } from "react";

function Chat({ request, closeChat }) {

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState(
      request.messages || []
    );

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "learnhiveUser"
      )
    );

  const sendMessage = () => {

    if (!message.trim()) return;

    const newMessage = {
      sender: currentUser.name,
      text: message,
      time: new Date().toLocaleTimeString()
    };

    const updated = [
      ...messages,
      newMessage
    ];

    setMessages(updated);

    const requests =
      JSON.parse(
        localStorage.getItem(
          "requests"
        )
      ) || [];

    const newRequests =
      requests.map((r) =>
        r.id === request.id
          ? {
              ...r,
              messages: updated
            }
          : r
      );

    localStorage.setItem(
      "requests",
      JSON.stringify(newRequests)
    );

    setMessage("");
  };

  return (

    <div className="chat-modal">

      <div className="chat-box">

        <h2>
          Skill Exchange Chat
        </h2>

        <div className="chat-messages">

          {messages.map((msg,index)=>(
            <div
              key={index}
              className="chat-message"
            >

              <strong>
                {msg.sender}
              </strong>

              <p>
                {msg.text}
              </p>

              <small>
                {msg.time}
              </small>

            </div>
          ))}

        </div>

        <input
          value={message}
          onChange={(e)=>
            setMessage(e.target.value)
          }
          placeholder="Type message..."
        />

        <button
          className="btn-main"
          onClick={sendMessage}
        >
          Send
        </button>

        <button
          className="link-btn"
          onClick={closeChat}
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default Chat;