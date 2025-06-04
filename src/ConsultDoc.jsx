import React, { useState } from 'react';
import axios from 'axios';
import './ConsultDoc.css';

const ConsultDoc = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    counselorType: 'psychologist'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5001/api/appointments', {
        ...formData,
        appointmentType: 'mental-wellness'
      });
      
      if (response.status === 201) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          counselorType: 'psychologist'
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="consult-container">
      <div className="image-container">
        <img 
          src="https://plus.unsplash.com/premium_photo-1683865775849-b958669dca26?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Mental wellness counseling"
          className="consult-image"
        />
        <div className="image-overlay">
          <h2>Professional Mental Wellness Support</h2>
          <p>Connect with licensed counselors for your emotional well-being</p>
        </div>
      </div>
      
      <div className="form-container">
        <h2>Schedule a Counseling Session</h2>
        {submitSuccess && (
          <div className="success-message">
            <h3>Appointment Booked Successfully!</h3>
            <p>Your counselor will contact you to confirm the session details.</p>
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Preferred Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Preferred Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Counselor Type</label>
            <select
              name="counselorType"
              value={formData.counselorType}
              onChange={handleChange}
              required
            >
              <option value="psychologist">Psychologist</option>
              <option value="therapist">Licensed Therapist</option>
              <option value="counselor">Mental Health Counselor</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Booking...' : 'Schedule Session'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultDoc;