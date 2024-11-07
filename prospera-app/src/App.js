import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Chatbot from "./Components/Chatbot";
import InputForm from "./Components/InputForm";

function App() {
  const location = useLocation(); // Get current route location

  return (
    <div className="App">
      {/* Render content based on the current route */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/input-form" element={<InputForm />} />
      </Routes>

      {/* Conditionally render Work, About, Contact, and Footer, hide them on the chatbot page */}
      {location.pathname !== "/chatbot" && location.pathname !== "/input-form" && (
        <>
          <About />
          <Work />
          <Contact />
          <Footer />
        </>
      )}
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
