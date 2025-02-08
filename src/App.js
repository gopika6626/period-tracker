import React from "react";
import CalendarComponent from "../src/Component/CalenderComp"
import Prediction from "../src/Component/Prediction";
import Navbar from "../src/Component/Navbar";
import Stats from "../src/Component/Stats";

function App() {
  return (
    <div>
      
      <CalendarComponent />
      <Prediction />
      <Navbar />
      <Stats />
     
    </div>
  );
}

export default App;