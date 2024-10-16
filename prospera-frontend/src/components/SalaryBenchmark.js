// src/components/SalaryBenchmark.js
import React, { useState } from 'react';
import axios from 'axios';

const SalaryBenchmark = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');
    const [salaryData, setSalaryData] = useState(null);

    const getSalaryBenchmark = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/salarybench`, {
                params: { jobTitle, location }
            });
            setSalaryData(response.data);  // Assuming your backend returns a JSON response
        } catch (error) {
            console.error("Error fetching salary benchmark", error);
        }
    };

    return (
        <div>
            <h2>Get Salary Benchmark</h2>
            <form onSubmit={getSalaryBenchmark}>
                <label>
                    Job Title:
                    <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                    />
                </label>
                <label>
                    Location:
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </label>
                <button type="submit">Get Benchmark</button>
            </form>
            {salaryData && (
                <div>
                    <h3>Salary Information:</h3>
                    <p>Estimated Salary: {salaryData.estimated_salary}</p>
                </div>
            )}
        </div>
    );
};

export default SalaryBenchmark;
