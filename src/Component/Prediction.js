import React from 'react'
import "./Prediction.css"

const Prediction = ({ daysLeft }) => {
  return (
    <div className='ellipsea'>
        
        <div>
        <p className="days-text">{daysLeft} days left  </p>
        </div>
      
    </div>
  )
}

export default Prediction
