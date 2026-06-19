function Roadmaps() {

  const roadmaps = [

    {
      title:"Frontend Developer",
      steps:[
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Redux",
        "Next.js"
      ]
    },

    {
      title:"Backend Developer",
      steps:[
        "Node.js",
        "Express",
        "SQL",
        "Authentication",
        "Deployment"
      ]
    }

  ];

  return (

    <div className="panel">

      <h2>Learning Roadmaps</h2>

      {roadmaps.map((roadmap,index)=>(
        <div
          key={index}
          className="user-card"
        >

          <strong>
            {roadmap.title}
          </strong>

          <ul>

            {roadmap.steps.map((step,i)=>(
              <li key={i}>
                {step}
              </li>
            ))}

          </ul>

        </div>
      ))}

    </div>
  );
}

export default Roadmaps;