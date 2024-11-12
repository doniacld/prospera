import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const diplomas = ["Bachelor's", "Master's", "PhD"];
const industries = ["Technology", "Finance", "Healthcare", "Education", "Retail", "Real Estate", "Other Options"];

const InputForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "12345", // Static userId for now; adjust as needed
    currentSalary: "",
    desiredSalary: "",
    desiredPosition: "",
    yearsOfExperience: "",
    location: "",
    skills: "",
    industry: "",
    major: "",
    diploma: "",
  });

  const [suggestedLocations, setSuggestedLocations] = useState([]);

  const fetchLocationSuggestions = async (query) => {
    if (!query) return;
    try {
      const response = await fetch(`https://api.positionstack.com/v1/forward?access_key=YOUR_ACCESS_KEY&query=${query}`);
      const data = await response.json();
      setSuggestedLocations(data.data.map((item) => item.name));
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    if (formData.location) {
      fetchLocationSuggestions(formData.location);
    }
  }, [formData.location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectSuggestion = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setSuggestedLocations([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation to check for required fields
    const requiredFields = [
      'currentSalary',
      'desiredSalary',
      'desiredPosition',
      'yearsOfExperience',
      'location',
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill out the required field: ${field.replace(/([A-Z])/g, ' $1').toUpperCase()}`);
        return;
      }
    }

    // Prepare the JSON data for the POST request
    const payload = {
      userId: formData.userId,
      jobTitle: formData.desiredPosition,
      YearsExperience: parseInt(formData.yearsOfExperience),
      Location: formData.location,
      CurrentSalary: parseInt(formData.currentSalary),
      DesiredSalary: parseInt(formData.desiredSalary),
      Skills: formData.skills.split(",").map((skill) => skill.trim()), // Converts comma-separated string into an array
      Industry: formData.industry,
      Major: formData.major,
      Diploma: formData.diploma,
    };


    try {
      // Send POST request
      const response = await axios.post("http://localhost:8080/salary/benchmark", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const receivedUserId = response.data.userId;
      localStorage.setItem("userId", receivedUserId); // Save userId in localStorage

      // Navigate or handle the response as needed
      console.log("Response from backend:", response.data);
      navigate("/chatsuggestions"); // Redirect if successful

    } catch (error) {
      console.error("Error submitting data:", error);
      alert("There was an error submitting the data. Please try again.");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
      <div className="input-form-container">
        <div className="input-form">
          <h2 className="input-form-title">Input Your Information</h2>

          <form onSubmit={handleSubmit} className="form-grid">
            <div className="input-field">
              <label>Current Salary (USD) *</label>
              <input
                  type="number"
                  name="currentSalary"
                  required
                  value={formData.currentSalary}
                  onChange={handleChange}
                  min="0"
              />
            </div>

            <div className="input-field">
              <label>Desired Salary (USD) *</label>
              <input
                  type="number"
                  name="desiredSalary"
                  required
                  value={formData.desiredSalary}
                  onChange={handleChange}
                  min="0"
              />
            </div>

            <div className="input-field">
              <label>Desired Position *</label>
              <input
                  type="text"
                  name="desiredPosition"
                  required
                  value={formData.desiredPosition}
                  onChange={handleChange}
                  placeholder="Type your desired position"
              />
            </div>

            <div className="input-field">
              <label>Years of Experience *</label>
              <input
                  type="number"
                  name="yearsOfExperience"
                  required
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  min="0"
              />
            </div>

            <div className="input-field">
              <label>Location *</label>
              <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Type your location"
              />
              {suggestedLocations.length > 0 && (
                  <div className="suggestions" style={{ position: "absolute", zIndex: "1", backgroundColor: "#f9f9f9", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }}>
                    {suggestedLocations.map((location) => (
                        <div
                            key={location}
                            className="suggestion-item"
                            onClick={() => handleSelectSuggestion("location", location)}
                            style={{ padding: "8px", cursor: "pointer" }}
                        >
                          {location}
                        </div>
                    ))}
                  </div>
              )}
            </div>

            {/* Optional Fields */}
            <div className="input-field">
              <label>Skills</label>
              <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Comma-separated skills"
              />
            </div>

            <div className="input-field">
              <label>Industry</label>
              <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
              >
                <option value="" disabled>Select your industry</option>
                {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                ))}
              </select>
            </div>

            <div className="input-field">
              <label>Major</label>
              <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
              />
            </div>

            <div className="input-field">
              <label>Diploma</label>
              <select
                  name="diploma"
                  value={formData.diploma}
                  onChange={handleChange}
              >
                <option value="" disabled>Select your diploma</option>
                {diplomas.map((diploma) => (
                    <option key={diploma} value={diploma}>
                      {diploma}
                    </option>
                ))}
              </select>
            </div>
          </form>

          <div className="form-buttons" style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
            <button type="button" onClick={handleBack}>Back</button>
            <button type="submit" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
  );
};

export default InputForm;
