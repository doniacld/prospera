import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; // Import useNavigate
import LogoImage from "../Assets/Logo.svg"; 

const positions = ["Software Engineer", "Data Scientist", "Product Manager", "UX Designer", "DevOps Engineer"];
const diplomas = ["Bachelor's", "Master's", "PhD"];
const industries = ["Technology", "Finance", "Healthcare", "Education", "Retail", "Real Estate"];
const locationSuggestions = ["Dubai", "New York", "San Francisco", "London", "Berlin", "Tokyo"];
const currencies = ["USD", "EUR", "AED", "GBP", "JPY"];

const InputForm = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const [formData, setFormData] = useState({
    currentSalary: "",
    currentSalaryCurrency: "USD",
    desiredSalary: "",
    desiredSalaryCurrency: "USD",
    desiredPosition: "",
    yearsOfExperience: "",
    location: "",
    skills: "",
    industry: "",
    major: "",
    diploma: "",
  });

  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [suggestedIndustries, setSuggestedIndustries] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "currentSalary" || name === "desiredSalary" || name === "yearsOfExperience") && value < 0) {
      alert("Value must be a positive number");
      return;
    }

    setFormData({ ...formData, [name]: value });

    if (name === "location") {
      setSuggestedLocations(locationSuggestions.filter(loc => loc.toLowerCase().startsWith(value.toLowerCase())));
    }

    if (name === "industry") {
      setSuggestedIndustries(industries.filter(ind => ind.toLowerCase().includes(value.toLowerCase())));
    }
  };

  const handleSelectSuggestion = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setSuggestedLocations([]);
    setSuggestedIndustries([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/chatbot"); // Navigate to the chatbot page
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
            <label>Current Salary</label>
            <div className="salary-group">
              <input
                type="number"
                name="currentSalary"
                className="salary-input"
                required
                value={formData.currentSalary}
                onChange={handleChange}
              />
              <select
                name="currentSalaryCurrency"
                className="currency-select"
                value={formData.currentSalaryCurrency}
                onChange={handleChange}
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-field">
            <label>Desired Salary</label>
            <div className="salary-group">
              <input
                type="number"
                name="desiredSalary"
                className="salary-input"
                value={formData.desiredSalary}
                onChange={handleChange}
              />
              <select
                name="desiredSalaryCurrency"
                className="currency-select"
                value={formData.desiredSalaryCurrency}
                onChange={handleChange}
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-field">
            <label>Desired Position</label>
            <select
              name="desiredPosition"
              required
              value={formData.desiredPosition}
              onChange={handleChange}
            >
              <option value="" disabled>Select your position</option>
              {positions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
          </div>

          <div className="input-field">
            <label>Years of Experience</label>
            <input
              type="number"
              name="yearsOfExperience"
              required
              value={formData.yearsOfExperience}
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <label>Location</label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
            />
            {suggestedLocations.length > 0 && (
              <div className="suggestions">
                {suggestedLocations.map(location => (
                  <div
                    key={location}
                    className="suggestion-item"
                    onClick={() => handleSelectSuggestion("location", location)}
                  >
                    {location}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="input-field">
            <label>Skills</label>
            <input
              type="text"
              name="skills"
              required
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <label>Industry</label>
            <input
              type="text"
              name="industry"
              required
              value={formData.industry}
              onChange={handleChange}
            />
            {suggestedIndustries.length > 0 && (
              <div className="suggestions">
                {suggestedIndustries.map(industry => (
                  <div
                    key={industry}
                    className="suggestion-item"
                    onClick={() => handleSelectSuggestion("industry", industry)}
                  >
                    {industry}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="input-field">
            <label>Major</label>
            <input
              type="text"
              name="major"
              required
              value={formData.major}
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <label>Diploma</label>
            <select
              name="diploma"
              required
              value={formData.diploma}
              onChange={handleChange}
            >
              <option value="" disabled>Select your diploma</option>
              {diplomas.map(diploma => (
                <option key={diploma} value={diploma}>{diploma}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-button">Next</button> {/* Changed type to submit */}
        </form>
      </div>
    </div>
  );
};

export default InputForm;
