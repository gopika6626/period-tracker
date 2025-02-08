 
import React from 'react'
import "./Navbar.css"
import Chat from "../assets/chatbot.svg"
import Graph from "../assets/graph.svg"
import Forum from "../assets/forum.svg"

const Navbar = () => {

  return (
    <div className='title'>
      <h5>Luna.</h5>
      <div className='icon'>
        <img className='iconimg' src={Chat} alt="icon" />
        
        <img 
          className='graphimage' id = "stats"
          src={Graph} 
          alt="graph"
          
        />
        
        <img className='forumimage' src={Forum} alt="forum" />
      </div>
    </div>
  )
}

export default Navbar;
