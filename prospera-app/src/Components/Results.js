import React from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"; 
import salary from "../Assets/salary.png";
import max from "../Assets/max.png";
import min from "..//Assets/min.png";
import median from "../Assets/Median.png";

const Results = () => {
  // Sample salary data, replace with actual values
  const currentSalary = 50000;
  const medianSalary = 55000;
  const minSalary = 45000;
  const maxSalary = 70000;

  // Sample data for the graph
  const graphData = [
    { name: "Current", value: currentSalary },
    { name: "Median", value: medianSalary },
    { name: "Min", value: minSalary },
    { name: "Max", value: maxSalary },
  ];

  // You can replace these with actual values from your input form or API
  const jobTitle = "Software Developer"; // Example job title
  const location = "New York"; // Example location
  const experience = "5"; // Example years of experience

  return (
    <div style={{ backgroundColor: "#ffeecd", padding: "20px" }}>
      {/* Title */}
      <h2 style={{ color: "#696666", fontFamily: "serif", fontSize: "2rem", textAlign: "center" }}>
        Salary Benchmark
      </h2>

      {/* Horizontal line */}
      <hr style={{ border: "1px solid #696666", margin: "20px 0" }} />

      {/* Salary Data Sections */}
      <div className="salary-boxes-container">
        {[ 
          { title: "Current Salary", value: "50,000$", imgSrc: salary },
          { title: "Median Industry Salary", value: "55,000$", imgSrc: median },
          { title: "Min Industry Salary", value: "45,000$", imgSrc: min },
          { title: "Max Industry Salary", value: "65,000$", imgSrc: max }
        ].map((item, index) => (
          <div className="salary-box" key={index}>
            <div className="salary-box-image">
              <img src={item.imgSrc} alt={item.title} />
            </div>
            <div className="salary-box-content">
              <div className="salary-title">{item.title}</div>
              <div className="salary-value">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      <br />
      <br />

      {/* Chart Title */}
<h3 className="chart-title">
  Salaries for Job X in Location Y with X Years of Experience
</h3>
<br/>

{/* Chart */}
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={graphData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="value" stroke="#8884d8" />
  </LineChart>
</ResponsiveContainer>


      {/* Confidence Boosting Text */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <p style={{ fontSize: "1.2rem", color: "#696666" }}>
          Want to practice to boost your confidence & earn what you deserve?
        </p>
      </div>

      {/* Try Again Button */}
      <div className="try-again-button">
        <Link to="/input-form">
          <button>
            Try Again
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Results;
