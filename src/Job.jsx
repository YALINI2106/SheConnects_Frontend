import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Job.css";

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    type: "full-time", // options: full-time, part-time, internship
  });

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/jobs");
        setJobs(res.data);
        setFilteredJobs(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter logic
  useEffect(() => {
    const results = jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(results);
  }, [searchTerm, jobs]);

  const handleInputChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/jobs", newJob);
      alert("Job added successfully!");
      setJobs([...jobs, res.data.job]);
      setNewJob({ title: "", company: "", location: "", description: "", type: "full-time" });
    } catch (err) {
      alert("Failed to add job.");
    }
  };

  if (loading) return <div>Loading jobs...</div>;

  return (
    <div className="job-page">
      <header>
        <h1>Job Listings</h1>
        <p>Explore available job opportunities</p>
      </header>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or company"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Job form */}
      <form className="job-form" onSubmit={handleAddJob}>
        <h3>Add a New Job</h3>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={newJob.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={newJob.company}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newJob.location}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={newJob.description}
          onChange={handleInputChange}
          required
        />
        <select
          name="type"
          value={newJob.type}
          onChange={handleInputChange}
        >
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="internship">Internship</option>
        </select>
        <button type="submit">Post Job</button>
      </form>

      {/* Job list */}
      <div className="job-list">
        {filteredJobs.length ? (
          filteredJobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <p>{job.description}</p>
            </div>
          ))
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default Job;
