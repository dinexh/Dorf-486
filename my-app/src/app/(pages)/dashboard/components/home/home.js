'use client';
import './home.css';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { FiRefreshCw, FiUsers, FiAward, FiActivity, FiBarChart2 } from 'react-icons/fi';

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
        overview: {
            totalActivities: 0,
            totalStudents: 0,
            totalDomains: 0,
            avgParticipation: 0
        },
        domainStats: [],
        yearlyStats: [],
        monthlyStats: [],
        topActivities: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const theme = {
        colors: {
            primary: '#10B981',
            secondary: '#059669',
            tertiary: '#047857',
            light: '#D1FAE5',
            text: '#1F2937',
            background: '#F9FAFB'
        },
        charts: {
            domain: ['#10B981', '#059669', '#047857', '#065F46', '#064E3B', '#022C22'],
            activities: '#10B981',
            students: '#059669'
        }
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

    const domainChartData = {
        labels: stats?.domainStats?.map(d => d.domainName) || [],
        datasets: [{
            label: 'Students per Domain',
            data: stats?.domainStats?.map(d => d.studentCount) || [],
            backgroundColor: theme.charts.domain,
            borderWidth: 0
        }]
    };

    const yearlyComparisonData = {
        labels: stats?.yearlyStats?.map(y => y.year) || [],
        datasets: [
            {
                label: 'Activities',
                data: stats?.yearlyStats?.map(y => y.activityCount) || [],
                backgroundColor: theme.charts.activities,
                borderColor: theme.charts.activities,
                type: 'line',
                fill: false
            },
            {
                label: 'Students',
                data: stats?.yearlyStats?.map(y => y.studentCount) || [],
                backgroundColor: theme.charts.students,
                borderColor: theme.charts.students,
                type: 'bar'
            }
        ]
    };

    const monthlyTrendsData = {
        labels: stats?.monthlyStats?.map(m => m.month) || [],
        datasets: [
            {
                label: 'Activities',
                data: stats?.monthlyStats?.map(m => m.activityCount) || [],
                borderColor: theme.charts.activities,
                backgroundColor: `${theme.charts.activities}20`,
                fill: true
            }
        ]
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Analytics Dashboard</h1>
                <button onClick={fetchDashboardStats} className="refresh-btn">
                    <FiRefreshCw />
                </button>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">
                        <FiActivity />
                    </div>
                    <div className="stat-info">
                        <h3>Total Activities</h3>
                        <div className="value">
                            {stats?.overview?.totalActivities?.toLocaleString() || '0'}
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <FiUsers />
                    </div>
                    <div className="stat-info">
                        <h3>Total Students</h3>
                        <div className="value">
                            {stats?.overview?.totalStudents?.toLocaleString() || '0'}
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <FiAward />
                    </div>
                    <div className="stat-info">
                        <h3>Active Domains</h3>
                        <div className="value">
                            {stats?.overview?.totalDomains || '0'}
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <FiBarChart2 />
                    </div>
                    <div className="stat-info">
                        <h3>Avg. Participation</h3>
                        <div className="value">
                            {stats?.overview?.totalActivities > 0 
                                ? Math.round(stats.overview.totalStudents / stats.overview.totalActivities)
                                : '0'
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-card">
                    <h3>Domain-wise Distribution</h3>
                    {stats?.domainStats?.length > 0 ? (
                        <Doughnut 
                            data={domainChartData}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        labels: { padding: 20 }
                                    }
                                }
                            }}
                        />
                    ) : (
                        <p>No domain data available</p>
                    )}
                </div>

                <div className="chart-card">
                    <h3>Yearly Comparison</h3>
                    {stats?.yearlyStats?.length > 0 ? (
                        <Bar 
                            data={yearlyComparisonData}
                            options={{
                                responsive: true,
                                scales: {
                                    y: { beginAtZero: true }
                                }
                            }}
                        />
                    ) : (
                        <p>No yearly data available</p>
                    )}
                </div>

                <div className="chart-card">
                    <h3>Monthly Activity Trends</h3>
                    {stats?.monthlyStats?.length > 0 ? (
                        <Line 
                            data={monthlyTrendsData}
                            options={{
                                responsive: true,
                                scales: {
                                    y: { beginAtZero: true }
                                },
                                plugins: {
                                    legend: {
                                        display: false
                                    }
                                }
                            }}
                        />
                    ) : (
                        <p>No monthly data available</p>
                    )}
                </div>

                <div className="chart-card">
                    <h3>Recent Participations</h3>
                    <div className="top-activities-list">
                        {stats?.topActivities?.length > 0 ? (
                            stats.topActivities.map((activity, index) => (
                                <div key={index} className="activity-item">
                                    <div className="activity-rank">{index + 1}</div>
                                    <div className="activity-details">
                                        <div className="activity-name">{activity.name}</div>
                                        <div className="activity-meta">
                                            <span className="activity-domain">{activity.domain}</span>
                                            <span className="activity-date">{activity.date}</span>
                                        </div>
                                    </div>
                                    <div className="activity-participants">
                                        <FiUsers className="icon" />
                                        {activity.studentsParticipated}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No recent activities available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;