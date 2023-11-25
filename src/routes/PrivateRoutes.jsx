import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading) {
        return;
    }

    if(user) {
        return children;
    }

    return <Navigate state={{from: location}} to="/signIn" replace />
};

PrivateRoutes.propTypes = {
    children: PropTypes.node
}

export default PrivateRoutes;