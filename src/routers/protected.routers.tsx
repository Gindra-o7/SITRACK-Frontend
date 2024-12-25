import React, {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from "../contexts/auth.contexts";

interface ProtectedRouteProps {
    allowedRoles: string[];
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                           children,
                                                           allowedRoles = []
                                                       }) => {
    const {isAuthenticated, userRole} = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" />;
    }

    if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized"/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;