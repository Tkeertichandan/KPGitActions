import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config.js';

export default function Missile() {
  const [formData, setFormData] = useState({
    name: '',
    range: '',
    weight: '',
    organization: ''
  });

  const [missileList, setMissileList] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // States for viewing missile by ID
  const [viewId, setViewId] = useState('');
  const [viewMissile, setViewMissile] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Submit missile (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        const response = await axios.put(`${config.url}/missile/update`, { id: editId, ...formData });
        if (response.status === 200) {
          setMessage(response.data);
          setError('');
          setFormData({ name: '', range: '', weight: '', organization: '' });
          setEditMode(false);
          setEditId(null);
          fetchMissiles();
        }
      } else {
        const response = await axios.post(`${config.url}/missile/add`, formData);
        if (response.status === 200) {
          setMessage(response.data);
          setError('');
          setFormData({ name: '', range: '', weight: '', organization: '' });
          fetchMissiles();
        }
      }
    } catch (error) {
      setMessage('');
      setError(editMode ? "Failed to update missile" : "Failed to add missile");
    }
  };

  // Fetch all missiles
  const fetchMissiles = async () => {
    try {
      const response = await axios.get(`${config.url}/missile/viewall`);
      setMissileList(response.data);
    } catch (error) {
      setError("Failed to fetch missiles");
    }
  };

  // Delete missile
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this missile?")) {
      try {
        const response = await axios.delete(`${config.url}/missile/delete/${id}`);
        setMessage(response.data);
        setError('');
        fetchMissiles();
      } catch (error) {
        setMessage('');
        setError("Failed to delete missile");
      }
    }
  };

  // Edit missile
  const handleEdit = (missile) => {
    setFormData({
      name: missile.name,
      range: missile.range,
      weight: missile.weight,
      organization: missile.organization
    });
    setEditId(missile.id);
    setEditMode(true);
  };

  // View missile by ID
  const handleViewById = async () => {
    if (!viewId) {
      setError("Please enter a Missile ID");
      setViewMissile(null);
      return;
    }
    try {
      const response = await axios.get(`${config.url}/missile/viewbyid/${viewId}`);
      setViewMissile(response.data);
      setError('');
      setMessage('');
    } catch (error) {
      setViewMissile(null);
      setError("Missile not found or error fetching missile");
    }
  };

  useEffect(() => {
    fetchMissiles();
  }, []);

  return (
    <div>
      {/* Add / Update Missile Form */}
      <div className="missile-form-container">
        <h3>{editMode ? "Update Missile" : "Add Missile"}</h3>
        {message ? (
          <p className="missile-message success">{message}</p>
        ) : (
          error && <p className="missile-message error">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Missile Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Range (in km)</label>
            <input
              type="number"
              id="range"
              value={formData.range}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Weight (in kg)</label>
            <input
              type="number"
              id="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Organization</label>
            <input
              type="text"
              id="organization"
              value={formData.organization}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">{editMode ? "Update Missile" : "Add Missile"}</button>
        </form>
      </div>

      {/* View Missile by ID */}
      <div className="missile-view-by-id" style={{ marginTop: "30px" }}>
        <h3>View Missile by ID</h3>
        <input
          type="number"
          placeholder="Enter Missile ID"
          value={viewId}
          onChange={(e) => setViewId(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleViewById}>View</button>

        {viewMissile && (
          <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "15px", borderRadius: "10px" }}>
            <h4>Missile Details</h4>
            <p><strong>ID:</strong> {viewMissile.id}</p>
            <p><strong>Name:</strong> {viewMissile.name}</p>
            <p><strong>Range:</strong> {viewMissile.range} km</p>
            <p><strong>Weight:</strong> {viewMissile.weight} kg</p>
            <p><strong>Organization:</strong> {viewMissile.organization}</p>
          </div>
        )}
      </div>

      {/* All Missiles Table */}
      <div className="missile-table-container" style={{ marginTop: "30px" }}>
        <h3 style={{ textAlign: "center", textDecoration: "underline" }}>All Missiles</h3>
        {missileList.length === 0 ? (
          <p style={{ textAlign: "center" }}>No missiles found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Missile Name</th>
                <th>Range (km)</th>
                <th>Weight (kg)</th>
                <th>Organization</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {missileList.map((missile) => (
                <tr key={missile.id}>
                  <td>{missile.id}</td>
                  <td>{missile.name}</td>
                  <td>{missile.range}</td>
                  <td>{missile.weight}</td>
                  <td>{missile.organization}</td>
                  <td>
                    <button onClick={() => handleEdit(missile)}>Edit</button>
                    <button onClick={() => handleDelete(missile.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
