import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';

interface User {
    _id: string;
    name: string;
    phone: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        const authenticated = authService.isAuthenticated();

        if (currentUser && authenticated) {
            setUser(currentUser);
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (userData: User, token: string) => {
        setUser(userData);
        setIsAuthenticated(true);
        // localStorage set handled in service verifyOtp mainly, but good to be safe
        // In this architecture, verifyOtp service saves it, we just update state.
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
