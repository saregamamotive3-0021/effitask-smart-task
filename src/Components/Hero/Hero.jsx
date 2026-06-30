import React from 'react'
import './Hero.css'
import { useNavigate } from "react-router-dom";
import Form from '../Form/Form'

const Hero = () => {
  const navigate = useNavigate();

  const clickAction=()=>{
  navigate("/form");
  }

  const clickAction1=()=>{
    navigate("/showtasks");
  }
  

  return (
    <div className='container'>
      <div className="title">
       <h1 className="title1">A Compatible Task Manager</h1>
       <h2 className="title2">Organize Your Tasks and Plan Your Day Better</h2>
      </div>

      <div className="taskbox">
       <button className="btn-title" onClick={clickAction}>Add tasks</button>
       <button className="btn-title" onClick={clickAction1}>Show Tasks</button>
      </div>

    </div>
  )
}

export default Hero
