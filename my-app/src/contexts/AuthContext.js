"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const refreshToken = async () => {
        try {
            const response = await fetch('/api/auth/refresh', {
                method: 'POST',
                credentials: 'include',
                cache: 'no-store'
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                return true;
            } else {
                if (response.status === 401) {
                    setUser(null);
                    if (window.location.pathname.startsWith('/dashboard')) {
                        router.push('/auth/login');
                    }
                }
                return false;
            }
        } catch (error) {
            console.error('Token refresh failed:', error);
            return false;
        }
    };

    const checkAuth = async (retryCount = 0) => {
        try {
            console.log('Checking auth, attempt:', retryCount + 1);
            const response = await fetch('/api/auth/check', {
                method: 'GET',
                credentials: 'include',
                cache: 'no-store'
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Auth check successful:', data.user);
                setUser(data.user);
                setLoading(false);
            } else {
                console.log('Auth check failed:', response.status);
                if (response.status === 401) {
                    setUser(null);
                    setLoading(false);
                    if (window.location.pathname.startsWith('/dashboard')) {
                        router.push('/auth/login');
                    }
                } else if (retryCount < 3) {
                    const delay = Math.pow(2, retryCount) * 1000;
                    console.log(`Retrying in ${delay}ms...`);
                    setTimeout(() => {
                        checkAuth(retryCount + 1);
                    }, delay);
                    return;
                } else {
                    setLoading(false);
                }
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            if (retryCount < 3) {
                const delay = Math.pow(2, retryCount) * 1000;
                console.log(`Retrying in ${delay}ms...`);
                setTimeout(() => {
                    checkAuth(retryCount + 1);
                }, delay);
                return;
            }
            setUser(null);
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
        
        // Set up periodic auth check every 5 minutes
        const authCheckInterval = setInterval(checkAuth, 5 * 60 * 1000);
        
        // Set up token refresh every 30 minutes
        const tokenRefreshInterval = setInterval(refreshToken, 30 * 60 * 1000);
        
        return () => {
            clearInterval(authCheckInterval);
            clearInterval(tokenRefreshInterval);
        };
    }, []);

    const logout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
            
            if (response.ok) {
                setUser(null);
                router.push('/auth/login');
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const value = {
        user,
        loading,
        logout,
        checkAuth,
        refreshToken
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100vh' 
                }}>
                    Loading...
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
} 