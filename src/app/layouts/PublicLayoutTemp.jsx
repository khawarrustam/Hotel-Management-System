import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="public-layout">
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
