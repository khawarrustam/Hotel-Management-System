import React from 'react';
import './AdminRooms.scss';

const AdminRoomsTest = () => {
  return (
    <div className="admin-rooms">
      <div className="rooms-header">
        <div className="header-content">
          <div className="title-section">
            <h1 className="page-title">Manage Rooms - Test</h1>
            <p className="page-subtitle">Luxury Hotel Room Management System</p>
          </div>
          <button className="add-room-btn">
            Add New Room
          </button>
        </div>
      </div>
      
      <div className="controls-section">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search by room name or type..."
          />
        </div>
      </div>
      
      <div className="no-results">
        <h3>Admin Rooms Component Loaded Successfully!</h3>
        <p>The component is working. Ready to load full functionality.</p>
      </div>
    </div>
  );
};

export default AdminRoomsTest;
