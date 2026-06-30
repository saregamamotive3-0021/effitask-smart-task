import React from "react";
import "./About.css";

const About = ({ title }) => {
  return (
    <section className="container-about">
      <div className="about-content">
        <h1 className="heading">{title}</h1>

        <p className="para-heading">
          Organize, prioritize, and manage your daily tasks with ease.
          Task Manager helps you stay productive by tracking progress,
          organizing goals, and keeping all your tasks in one place.
        </p>

        <p className="para-heading">
        Track your productivity with an interactive pie chart that instantly visualizes completed and pending tasks, helping you monitor progress and stay on top of your goals.
        </p>

      </div>
    </section>
  );
};

export default About;

// import React from 'react'

// const About = () => {
//   return (
//     <div className='container-about'>
//       <h1></h1>
//       <p></p> 
//     </div>
//   )
// }

// export default About