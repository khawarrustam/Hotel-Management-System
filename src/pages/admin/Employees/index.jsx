import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaPlus, FaSearch, FaFilter, FaTimes, FaCamera, FaUser, FaEye, FaSort, FaSortUp, FaSortDown, FaDownload, FaFileExcel, FaFilePdf, FaUserPlus, FaBell, FaCalendarAlt, FaPhone, FaEnvelope, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import './AdminEmployees.scss';

const AdminEmployees = () => {
  // Sample employee data
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Manager',
      department: 'Front Desk',
      email: 'sarah.johnson@luxuryhotel.com',
      phone: '+1 (555) 123-4567',
      status: 'Active',
      photo: '/src/images/customers/customer1.svg',
      hireDate: '2022-01-15',
      salary: '$75,000',
      performance: 4.8,
      address: '123 Main St, New York, NY',
      emergencyContact: '+1 (555) 987-6543',
      department_id: 1,
      shift: 'Morning',
      birthDate: '1985-06-15',
      experience: '8 years'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Receptionist',
      department: 'Front Desk',
      email: 'michael.chen@luxuryhotel.com',
      phone: '+1 (555) 234-5678',
      status: 'Active',
      photo: '/src/images/customers/customer2.svg',
      hireDate: '2022-03-20',
      salary: '$45,000',
      performance: 4.6,
      address: '456 Oak Ave, Brooklyn, NY',
      emergencyContact: '+1 (555) 876-5432',
      department_id: 1,
      shift: 'Evening',
      birthDate: '1990-02-28',
      experience: '3 years'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Housekeeping',
      department: 'Housekeeping',
      email: 'emma.rodriguez@luxuryhotel.com',
      phone: '+1 (555) 345-6789',
      status: 'Active',
      photo: '/src/images/customers/customer3.svg',
      hireDate: '2021-11-10',
      salary: '$35,000',
      performance: 4.9,
      address: '789 Pine St, Queens, NY',
      emergencyContact: '+1 (555) 765-4321',
      department_id: 2,
      shift: 'Morning',
      birthDate: '1988-11-03',
      experience: '5 years'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Concierge',
      department: 'Guest Services',
      email: 'david.thompson@luxuryhotel.com',
      phone: '+1 (555) 456-7890',
      status: 'Active',
      photo: '/src/images/customers/customer4.svg',
      hireDate: '2022-02-28',
      salary: '$55,000',
      performance: 4.7,
      address: '321 Elm St, Manhattan, NY',
      emergencyContact: '+1 (555) 654-3210',
      department_id: 3,
      shift: 'Evening',
      birthDate: '1987-07-12',
      experience: '6 years'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      role: 'Chef',
      department: 'Kitchen',
      email: 'lisa.wang@luxuryhotel.com',
      phone: '+1 (555) 567-8901',
      status: 'Inactive',
      photo: '/src/images/customers/customer.svg',
      hireDate: '2021-08-05',
      salary: '$65,000',
      performance: 4.5,
      address: '654 Maple Ave, Bronx, NY',
      emergencyContact: '+1 (555) 543-2109',
      department_id: 4,
      shift: 'Night',
      birthDate: '1982-12-20',
      experience: '12 years'
    },
    {
      id: 6,
      name: 'Robert Smith',
      role: 'Security',
      department: 'Security',
      email: 'robert.smith@luxuryhotel.com',
      phone: '+1 (555) 678-9012',
      status: 'Active',
      photo: '/src/images/customers/customer1.svg',
      hireDate: '2022-04-12',
      salary: '$40,000',
      performance: 4.4,
      address: '987 Cedar Rd, Staten Island, NY',
      emergencyContact: '+1 (555) 432-1098',
      department_id: 5,
      shift: 'Night',
      birthDate: '1975-03-08',
      experience: '15 years'
    },
    {
      id: 7,
      name: 'Jennifer Martinez',
      role: 'Event Coordinator',
      department: 'Events',
      email: 'jennifer.martinez@luxuryhotel.com',
      phone: '+1 (555) 789-0123',
      status: 'Active',
      photo: '/src/images/customers/customer2.svg',
      hireDate: '2021-12-01',
      salary: '$58,000',
      performance: 4.8,
      address: '147 Birch Lane, Long Island, NY',
      emergencyContact: '+1 (555) 321-0987',
      department_id: 6,
      shift: 'Morning',
      birthDate: '1989-09-14',
      experience: '7 years'
    },
    {
      id: 8,
      name: 'James Wilson',
      role: 'Maintenance',
      department: 'Maintenance',
      email: 'james.wilson@luxuryhotel.com',
      phone: '+1 (555) 890-1234',
      status: 'Active',
      photo: '/src/images/customers/customer3.svg',
      hireDate: '2022-01-30',
      salary: '$42,000',
      performance: 4.6,
      address: '258 Willow St, Yonkers, NY',
      emergencyContact: '+1 (555) 210-9876',
      department_id: 7,
      shift: 'Morning',
      birthDate: '1980-05-22',
      experience: '10 years'
    },
    {
      id: 9,
      name: 'Amanda Foster',
      role: 'Spa Therapist',
      department: 'Spa & Wellness',
      email: 'amanda.foster@luxuryhotel.com',
      phone: '+1 (555) 901-2345',
      status: 'Active',
      photo: '/src/images/customers/customer4.svg',
      hireDate: '2021-09-15',
      salary: '$48,000',
      performance: 4.9,
      address: '369 Sunset Blvd, Manhattan, NY',
      emergencyContact: '+1 (555) 109-8765',
      department_id: 8,
      shift: 'Evening',
      birthDate: '1991-01-30',
      experience: '4 years'
    },
    {
      id: 10,
      name: 'Carlos Rodriguez',
      role: 'Valet',
      department: 'Guest Services',
      email: 'carlos.rodriguez@luxuryhotel.com',
      phone: '+1 (555) 012-3456',
      status: 'Active',
      photo: '/src/images/customers/customer.svg',
      hireDate: '2022-06-08',
      salary: '$38,000',
      performance: 4.3,
      address: '741 Ocean Drive, Brooklyn, NY',
      emergencyContact: '+1 (555) 098-7654',
      department_id: 3,
      shift: 'Evening',
      birthDate: '1992-08-18',
      experience: '2 years'
    }
  ]);

  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [shiftFilter, setShiftFilter] = useState('All Shifts');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', or 'view'
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    email: '',
    phone: '',
    status: 'Active',
    photo: '',
    hireDate: '',
    salary: '',
    performance: '',
    address: '',
    emergencyContact: '',
    shift: '',
    birthDate: '',
    experience: ''
  });

  const roles = ['Manager', 'Receptionist', 'Housekeeping', 'Concierge', 'Chef', 'Security', 'Event Coordinator', 'Maintenance', 'Spa Therapist', 'Valet'];
  const departments = ['Front Desk', 'Housekeeping', 'Guest Services', 'Kitchen', 'Security', 'Events', 'Maintenance', 'Spa & Wellness'];
  const shifts = ['Morning', 'Evening', 'Night'];

  // Filter and search functionality
  useEffect(() => {
    let filtered = employees.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = roleFilter === 'All Roles' || employee.role === roleFilter;
      const matchesStatus = statusFilter === 'All Status' || employee.status === statusFilter;
      const matchesDepartment = departmentFilter === 'All Departments' || employee.department === departmentFilter;
      const matchesShift = shiftFilter === 'All Shifts' || employee.shift === shiftFilter;
      
      return matchesSearch && matchesRole && matchesStatus && matchesDepartment && matchesShift;
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'performance') {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        } else if (sortConfig.key === 'hireDate' || sortConfig.key === 'birthDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredEmployees(filtered);
    setCurrentPage(1);
  }, [employees, searchTerm, roleFilter, statusFilter, departmentFilter, shiftFilter, sortConfig]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Sorting functionality
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return <FaSort className="sort-icon" />;
    }
    return sortConfig.direction === 'asc' 
      ? <FaSortUp className="sort-icon active" />
      : <FaSortDown className="sort-icon active" />;
  };

  // Bulk actions
  const handleSelectEmployee = (employeeId) => {
    setSelectedEmployees(prev => {
      if (prev.includes(employeeId)) {
        return prev.filter(id => id !== employeeId);
      } else {
        return [...prev, employeeId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === currentEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(currentEmployees.map(emp => emp.id));
    }
  };

  const handleBulkStatusChange = (newStatus) => {
    setEmployees(prev => prev.map(emp => 
      selectedEmployees.includes(emp.id) ? { ...emp, status: newStatus } : emp
    ));
    setSelectedEmployees([]);
    setShowBulkActions(false);
  };

  const handleBulkDelete = () => {
    setEmployees(prev => prev.filter(emp => !selectedEmployees.includes(emp.id)));
    setSelectedEmployees([]);
    setShowBulkActions(false);
  };

  // Export functionality
  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Role', 'Department', 'Email', 'Phone', 'Status', 'Hire Date', 'Salary', 'Performance'];
    const csvContent = [
      headers.join(','),
      ...filteredEmployees.map(emp => [
        emp.id,
        `"${emp.name}"`,
        `"${emp.role}"`,
        `"${emp.department}"`,
        emp.email,
        emp.phone,
        emp.status,
        emp.hireDate,
        emp.salary,
        emp.performance
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `employees_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Modal functions
  const openAddModal = () => {
    setModalMode('add');
    setFormData({
      name: '',
      role: '',
      department: '',
      email: '',
      phone: '',
      status: 'Active',
      photo: '',
      hireDate: '',
      salary: '',
      performance: '',
      address: '',
      emergencyContact: '',
      shift: '',
      birthDate: '',
      experience: ''
    });
    setShowModal(true);
  };

  const openViewModal = (employee) => {
    setModalMode('view');
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const openEditModal = (employee) => {
    setModalMode('edit');
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      role: employee.role,
      department: employee.department,
      email: employee.email,
      phone: employee.phone,
      status: employee.status,
      photo: employee.photo,
      hireDate: employee.hireDate,
      salary: employee.salary,
      performance: employee.performance || '',
      address: employee.address || '',
      emergencyContact: employee.emergencyContact || '',
      shift: employee.shift || '',
      birthDate: employee.birthDate || '',
      experience: employee.experience || ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
    setFormData({
      name: '',
      role: '',
      department: '',
      email: '',
      phone: '',
      status: 'Active',
      photo: '',
      hireDate: '',
      salary: '',
      performance: '',
      address: '',
      emergencyContact: '',
      shift: '',
      birthDate: '',
      experience: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          photo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalMode === 'add') {
      const newEmployee = {
        ...formData,
        id: Math.max(...employees.map(emp => emp.id)) + 1,
        photo: formData.photo || '/src/images/customers/customer.svg'
      };
      setEmployees(prev => [...prev, newEmployee]);
    } else {
      setEmployees(prev => prev.map(emp => 
        emp.id === selectedEmployee.id ? { ...emp, ...formData } : emp
      ));
    }
    
    closeModal();
  };

  const openDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setEmployeeToDelete(null);
  };

  const handleDelete = () => {
    setEmployees(prev => prev.filter(emp => emp.id !== employeeToDelete.id));
    closeDeleteModal();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setRoleFilter('All Roles');
    setStatusFilter('All Status');
    setDepartmentFilter('All Departments');
    setShiftFilter('All Shifts');
    setSortConfig({ key: 'name', direction: 'asc' });
  };

  return (
    <div className="admin-employees">
      {/* Header */}
      <div className="employees-header">
        <div className="header-left">
          <h1 className="page-title">Manage Employees</h1>
          <p className="page-subtitle">Oversee your hotel staff and their details</p>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">{employees.filter(e => e.status === 'Active').length}</span>
              <span className="stat-label">Active</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{employees.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{departments.length}</span>
              <span className="stat-label">Departments</span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          {selectedEmployees.length > 0 && (
            <div className="bulk-actions">
              <button 
                className="bulk-action-btn"
                onClick={() => setShowBulkActions(!showBulkActions)}
              >
                <FaBell />
                {selectedEmployees.length} Selected
              </button>
              {showBulkActions && (
                <div className="bulk-actions-dropdown">
                  <button onClick={() => handleBulkStatusChange('Active')}>
                    Mark as Active
                  </button>
                  <button onClick={() => handleBulkStatusChange('Inactive')}>
                    Mark as Inactive
                  </button>
                  <button onClick={handleBulkDelete} className="danger">
                    Delete Selected
                  </button>
                </div>
              )}
            </div>
          )}
          <button className="export-btn" onClick={exportToCSV}>
            <FaDownload />
            <span>Export</span>
          </button>
          <button className="add-employee-btn" onClick={openAddModal}>
            <FaPlus />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="employees-controls">
        <div className="search-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by employee name or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filters-section">
          <button 
            className={`filters-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter />
            <span>Filters</span>
          </button>

          <div className={`filters-container ${showFilters ? 'show' : ''}`}>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All Roles">All Roles</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All Departments">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={shiftFilter}
              onChange={(e) => setShiftFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All Shifts">All Shifts</option>
              {shifts.map(shift => (
                <option key={shift} value={shift}>{shift}</option>
              ))}
            </select>

            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Employees Table/Cards */}
      <div className="employees-content">
        {/* Desktop Table View */}
        <div className="employees-table-container">
          <table className="employees-table">
            <thead>
              <tr>
                <th className="checkbox-column">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.length === currentEmployees.length && currentEmployees.length > 0}
                    onChange={handleSelectAll}
                    className="checkbox-input"
                  />
                </th>
                <th onClick={() => handleSort('name')} className="sortable">
                  Employee {getSortIcon('name')}
                </th>
                <th onClick={() => handleSort('role')} className="sortable">
                  Role {getSortIcon('role')}
                </th>
                <th onClick={() => handleSort('department')} className="sortable">
                  Department {getSortIcon('department')}
                </th>
                <th>Contact</th>
                <th onClick={() => handleSort('performance')} className="sortable">
                  Performance {getSortIcon('performance')}
                </th>
                <th onClick={() => handleSort('status')} className="sortable">
                  Status {getSortIcon('status')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map(employee => (
                <tr key={employee.id} className="employee-row">
                  <td className="checkbox-column">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(employee.id)}
                      onChange={() => handleSelectEmployee(employee.id)}
                      className="checkbox-input"
                    />
                  </td>
                  <td className="employee-info">
                    <div className="employee-avatar">
                      <img 
                        src={employee.photo} 
                        alt={employee.name}
                        onError={(e) => {
                          e.target.src = '/src/images/customers/customer.svg';
                        }}
                      />
                    </div>
                    <div className="employee-details">
                      <span className="employee-name">{employee.name}</span>
                      <span className="employee-id">ID: {employee.id}</span>
                    </div>
                  </td>
                  <td className="employee-role">
                    <span className={`role-badge ${employee.role.toLowerCase().replace(' ', '-')}`}>
                      {employee.role}
                    </span>
                  </td>
                  <td className="employee-department">{employee.department}</td>
                  <td className="employee-contact">
                    <div className="contact-info">
                      <span className="email">{employee.email}</span>
                      <span className="phone">{employee.phone}</span>
                    </div>
                  </td>
                  <td className="employee-performance">
                    <div className="performance-rating">
                      <FaStar className="star-icon" />
                      <span>{employee.performance}</span>
                    </div>
                  </td>
                  <td className="employee-status">
                    <span className={`status-badge ${employee.status.toLowerCase()}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="employee-actions">
                    <div className="action-buttons">
                      <button 
                        className="action-btn view"
                        onClick={() => openViewModal(employee)}
                        title="View Employee Details"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="action-btn edit"
                        onClick={() => openEditModal(employee)}
                        title="Edit Employee"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={() => openDeleteModal(employee)}
                        title="Delete Employee"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="employees-cards">
          {currentEmployees.map(employee => (
            <div key={employee.id} className="employee-card">
              <div className="card-header">
                <div className="employee-avatar">
                  <img 
                    src={employee.photo} 
                    alt={employee.name}
                    onError={(e) => {
                      e.target.src = '/src/images/customers/customer.svg';
                    }}
                  />
                </div>
                <div className="employee-info">
                  <h3 className="employee-name">{employee.name}</h3>
                  <span className="employee-id">ID: {employee.id}</span>
                </div>
                <span className={`status-badge ${employee.status.toLowerCase()}`}>
                  {employee.status}
                </span>
              </div>
              <div className="card-body">
                <div className="info-row">
                  <span className="label">Role:</span>
                  <span className={`role-badge ${employee.role.toLowerCase().replace(' ', '-')}`}>
                    {employee.role}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">Department:</span>
                  <span className="value">{employee.department}</span>
                </div>
                <div className="info-row">
                  <span className="label">Email:</span>
                  <span className="value">{employee.email}</span>
                </div>
                <div className="info-row">
                  <span className="label">Phone:</span>
                  <span className="value">{employee.phone}</span>
                </div>
                <div className="info-row">
                  <span className="label">Performance:</span>
                  <div className="performance-rating">
                    <FaStar className="star-icon" />
                    <span>{employee.performance}</span>
                  </div>
                </div>
                <div className="info-row">
                  <span className="label">Shift:</span>
                  <span className="value">{employee.shift}</span>
                </div>
              </div>
              <div className="card-actions">
                <button 
                  className="action-btn view"
                  onClick={() => openViewModal(employee)}
                >
                  <FaEye />
                  <span>View</span>
                </button>
                <button 
                  className="action-btn edit"
                  onClick={() => openEditModal(employee)}
                >
                  <FaEdit />
                  <span>Edit</span>
                </button>
                <button 
                  className="action-btn delete"
                  onClick={() => openDeleteModal(employee)}
                >
                  <FaTrashAlt />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEmployees.length === 0 && (
          <div className="empty-state">
            <FaUser className="empty-icon" />
            <h3>No employees found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <div className="pagination-info">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredEmployees.length)} of {filteredEmployees.length} employees
          </div>
          <div className="pagination-controls">
            <button 
              className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            
            <button 
              className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Employee Modal - Add/Edit/View */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content employee-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {modalMode === 'add' && 'Add New Employee'}
                {modalMode === 'edit' && 'Edit Employee'}
                {modalMode === 'view' && 'Employee Details'}
              </h2>
              <button className="modal-close" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            
            {modalMode === 'view' ? (
              // View Mode
              <div className="employee-details-view">
                <div className="employee-header">
                  <div className="employee-photo">
                    <img 
                      src={selectedEmployee?.photo} 
                      alt={selectedEmployee?.name}
                      onError={(e) => {
                        e.target.src = '/src/images/customers/customer.svg';
                      }}
                    />
                  </div>
                  <div className="employee-info">
                    <h3>{selectedEmployee?.name}</h3>
                    <span className={`role-badge ${selectedEmployee?.role.toLowerCase().replace(' ', '-')}`}>
                      {selectedEmployee?.role}
                    </span>
                    <span className={`status-badge ${selectedEmployee?.status.toLowerCase()}`}>
                      {selectedEmployee?.status}
                    </span>
                  </div>
                  <div className="performance-display">
                    <div className="performance-rating large">
                      <FaStar className="star-icon" />
                      <span>{selectedEmployee?.performance}</span>
                    </div>
                    <span className="performance-label">Performance</span>
                  </div>
                </div>

                <div className="details-grid">
                  <div className="detail-section">
                    <h4><FaUser /> Personal Information</h4>
                    <div className="detail-row">
                      <span className="label">Employee ID:</span>
                      <span className="value">{selectedEmployee?.id}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Birth Date:</span>
                      <span className="value">{selectedEmployee?.birthDate || 'Not provided'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Address:</span>
                      <span className="value">{selectedEmployee?.address || 'Not provided'}</span>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4><FaPhone /> Contact Information</h4>
                    <div className="detail-row">
                      <span className="label">Email:</span>
                      <span className="value">{selectedEmployee?.email}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Phone:</span>
                      <span className="value">{selectedEmployee?.phone}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Emergency Contact:</span>
                      <span className="value">{selectedEmployee?.emergencyContact || 'Not provided'}</span>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4><FaCalendarAlt /> Work Information</h4>
                    <div className="detail-row">
                      <span className="label">Department:</span>
                      <span className="value">{selectedEmployee?.department}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Hire Date:</span>
                      <span className="value">{selectedEmployee?.hireDate}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Shift:</span>
                      <span className="value">{selectedEmployee?.shift || 'Not assigned'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Experience:</span>
                      <span className="value">{selectedEmployee?.experience || 'Not provided'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Salary:</span>
                      <span className="value">{selectedEmployee?.salary}</span>
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => openEditModal(selectedEmployee)}
                  >
                    <FaEdit />
                    Edit Employee
                  </button>
                  <button className="cancel-btn" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            ) : (
              // Add/Edit Mode
              <form onSubmit={handleSubmit} className="employee-form">
                <div className="form-row">
                  <div className="photo-upload">
                    <div className="photo-preview">
                      {formData.photo ? (
                        <img src={formData.photo} alt="Employee" />
                      ) : (
                        <div className="photo-placeholder">
                          <FaCamera />
                          <span>Upload Photo</span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="photo-input"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="photo-upload-btn">
                      <FaCamera />
                      Choose Photo
                    </label>
                  </div>
                </div>

                <div className="form-section">
                  <h4>Personal Information</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="birthDate">Birth Date</label>
                      <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group full-width">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter full address"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4>Contact Information</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="employee@luxuryhotel.com"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="emergencyContact">Emergency Contact</label>
                      <input
                        type="tel"
                        id="emergencyContact"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 987-6543"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4>Work Information</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="role">Role *</label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select role</option>
                        {roles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="department">Department *</label>
                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="shift">Shift</label>
                      <select
                        id="shift"
                        name="shift"
                        value={formData.shift}
                        onChange={handleInputChange}
                      >
                        <option value="">Select shift</option>
                        {shifts.map(shift => (
                          <option key={shift} value={shift}>{shift}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="hireDate">Hire Date</label>
                      <input
                        type="date"
                        id="hireDate"
                        name="hireDate"
                        value={formData.hireDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="experience">Experience</label>
                      <input
                        type="text"
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="5 years"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="salary">Salary</label>
                      <input
                        type="text"
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        placeholder="$50,000"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="performance">Performance Rating</label>
                      <input
                        type="number"
                        id="performance"
                        name="performance"
                        value={formData.performance}
                        onChange={handleInputChange}
                        min="1"
                        max="5"
                        step="0.1"
                        placeholder="4.5"
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    <FaUserPlus />
                    {modalMode === 'add' ? 'Add Employee' : 'Update Employee'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button className="modal-close" onClick={closeDeleteModal}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{employeeToDelete?.name}</strong>?</p>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={closeDeleteModal}>
                Cancel
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                Delete Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmployees;
