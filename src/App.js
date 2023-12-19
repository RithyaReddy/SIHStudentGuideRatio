// src/App.js
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/ratio");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Guide and Student Ratios</h1>
      {data ? (
        <div>
          <p>Total Students: {data.totalStudents}</p>
          <p>Total Professors: {data.totalProfessors}</p>
          <p>Total Associate Professors: {data.totalAssociateProfessors}</p>
          <p>Total Assistant Professors: {data.totalAssistantProfessors}</p>

          <h2>Ratios:</h2>
          <p>
            Total Students to Professors Ratio:{" "}
            {data.ratioToProfessors.toFixed(2)}
          </p>
          <p>
            Total Students to Associate Professors Ratio:{" "}
            {data.ratioToAssociateProfessors.toFixed(2)}
          </p>
          <p>
            Total Students to Assistant Professors Ratio:{" "}
            {data.ratioToAssistantProfessors.toFixed(2)}
          </p>

          <h2>Guide Type Ratios:</h2>
          <p>
            Assistant Professor Ratio: {data.assistantProfessorRatio.toFixed(2)}
          </p>
          <p>
            Associate Professor Ratio: {data.associateProfessorRatio.toFixed(2)}
          </p>
          <p>Professor Ratio: {data.professorRatio.toFixed(2)}</p>

          <h2>Allotted Students Ratios:</h2>
          <p>
            Total Allotted Students to Professors:{" "}
            {data.totalAllottedStudentsToProfessors}
          </p>
          <p>
            Total Allotted Students to Associate Professors:{" "}
            {data.totalAllottedStudentsToAssociateProfessors}
          </p>
          <p>
            Total Allotted Students to Assistant Professors:{" "}
            {data.totalAllottedStudentsToAssistantProfessors}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
