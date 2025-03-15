"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/check', {
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                // Wait for state to update
                await new Promise(resolve => setTimeout(resolve, 50));
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Auth check error:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Add this function to force update user data
    const updateUserData = (userData) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            setUser(null);
            router.push('/auth/login');
            toast.success('Logged out successfully');

        } catch (error) {
            toast.error('Logout failed');
            console.error('Logout error:', error);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            checkAuth, 
            logout,
            updateUserData  // Add this to the context
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext); 