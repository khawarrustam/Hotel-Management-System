import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the hotel management system</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Rooms</h3>
          <p className="stat-number">48</p>
        </div>
        <div className="stat-card">
          <h3>Active Bookings</h3>
          <p className="stat-number">32</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-number">$45,230</p>
        </div>
        <div className="stat-card">
          <h3>Occupancy Rate</h3>
          <p className="stat-number">78%</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-bookings">
          <h2>Recent Bookings</h2>
          {/* Add recent bookings table */}
        </div>
        
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <button>Add New Room</button>
          <button>View All Bookings</button>
          <button>Generate Report</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
