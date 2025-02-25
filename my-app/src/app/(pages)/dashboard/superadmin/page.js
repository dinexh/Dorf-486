import DashboardFooter from "../components/footer/footer";
import DashboardNav from "../components/nav/nav";
import Sidebar from "../components/sidebar/sidebar";
import './page.css';

export default function SuperAdminDashboard() {
    return (
        <div className="dashboard-component">
            <div className="dashboard-component-nav">
                <DashboardNav />
            </div>
            <div className="dashboard-component-main">
                <Sidebar />
                <div className="main-content">
                    <h1>Super Admin Dashboard</h1>
                </div>
            </div>
            <div className="dashboard-component-footer">
                <DashboardFooter />
            </div>
        </div>
    );
}