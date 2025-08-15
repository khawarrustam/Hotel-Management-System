import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaBed,
  FaCalendarAlt,
  FaUsers,
  FaStar,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaDollarSign,
  FaChartLine,
  FaEye,
  FaPlus,
  FaCheckCircle,
  FaTimesCircle,
  FaClock
} from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import './AdminDashboard.scss';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

// Mock data for the dashboard
const mockData = {
  stats: {
    totalRooms: 48,
    currentBookings: 32,
    totalRevenue: 45230,
    pendingReviews: 8,
    occupancyRate: 78
  },
  recentBookings: [
    {
      id: 1,
      guestName: 'John Smith',
      room: 'Deluxe Suite 201',
      checkIn: '2025-08-16',
      status: 'confirmed',
      amount: 450
    },
    {
      id: 2,
      guestName: 'Sarah Johnson',
      room: 'Standard Room 105',
      checkIn: '2025-08-17',
      status: 'pending',
      amount: 280
    },
    {
      id: 3,
      guestName: 'Michael Brown',
      room: 'Presidential Suite',
      checkIn: '2025-08-18',
      status: 'confirmed',
      amount: 850
    },
    {
      id: 4,
      guestName: 'Emily Davis',
      room: 'Deluxe Room 304',
      checkIn: '2025-08-19',
      status: 'cancelled',
      amount: 320
    },
    {
      id: 5,
      guestName: 'Robert Wilson',
      room: 'Suite 402',
      checkIn: '2025-08-20',
      status: 'confirmed',
      amount: 520
    }
  ],
  recentReviews: [
    {
      id: 1,
      guestName: 'Alice Cooper',
      rating: 5,
      comment: 'Absolutely wonderful stay! The service was exceptional...',
      date: '2025-08-14',
      status: 'approved'
    },
    {
      id: 2,
      guestName: 'David Miller',
      rating: 4,
      comment: 'Great hotel with beautiful rooms. Minor issue with...',
      date: '2025-08-13',
      status: 'pending'
    },
    {
      id: 3,
      guestName: 'Lisa Anderson',
      rating: 5,
      comment: 'Perfect location and amazing staff. Will definitely...',
      date: '2025-08-12',
      status: 'approved'
    },
    {
      id: 4,
      guestName: 'James Taylor',
      rating: 4,
      comment: 'Very comfortable stay with excellent amenities...',
      date: '2025-08-11',
      status: 'approved'
    }
  ]
};

// Chart data configurations
const bookingsChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  datasets: [
    {
      label: 'Bookings',
      data: [65, 78, 90, 81, 95, 102, 88, 94],
      borderColor: '#1E3A8A',
      backgroundColor: 'rgba(30, 58, 138, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
    },
  ],
};

const roomTypeChartData = {
  labels: ['Standard Rooms', 'Deluxe Rooms', 'Suites', 'Presidential'],
  datasets: [
    {
      data: [45, 30, 20, 5],
      backgroundColor: ['#1E3A8A', '#3B82F6', '#FBBF24', '#F59E0B'],
      borderWidth: 0,
      hoverOffset: 8,
    },
  ],
};

const revenueChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  datasets: [
    {
      label: 'Revenue ($)',
      data: [28000, 32000, 38000, 35000, 42000, 45000, 41000, 48000],
      backgroundColor: '#FBBF24',
      borderColor: '#F59E0B',
      borderWidth: 2,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          family: 'Inter',
          size: 12,
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        font: {
          family: 'Inter',
          size: 11,
        },
      },
    },
    x: {
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        font: {
          family: 'Inter',
          size: 11,
        },
      },
    },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: {
          family: 'Inter',
          size: 12,
        },
        padding: 20,
      },
    },
  },
};

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      confirmed: 'status-badge confirmed',
      pending: 'status-badge pending',
      cancelled: 'status-badge cancelled',
      approved: 'status-badge approved',
    };

    const statusIcons = {
      confirmed: <FaCheckCircle />,
      pending: <FaClock />,
      cancelled: <FaTimesCircle />,
      approved: <FaCheckCircle />,
    };

    return (
      <span className={statusClasses[status]}>
        {statusIcons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'star filled' : 'star'}
      />
    ));
  };

  const sidebarItems = [
    { icon: FaHome, label: 'Dashboard', path: '/admin-demo', active: true },
    { icon: FaBed, label: 'Manage Rooms', path: '/admin-demo/rooms' },
    { icon: FaCalendarAlt, label: 'Manage Bookings', path: '/admin-demo/bookings' },
    { icon: FaUsers, label: 'Manage Employees', path: '/admin-demo/employees' },
    { icon: FaStar, label: 'Manage Reviews', path: '/admin-demo/reviews' },
    { icon: FaCog, label: 'Settings', path: '/admin-demo/settings' },
  ];

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Royal Hotel</h2>
          <button className="sidebar-toggle mobile-only" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`nav-item ${item.active ? 'active' : ''}`}
            >
              <item.icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Top Navbar */}
        <header className="admin-header">
          <div className="header-left">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              <FaBars />
            </button>
            <h1>Dashboard Overview</h1>
          </div>

          <div className="header-right">
            <div className="current-time">
              {currentTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
            <div className="admin-profile">
              <div className="profile-info">
                <span className="profile-name">Admin User</span>
                <span className="profile-role">Hotel Manager</span>
              </div>
              <div className="profile-avatar">
                <FaUser />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Stats Cards */}
          <section className="stats-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <FaBed />
                </div>
                <div className="stat-content">
                  <h3>Total Rooms</h3>
                  <p className="stat-number">{mockData.stats.totalRooms}</p>
                  <span className="stat-change positive">+2 this month</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <FaCalendarAlt />
                </div>
                <div className="stat-content">
                  <h3>Current Bookings</h3>
                  <p className="stat-number">{mockData.stats.currentBookings}</p>
                  <span className="stat-change positive">+8 this week</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <FaDollarSign />
                </div>
                <div className="stat-content">
                  <h3>Total Revenue</h3>
                  <p className="stat-number">{formatCurrency(mockData.stats.totalRevenue)}</p>
                  <span className="stat-change positive">+12% this month</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <FaStar />
                </div>
                <div className="stat-content">
                  <h3>Pending Reviews</h3>
                  <p className="stat-number">{mockData.stats.pendingReviews}</p>
                  <span className="stat-change neutral">Awaiting approval</span>
                </div>
              </div>
            </div>
          </section>

          {/* Charts Section */}
          <section className="charts-section">
            <div className="charts-grid">
              <div className="chart-card">
                <div className="chart-header">
                  <h3>Bookings Trend</h3>
                  <FaChartLine className="chart-icon" />
                </div>
                <div className="chart-container">
                  <Line data={bookingsChartData} options={chartOptions} />
                </div>
              </div>

              <div className="chart-card">
                <div className="chart-header">
                  <h3>Room Type Distribution</h3>
                  <FaBed className="chart-icon" />
                </div>
                <div className="chart-container">
                  <Doughnut data={roomTypeChartData} options={doughnutOptions} />
                </div>
              </div>

              <div className="chart-card chart-card-wide">
                <div className="chart-header">
                  <h3>Monthly Revenue</h3>
                  <FaDollarSign className="chart-icon" />
                </div>
                <div className="chart-container">
                  <Bar data={revenueChartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </section>

          {/* Tables and Quick Actions */}
          <section className="data-section">
            <div className="data-grid">
              {/* Recent Bookings */}
              <div className="data-card">
                <div className="card-header">
                  <h3>Recent Bookings</h3>
                  <button className="view-all-btn">
                    <FaEye />
                    View All
                  </button>
                </div>
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Guest</th>
                        <th>Room</th>
                        <th>Check-in</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockData.recentBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="guest-cell">
                            <div className="guest-avatar">
                              {booking.guestName.charAt(0)}
                            </div>
                            <span>{booking.guestName}</span>
                          </td>
                          <td>{booking.room}</td>
                          <td>{formatDate(booking.checkIn)}</td>
                          <td className="amount-cell">{formatCurrency(booking.amount)}</td>
                          <td>{getStatusBadge(booking.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="data-card">
                <div className="card-header">
                  <h3>Recent Reviews</h3>
                  <button className="view-all-btn">
                    <FaEye />
                    View All
                  </button>
                </div>
                <div className="reviews-container">
                  {mockData.recentReviews.map((review) => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <div className="reviewer-avatar">
                            {review.guestName.charAt(0)}
                          </div>
                          <div className="reviewer-details">
                            <span className="reviewer-name">{review.guestName}</span>
                            <div className="review-rating">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                        </div>
                        <div className="review-meta">
                          <span className="review-date">{formatDate(review.date)}</span>
                          {getStatusBadge(review.status)}
                        </div>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="actions-section">
            <div className="actions-card">
              <h3>Quick Actions</h3>
              <div className="actions-grid">
                <button className="action-btn primary">
                  <FaPlus />
                  Add New Room
                </button>
                <button className="action-btn secondary">
                  <FaEye />
                  View All Bookings
                </button>
                <button className="action-btn secondary">
                  <FaUsers />
                  Add Employee
                </button>
                <button className="action-btn secondary">
                  <FaChartLine />
                  Generate Report
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

export default AdminDashboard;
