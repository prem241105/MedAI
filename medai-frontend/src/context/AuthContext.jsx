import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Using the proxy-friendly path instead of hardcoded localhost
// This ensures it works seamlessly with the Vite dev server proxy
const API_BASE = "";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/user`, { withCredentials: true });
            if (res.data) {
                // Normalizing Spring Security Authentication object
                const authData = res.data;
                const email = authData.name || authData.principal?.username;
                // Extracting role (Spring uses "ROLE_ADMIN", we prefer "ADMIN")
                const role = authData.authorities?.[0]?.authority?.replace('ROLE_', '') || 'USER';

                setUser({ email, role });
                return { email, role };
            } else {
                setUser(null);
                return null;
            }
        } catch (err) {
            setUser(null);
            return null;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    // Preserving helper functions for the rest of the app component logic
    const logout = () => {
        axios.post(`${API_BASE}/logout`, {}, { withCredentials: true })
            .finally(() => {
                setUser(null);
                window.location.href = '/';
            });
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, checkAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Keeping this hook for consistency with existing components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
