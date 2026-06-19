import { useState } from "react";

function Feed() {

  const [post,setPost] = useState("");

  const [posts,setPosts] = useState(
    JSON.parse(
      localStorage.getItem("feed")
    ) || []
  );

  const addPost = () => {

    if(!post) return;

    const user =
      JSON.parse(
        localStorage.getItem(
          "learnhiveUser"
        )
      );

    const updated = [

      {
        id:Date.now(),
        author:user.name,
        text:post
      },

      ...posts

    ];

    setPosts(updated);

    localStorage.setItem(
      "feed",
      JSON.stringify(updated)
    );

    setPost("");
  };

  return (

    <div className="panel">

      <h2>Learning Feed</h2>

      <input
        value={post}
        onChange={(e)=>
          setPost(e.target.value)
        }
        placeholder="Share a learning resource..."
      />

      <button
        className="btn-main"
        onClick={addPost}
      >
        Post
      </button>

      {posts.map((p)=>(
        <div
          key={p.id}
          className="user-card"
        >
          <strong>
            {p.author}
          </strong>

          <p>{p.text}</p>
        </div>
      ))}

    </div>
  );
}

export default Feed;