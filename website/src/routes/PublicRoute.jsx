import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoute({ children }) {
    const { user, terminated } = useContext(UserContext);    
    const isAuthenticated = user && user.name !== "Not logged";

    if (!terminated) {
        return <div>Carregando...</div>; 
    }
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }
    return children ? children : <Outlet />;
}

export default PublicRoute;