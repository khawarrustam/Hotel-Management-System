import React from 'react';
import { Outlet } from 'react-router-dom';
// Import admin navigation components when created
// import AdminHeader from '../../components/organisms/AdminHeader';
// import AdminSidebar from '../../components/organisms/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* <AdminHeader /> */}
      <div className="admin-content">
        {/* <AdminSidebar /> */}
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
