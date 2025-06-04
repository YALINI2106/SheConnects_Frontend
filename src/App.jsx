import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login";           // Login.jsx
import Signup from "./Signup";         // Signup.jsx
import Home from "./home";             // home.jsx
import Blog from "./Blog";             // Blog.jsx
import Event from "./Event";           // Event.jsx
import ConsultDoc from "./ConsultDoc";
import Job from "./Job";               // job.jsx      // profile.jsx

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/event" element={<Event />} />
          <Route path="/ConsultDoc" element={<ConsultDoc />} />
          <Route path="/job" element={<Job />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
