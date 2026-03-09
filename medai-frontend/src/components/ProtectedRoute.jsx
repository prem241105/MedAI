import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
    const { user, loading } = useContext(AuthContext);

    // Still keeping the loading check to prevent premature redirect on refresh
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                color: 'white',
                background: '#0f172a'
            }}>
                <div className="loader"></div>
                <p style={{ marginLeft: '12px' }}>Verifying session...</p>
            </div>
        );
    }

    if (!user) return <Navigate to="/" />;

    if (role && user.role !== role)
        return <Navigate to="/dashboard" />;

    return children;
}

export default ProtectedRoute;
