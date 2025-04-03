import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    location: '',
    priority: 'medium'
  });

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/schedules');
      const data = await response.json();
      setSchedules(data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSchedule),
      });
      if (response.ok) {
        fetchSchedules();
        setNewSchedule({
          title: '',
          description: '',
          startTime: '',
          endTime: '',
          location: '',
          priority: 'medium'
        });
      }
    } catch (error) {
      console.error('Error creating schedule:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/schedules/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchSchedules();
      }
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Schedule Manager</h1>
      </header>
      <main>
        <section className="schedule-form">
          <h2>Add New Schedule</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newSchedule.title}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newSchedule.description}
              onChange={handleInputChange}
            />
            <input
              type="datetime-local"
              name="startTime"
              value={newSchedule.startTime}
              onChange={handleInputChange}
              required
            />
            <input
              type="datetime-local"
              name="endTime"
              value={newSchedule.endTime}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={newSchedule.location}
              onChange={handleInputChange}
            />
            <select
              name="priority"
              value={newSchedule.priority}
              onChange={handleInputChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button type="submit">Add Schedule</button>
          </form>
        </section>

        <section className="schedule-list">
          <h2>Your Schedules</h2>
          <div className="schedules">
            {schedules.map(schedule => (
              <div key={schedule._id} className="schedule-card">
                <h3>{schedule.title}</h3>
                <p>{schedule.description}</p>
                <p>Start: {new Date(schedule.startTime).toLocaleString()}</p>
                <p>End: {new Date(schedule.endTime).toLocaleString()}</p>
                <p>Location: {schedule.location}</p>
                <p>Priority: {schedule.priority}</p>
                <button onClick={() => handleDelete(schedule._id)}>Delete</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App; 