import React, {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from "../contexts/auth.contexts";
import {Spinner} from "flowbite-react";

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                           children,
                                                           allowedRoles = []
                                                       }) => {
    const {isAuthenticated, userRole, isLoading} = useAuth();

    if (isLoading) {
        return <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
            <Spinner size="xl" color="gray"/>
            <p className="text-gray-600 font-medium">Loading, mohon tunggu...</p>
        </div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/login"/>;
    }

    if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized"/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;