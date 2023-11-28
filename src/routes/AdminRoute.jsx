import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from '../hooks/useRole';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { userRole, isLoading } = useRole();

    if (loading || isLoading) {
        return;
    }

    if (user && userRole === "admin") {
        return children;
    }

    return <Navigate  to="/" replace />
};

AdminRoute.propTypes = {
    children: PropTypes.node
}

export default AdminRoute;