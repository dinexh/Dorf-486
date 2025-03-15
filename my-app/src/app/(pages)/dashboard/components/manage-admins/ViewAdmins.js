import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import './ManageAdmins.css';

const ViewAdmins = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAdmins();
    }, []);

    const getStatusString = (status) => {
        // Convert numeric status to string
        return status === 1 ? 'ACTIVE' : 'HOLD';
    };

    const fetchAdmins = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/dashboard/admins'); 
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch admins');
            }
            // Convert numeric status to string format
            const formattedAdmins = data.map(admin => ({
                ...admin,
                status: getStatusString(admin.status)
            }));
            setAdmins(formattedAdmins);
        } catch (error) {
            console.error('Error fetching admins:', error);
            toast.error(error.message || 'Failed to fetch admins');
        } finally {
            setLoading(false);
        }
    };

    const handleHold = async (admin) => {
        try {
            setLoading(true);
            const newStatus = admin.status === 'ACTIVE' ? 'HOLD' : 'ACTIVE';
            const response = await fetch('/api/dashboard/admins', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: admin.id,
                    name: admin.name,
                    idNumber: admin.idNumber,
                    email: admin.email,
                    role: admin.role,
                    status: newStatus
                }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to update admin status');
            }

            toast.success(`Admin status ${newStatus === 'HOLD' ? 'held' : 'activated'} successfully`);
            await fetchAdmins();
        } catch (error) {
            console.error('Error updating admin status:', error);
            toast.error(error.message || 'Failed to update admin status');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this admin?')) {
            try {
                setLoading(true);
                const response = await fetch('/api/dashboard/admins', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to delete admin');
                }

                toast.success('Admin deleted successfully');
                await fetchAdmins();
            } catch (error) {
                console.error('Error deleting admin:', error);
                toast.error(error.message || 'Failed to delete admin');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="view-admins-component">
            <div className="view-admins-header">
                <h1>View Admins</h1>
            </div>
            <div className="view-admins-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>ID Number</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin) => (
                            <tr key={admin.id} className={admin.status === 'HOLD' ? 'admin-held' : ''}>
                                <td>{admin.name}</td>
                                <td>{admin.idNumber}</td>
                                <td>{admin.email}</td>
                                <td>{admin.role}</td>
                                <td>
                                    <span className={`status-badge ${admin.status.toLowerCase()}`}>
                                        {admin.status.toLowerCase()}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        className={`hold-btn ${admin.status === 'HOLD' ? 'active' : ''}`}
                                        onClick={() => handleHold(admin)}
                                        disabled={loading}
                                    >
                                        {admin.status === 'HOLD' ? 'Unhold' : 'Hold'}
                                    </button>
                                    <button 
                                        className="delete-btn"
                                        onClick={() => handleDelete(admin.id)}
                                        disabled={loading}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewAdmins;