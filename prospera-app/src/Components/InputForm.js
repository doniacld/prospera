import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoImage from "../Assets/Logo.svg";

const diplomas = ["Bachelor's", "Master's", "PhD"];
const industries = ["Technology", "Finance", "Healthcare", "Education", "Retail", "Real Estate", "Other Options"];

const InputForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentSalary: "",
    desiredSalary: "",
    desiredPosition: "",
    yearsOfExperience: "",
    location: "",
    skills: "",
    industry: "",
    major: "",
    diploma: "",
    currency: "USD",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/chatbot");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="input-form-container">
      <div className="input-form">
        <div className="logo">
          <img src={LogoImage} alt="App Logo" />
        </div>

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

        {/* Form Buttons */}
        <div className="form-buttons" style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
          <button
            type="button"
            onClick={handleBack}
            style={{
              padding: "12px 25px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(145deg, #3a5e1c, #4a7d22)",
              boxShadow: "4px 4px 8px #334d19, -4px -4px 8px #5a8e28",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              width: "120px",
            }}
            onMouseOver={(e) => (e.target.style.background = "linear-gradient(145deg, #36561b, #426b1f)")}
            onMouseOut={(e) => (e.target.style.background = "linear-gradient(145deg, #3a5e1c, #4a7d22)")}
          >
            Back
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            style={{
              padding: "12px 25px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(145deg, #426B1F, #5a8e28)",
              boxShadow: "4px 4px 8px #334d19, -4px -4px 8px #6b9f30",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              width: "120px",
            }}
            onMouseOver={(e) => (e.target.style.background = "linear-gradient(145deg, #36561b, #426b1f)")}
            onMouseOut={(e) => (e.target.style.background = "linear-gradient(145deg, #426B1F, #5a8e28)")}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
