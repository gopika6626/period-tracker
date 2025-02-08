import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import  "../Component/CalendarComp.css";
import Prediction from "../Component/Prediction";

export default function PeriodTracker() {
  const [dates, setDates] = useState(new Set());
  const [nextPeriod, setNextPeriod] = useState(null);
  const [daysLeft, setDaysLeft] = useState(null);


  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setDates((prevDates) => new Set([...prevDates, formattedDate]));
  };

  const predictPeriod = async () => {
    const cycleDates = ["2024-01-01", "2024-01-29", "2024-02-26"];
    try {
      const response = await fetch("http://127.0.0.1:5000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cycle_dates: Array.from(dates) }),
      });
      const data = await response.json();
      setNextPeriod(data.predicted_next_period);
      const today = new Date();
      const nextDate = new Date(data.predicted_next_period);
      const diffTime = nextDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays);
    } catch (error) {
      console.error("Error predicting period:", error);
    }
  };

  const tileClassName = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    if (dates.has(formattedDate)) {
      return "logged-period";
    }
    for (let loggedDate of dates) {
      const logged = new Date(loggedDate);
      for (let i = 1; i <= 7; i++) {
        const nextDay = new Date(logged);
        nextDay.setDate(logged.getDate() + i);
        if (nextDay.toISOString().split("T")[0] === formattedDate) {
          return "predicted-period";
        }
      }
    }
    return null;
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-xl">
      
      <div className="calendar-container">
      <Calendar 
        onClickDay={handleDateChange}
        tileClassName={tileClassName}
        className="w-full mb-4"
      />
      </div>
      <button className="predict-button "
        onClick={predictPeriod}
        
      >
        Predict Next Period
      </button>
      {daysLeft !== null && (
        <div className="flex justify-center mt-4">
          <Prediction daysLeft={daysLeft} />
        </div>
      )}
      {nextPeriod && (
        <p className="mt-4 text-center font-semibold text-green-700">
          Next Predicted Period: {nextPeriod}
        </p>

        
      )}
    </div>
  );
}
