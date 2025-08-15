import React, { useState, useEffect } from 'react';

const AdminEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      // API call to fetch employees
      setEmployees([]); // Placeholder
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading employees...</div>;

  return (
    <div className="admin-employees">
      <div className="page-header">
        <h1>Employee Management</h1>
        <button className="add-btn">Add New Employee</button>
      </div>

      <div className="employees-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="6">No employees found</td>
              </tr>
            ) : (
              employees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.firstName} {employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                  <td>{employee.department}</td>
                  <td>{employee.status}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEmployees;
