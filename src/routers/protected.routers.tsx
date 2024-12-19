import React, {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from "../contexts/auth.contexts";

interface ProtectedRouteProps {
    allowedRoles: string[];
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    if (!allowedRoles.includes(user!.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;