import React from 'react';

function TestApp() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#1E3A8A' }}>Hotel Management System</h1>
      <p>This is a test to see if React is working properly.</p>
      <button onClick={() => alert('React is working!')}>
        Click me to test
      </button>
    </div>
  );
}

export default TestApp;
