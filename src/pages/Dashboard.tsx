import React from 'react';
import { useAuth } from '../context/useAuth';
import { Navigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="p-8 bg-white rounded-2xl shadow-xl text-center max-w-md w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome Back!</h1>

                <div className="bg-blue-50 p-4 rounded-xl mb-6">
                    <p className="text-gray-600 text-sm mb-1">Logged in as</p>
                    <p className="text-xl font-semibold text-blue-700">{user?.name || 'User'}</p>
                    <p className="text-gray-500">{user?.phone}</p>
                </div>

                <button
                    onClick={logout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer shadow-lg shadow-red-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
