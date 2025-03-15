import { useState } from 'react';
import { toast } from 'react-hot-toast';
import './ManageAdmins.css';

const AddAdmin = () => {
    const [name, setName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        toast.loading('Adding admin...');

        
        try {
            const response = await fetch('/api/dashboard/add_admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, idNumber, email, password, role }),
            });
            const data = await response.json();
            
            toast.dismiss();
            if (response.ok) {
                toast.success(data.message);
                // Reset form
                setName('');
                setIdNumber('');
                setEmail('');
                setPassword('');
                setRole('admin');
                toast.success('Admin added successfully');
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            toast.dismiss();
            toast.error('Failed to add admin');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="add-admin-component">
            <div className="add-admin-header">
                <h1>Add Admin</h1>
            </div>
            <div className="add-admin-form">
                <form onSubmit={handleSubmit}>
                    <div className="add-admin-form-group">  
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="add-admin-form-group">
                        <label htmlFor="idNumber">ID Number</label>
                        <input 
                            type="text" 
                            id="idNumber"
                            value={idNumber}
                            onChange={(e) => setIdNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="add-admin-form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="add-admin-form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="add-admin-form-group">
                        <label htmlFor="role">Role</label>
                        <select 
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="admin">Admin</option>
                            <option value="superadmin">Super Admin</option>
                        </select>
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Adding...' : 'Add Admin'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddAdmin;