import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Event.css';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [registeredEvents, setRegisteredEvents] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'workshop',
    date: '',
    time: '',
    location: '',
    imageUrl: '',
    availableSeats: 0
  });

  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/events');
        setEvents(response.data);
        setFilteredEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let results = events;
    if (searchTerm) {
      results = results.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (categoryFilter !== 'all') {
      results = results.filter(event => event.category === categoryFilter);
    }
    setFilteredEvents(results);
  }, [searchTerm, categoryFilter, events]);

  const handleRegister = async (eventId) => {
    try {
      const response = await axios.post(`http://localhost:5001/api/events/${eventId}/register`, {
        userId: 'current-user-id'
      });
      setRegisteredEvents([...registeredEvents, eventId]);
      alert('Registration successful!');
    } catch (err) {
      alert('Registration failed. Please try again.');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/events', formData);
      setEvents([...events, response.data.event]);
      setFormData({
        title: '',
        description: '',
        category: 'workshop',
        date: '',
        time: '',
        location: '',
        imageUrl: '',
        availableSeats: 0
      });
      setFormVisible(false);
      alert('Event added successfully!');
    } catch (err) {
      alert('Failed to add event. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading events...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="event-page">
      <header className="event-header">
        <h1>Upcoming Events</h1>
        <p>Discover and register for exciting events in your area</p>
        <button onClick={() => setFormVisible(!formVisible)}>
          {formVisible ? 'Close Form' : 'Add New Event'}
        </button>
      </header>

      {formVisible && (
        <form className="event-form" onSubmit={handleFormSubmit}>
          <input name="title" value={formData.title} onChange={handleFormChange} placeholder="Title" required />
          <textarea name="description" value={formData.description} onChange={handleFormChange} placeholder="Description" required />
          <select name="category" value={formData.category} onChange={handleFormChange}>
            <option value="workshop">Workshop</option>
            <option value="seminar">Seminar</option>
            <option value="conference">Conference</option>
            <option value="social">Social</option>
          </select>
          <input name="date" type="date" value={formData.date} onChange={handleFormChange} required />
          <input name="time" type="time" value={formData.time} onChange={handleFormChange} required />
          <input name="location" value={formData.location} onChange={handleFormChange} placeholder="Location" required />
          <input name="imageUrl" value={formData.imageUrl} onChange={handleFormChange} placeholder="Image URL" />
          <input name="availableSeats" type="number" min="0" value={formData.availableSeats} onChange={handleFormChange} placeholder="Available Seats" required />
          <button type="submit">Create Event</button>
        </form>
      )}

      <div className="event-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="search-icon">🔍</i>
        </div>

        <div className="filter-controls">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="workshop">Workshops</option>
            <option value="seminar">Seminars</option>
            <option value="conference">Conferences</option>
            <option value="social">Social Events</option>
          </select>
        </div>
      </div>

      <div className="event-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event._id} className="event-card">
              <div className="event-image">
                <img src={event.imageUrl || 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80'} alt={event.title} />
              </div>
              <div className="event-details">
                <span className="event-category">{event.category}</span>
                <h3>{event.title}</h3>
                <p className="event-date">📅 {new Date(event.date).toLocaleDateString()} ⏰ {event.time}</p>
                <p className="event-location">📍 {event.location}</p>
                <p className="event-description">{event.description}</p>
                <div className="event-footer">
                  <span className="event-seats">{event.availableSeats} seats available</span>
                  <button
                    onClick={() => handleRegister(event._id)}
                    disabled={registeredEvents.includes(event._id) || event.availableSeats <= 0}
                    className={registeredEvents.includes(event._id) ? 'registered' : ''}
                  >
                    {registeredEvents.includes(event._id) ? 'Registered' : 'Register Now'}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-events"><p>No events found matching your criteria.</p></div>
        )}
      </div>
    </div>
  );
};

export default Event;
