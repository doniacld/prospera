import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";  
import InputForm from "./Components/InputForm";
import Results from "./Components/Results";
import ChatSalary from './Components/ChatSalary';
import ChatSuggestions from "./Components/ChatSuggestions";
import ChatNegotiation from './Components/ChatNegotiation';  
import ChatBoostConfidence from './Components/ChatBoostConfidence';  
import AboutUs from './Components/AboutUs'; 

function App() {
  const location = useLocation(); // Get current route location

  return (
    <div className="App">
      {/* Render Navbar globally except for specific pages */}
      { location.pathname !== "/ChatSuggestions" && <Navbar />}

      {/* Render content based on the current route */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              {/* Render About, Work, and Contact only on Home Page */}
              <About />
              <Work />
              <Contact />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/about-us" element={<AboutUs />} /> 
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/input-form" element={<InputForm />} />
        <Route path="/results" element={<Results />} />
        <Route path="/chatbot/salary" element={<ChatSalary />} />
        <Route path="/chatsuggestions" element={<ChatSuggestions />} />
        <Route path="/chatbot/negotiation" element={<ChatNegotiation />} />
        <Route path="/chatbot/boost-confidence" element={<ChatBoostConfidence />} />
      </Routes>

      {/* Conditionally render Footer, hide it on specific pages */}
      {location.pathname !== "/chatbot/negotiation"  && location.pathname !== "/chatbot/salary" && location.pathname !== "/input-form" && <Footer />}
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
