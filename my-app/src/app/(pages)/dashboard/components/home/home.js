'use client';
import './home.css';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { FiRefreshCw, FiUsers, FiCalendar, FiAward, FiTrendingUp } from 'react-icons/fi';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const Home = () => {
    const [stats, setStats] = useState({
        totalActivities: 0,
        totalStudents: 0,
        totalDomains: 0,
        recentActivities: [],
        topDomains: [],
        monthlyGrowth: [],
        upcomingEvents: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const chartColors = {
        green: {
            primary: '#10B981',
            secondary: '#D1FAE5',
            gradient: ['#059669', '#047857', '#065F46', '#064E3B']
        },
        text: '#1F2937',
        grid: '#E5E7EB'
    };

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/dashboard/stats');
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Failed to fetch dashboard stats');
            }
            
            setStats(result.data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Dashboard error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    if (loading) {
        return (
            <div className="dashboard-stats loading">
                <div className="loader"></div>
                <p>Loading dashboard statistics...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-stats error">
                <p>Error: {error}</p>
                <button onClick={fetchDashboardStats} className="refresh-btn">
                    <FiRefreshCw /> Try Again
                </button>
            </div>
        );
    }

    const activityTrendsData = {
        labels: stats.monthlyGrowth.map(item => item.month),
        datasets: [
            {
                label: 'Activity Growth',
                data: stats.monthlyGrowth.map(item => item.count),
                borderColor: chartColors.green.primary,
                backgroundColor: `${chartColors.green.primary}20`,
                fill: true,
                tension: 0.4
            }
        ]
    };

    const domainDistributionData = {
        labels: stats.topDomains.map(item => item.name),
        datasets: [{
            data: stats.topDomains.map(item => item.count),
            backgroundColor: chartColors.green.gradient,
            borderWidth: 0
        }]
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="header-content">
                    <h1>Analytics Dashboard</h1>
                    <button onClick={fetchDashboardStats} className="refresh-btn" title="Refresh data">
                        <FiRefreshCw />
                    </button>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">
                        <FiCalendar />
                    </div>
                    <div className="stat-info">
                        <h3>Total Activities</h3>
                        <div className="value">{stats.totalActivities.toLocaleString()}</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <FiUsers />
                    </div>
                    <div className="stat-info">
                        <h3>Student Participations</h3>
                        <div className="value">{stats.totalStudents.toLocaleString()}</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <FiAward />
                    </div>
                    <div className="stat-info">
                        <h3>Active Domains</h3>
                        <div className="value">{stats.totalDomains}</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <FiTrendingUp />
                    </div>
                    <div className="stat-info">
                        <h3>Upcoming Events</h3>
                        <div className="value">{stats.upcomingEvents}</div>
                    </div>
                </div>
            </div>

            <div className="charts-container">
                <div className="chart-card wide">
                    <h3>Activity Growth Trends</h3>
                    <Line 
                        data={activityTrendsData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    grid: {
                                        color: chartColors.grid
                                    }
                                },
                                x: {
                                    grid: {
                                        display: false
                                    }
                                }
                            }
                        }}
                    />
                </div>

                <div className="chart-card">
                    <h3>Domain Distribution</h3>
                    <Doughnut 
                        data={domainDistributionData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                    labels: {
                                        padding: 20,
                                        usePointStyle: true
                                    }
                                }
                            }
                        }}
                    />
                </div>

                <div className="chart-card">
                    <h3>Recent Activities</h3>
                    <div className="activity-list">
                        {stats.recentActivities.map((activity, index) => (
                            <div key={index} className="activity-item">
                                <div className="activity-name">{activity.name}</div>
                                <div className="activity-date">{activity.date}</div>
                                <div className="activity-participants">
                                    {activity.participants} participants
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;