import React from 'react';

const SimpleHome = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Luxury Hotel</h1>
      <p>This is the home page.</p>
      <div>
        <a href="/rooms" style={{ marginRight: '20px' }}>Rooms</a>
        <a href="/admin-demo/rooms">Admin Rooms</a>
      </div>
    </div>
  );
};

export default SimpleHome;
