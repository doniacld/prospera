import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";  // Import Navbar
import Chatbot from "./Components/Chatbot";
import InputForm from "./Components/InputForm";
import Results from "./Components/Results";
import ChatSalary from './Components/ChatSalary';

function App() {
  const location = useLocation(); // Get current route location

  return (
    <div className="App">
      {/* Render Navbar globally except for specific pages */}
      {location.pathname !== "/chatbot" && location.pathname !== "/chatbot/salary" && location.pathname !== "/input-form" && <Navbar />}

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
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/input-form" element={<InputForm />} />
        <Route path="/results" element={<Results />} />
        <Route path="/chatbot/salary" element={<ChatSalary />} />
      </Routes>

      {/* Conditionally render Footer, hide it on specific pages */}
      {location.pathname !== "/chatbot" && location.pathname !== "/chatbot/salary" && location.pathname !== "/input-form" && <Footer />}
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
