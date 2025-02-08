import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const sampleData = [
  { month: 'Jan', cycleLength: 40 },
  { month: 'Feb', cycleLength: 26 },
  { month: 'Mar', cycleLength: 29 },
  { month: 'Apr', cycleLength: 25 },
  { month: 'May', cycleLength: 33 },
  { month: 'Jun', cycleLength: 10 },
];


const analyzeCycle = (length) => {
  if (length < 25) return 'Early';
  if (length > 35) return 'Late';
  return 'Normal';
};

const Statistics = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    setData(sampleData);
  }, []);

  const handleDotClick = (data) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      setSelectedMonth(data.activePayload[0].payload);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
      <h1>📊 Period Cycle Statistics</h1>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} onClick={handleDotClick}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[20, 40]} tickCount={11} />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="cycleLength" 
            stroke="#FF6B6B" 
            dot={{ r: 5, onClick: (e) => handleDotClick(e) }} 
            strokeDasharray="5 5" 
          />
        </LineChart>
      </ResponsiveContainer>

      {selectedMonth && (
        <div style={{ marginTop: '20px' }}>
          <p>
            <strong>{selectedMonth.month}:</strong> {selectedMonth.cycleLength} days - <em>{analyzeCycle(selectedMonth.cycleLength)}</em>
          </p>
        </div>
      )}
    </div>
  );
};

export default Statistics;