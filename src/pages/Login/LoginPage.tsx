import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthModal from '../../components/auth/AuthModal';
import { authService } from '../../services/authService';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine where to redirect after login (or if cancelled)
    // ProtectedRoute passes 'from' in location.state
    const from = (location.state as any)?.from?.pathname || '/';

    const handleClose = () => {
        // If authenticated, go to the intended page.
        // If NOT authenticated, it means the user cancelled the login.
        // We should send them to Home or back, NOT to 'from' (which is protected).

        if (authService.isAuthenticated()) {
            navigate(from, { replace: true });
        } else {
            // User cancelled. Go to home to avoid redirect loop.
            navigate('/', { replace: true });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            {/* 
              We force the modal to be open. 
              The modal has its own backdrop, but we add a container just in case.
            */}
            <AuthModal isOpen={true} onClose={handleClose} />
        </div>
    );
};

export default LoginPage;
