// Import statements at the top
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import "./App.css"; // Import the external CSS file

// Component definition
function App() {
  // State and useEffect logic
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from /api/ratio");
        const response = await fetch("http://localhost:5000/api/ratio");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("Data from server:", result);
        setData(result);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  // Define data for the pie chart
  const pieChartData = [
    { name: "Students", value: data?.totalStudents || 0 },
    { name: "Guides", value: data?.totalGuides || 0 },
  ];

  // Colors for each section of the pie chart
  const colors = ["#ff9933", "#138808"];

  // Component rendering
  return (
    <div className="body">
      <div className="container">
        <h1 className="title">Guide and Student Ratios</h1>
        {data ? (
          <div>
            <h2>Ratios:</h2>
            <p className="ratio">
              Total Students to Guides Ratio: {data.ratio.toFixed(2)}
            </p>

            <div className="piechart">
              <PieChart width={400} height={400}>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  cx={200}
                  cy={200}
                  outerRadius={80}
                  fill="#ff9933"
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </div>

            {/* Pie Chart */}
          </div>
        ) : (
          <p className="loading">Loading...</p>
        )}
      </div>
      <div className="progress">
        <button>In Progress</button>
      </div>
    </div>
  );
}

export default App;
