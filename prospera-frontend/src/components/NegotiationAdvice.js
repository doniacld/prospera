// src/components/NegotiationAdvice.js
import React, { useState } from 'react';
import axios from 'axios';
import './NegotiationAdvice.css';


const NegotiationAdvice = () => {
    const [jobTitle, setJobTitle] = useState('');
    // const [currentSalary, setCurrentSalary] = useState('');
    // const [desiredSalary, setDesiredSalary] = useState('');
    const [advices, setAdvices] = useState(null);

    const getNegotiationAdvice = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.postForm('http://localhost:8080/negotiation', {
                jobTitle,         // Include the form data in the POST request body
                // currentSalary,    // in JSON format
                // desiredSalary
            });
            // Log the response data for debugging purposes
            console.log("Response data:", response.data);
            setAdvices(response.data);  // Assuming the backend returns the AI-generated advice in the response

        } catch (error) {
            console.error("Error fetching negotiation advice", error);
        }
    };

    return (
        <div>
            <h2>Get Negotiation Advice</h2>
            <form onSubmit={getNegotiationAdvice}>
                <label>
                    Job Title:
                    <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                    />
                </label>
                {/*<label>*/}
                {/*    Current Salary:*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        value={currentSalary}*/}
                {/*        onChange={(e) => setCurrentSalary(e.target.value)}*/}
                {/*    />*/}
                {/*</label>*/}
                {/*<label>*/}
                {/*    Desired Salary:*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        value={desiredSalary}*/}
                {/*        onChange={(e) => setDesiredSalary(e.target.value)}*/}
                {/*    />*/}
                {/*</label>*/}
                <button type="submit">Get Advices</button>
            </form>
            {advices && (
                <div>
                    <h3>Negotiation Advice:</h3>
                    <p>{advices.message}</p>
                </div>
            )}
        </div>
    );
};

export default NegotiationAdvice;
