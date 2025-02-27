'use client';
import './home.css';
import { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

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
        domainStats: [],
        monthlyActivities: [],
    });

    // Simulated data - Replace with actual API calls
    useEffect(() => {
        // Simulated API response
        const data = {
            totalActivities: 156,
            totalStudents: 2450,
            domainStats: [
                { domain: 'Technology', count: 45, students: 850 },
                { domain: 'Healthcare', count: 32, students: 620 },
                { domain: 'Education', count: 28, students: 480 },
                { domain: 'Environment', count: 25, students: 320 },
                { domain: 'Social Work', count: 26, students: 180 },
            ],
            monthlyActivities: [
                { month: 'Jan', activities: 12, students: 230 },
                { month: 'Feb', activities: 15, students: 280 },
                { month: 'Mar', activities: 18, students: 320 },
                { month: 'Apr', activities: 14, students: 260 },
                { month: 'May', activities: 16, students: 290 },
                { month: 'Jun', activities: 20, students: 350 },
            ],
        };
        setStats(data);
    }, []);

    // Chart configurations
    const domainChartData = {
        labels: stats.domainStats.map(item => item.domain),
        datasets: [
            {
                label: 'Activities per Domain',
                data: stats.domainStats.map(item => item.count),
                backgroundColor: [
                    'rgba(72, 187, 120, 0.7)',
                    'rgba(56, 161, 105, 0.7)',
                    'rgba(47, 133, 90, 0.7)',
                    'rgba(39, 110, 75, 0.7)',
                    'rgba(34, 84, 61, 0.7)',
                ],
                borderColor: [
                    'rgba(72, 187, 120, 1)',
                    'rgba(56, 161, 105, 1)',
                    'rgba(47, 133, 90, 1)',
                    'rgba(39, 110, 75, 1)',
                    'rgba(34, 84, 61, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const monthlyChartData = {
        labels: stats.monthlyActivities.map(item => item.month),
        datasets: [
            {
                label: 'Activities',
                data: stats.monthlyActivities.map(item => item.activities),
                borderColor: 'rgba(72, 187, 120, 1)',
                backgroundColor: 'rgba(72, 187, 120, 0.2)',
                tension: 0.4,
            },
            {
                label: 'Students',
                data: stats.monthlyActivities.map(item => item.students),
                borderColor: 'rgba(56, 161, 105, 1)',
                backgroundColor: 'rgba(56, 161, 105, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const studentsByDomainData = {
        labels: stats.domainStats.map(item => item.domain),
        datasets: [
            {
                label: 'Students by Domain',
                data: stats.domainStats.map(item => item.students),
                backgroundColor: [
                    'rgba(72, 187, 120, 0.7)',
                    'rgba(56, 161, 105, 0.7)',
                    'rgba(47, 133, 90, 0.7)',
                    'rgba(39, 110, 75, 0.7)',
                    'rgba(34, 84, 61, 0.7)',
                ],
                borderColor: [
                    'rgba(72, 187, 120, 1)',
                    'rgba(56, 161, 105, 1)',
                    'rgba(47, 133, 90, 1)',
                    'rgba(39, 110, 75, 1)',
                    'rgba(34, 84, 61, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="dashboard-stats">
            <div className="stats-header">
                <h1>Statistics Overview</h1>
            </div>

            <div className="stats-overview">
                <div className="stat-card">
                    <h3>Total Activities</h3>
                    <div className="value">{stats.totalActivities}</div>
                </div>
                <div className="stat-card">
                    <h3>Total Students Participated</h3>
                    <div className="value">{stats.totalStudents}</div>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-container">
                    <h3>Activities by Domain</h3>
                    <Doughnut 
                        data={domainChartData}
                        options={{
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                },
                            },
                            responsive: true,
                            maintainAspectRatio: true,
                        }}
                    />
                </div>
                <div className="chart-container">
                    <h3>Students by Domain</h3>
                    <Bar 
                        data={studentsByDomainData}
                        options={{
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                            responsive: true,
                            maintainAspectRatio: true,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                </div>
                <div className="chart-container" style={{ gridColumn: '1 / -1' }}>
                    <h3>Monthly Activity Trends</h3>
                    <Line 
                        data={monthlyChartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;