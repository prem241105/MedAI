import { useContext } from "react";
import { AuthContext, useAuth } from "../context/AuthContext";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { LogOut, Home, UserPlus, LayoutDashboard } from "lucide-react";

function Navbar() {
    const { user, setUser, logout } = useAuth(); // Using the hook for cleaner access
    const navigate = useNavigate();

    const handleLogout = async () => {
        // Calling the centralized logout which handles the fetch and state cleanup
        await logout();
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.brand} onClick={() => navigate("/")}>
                <h2 style={styles.logo}>🧬 MedAI</h2>
            </div>

            <div style={styles.links}>
                {!user ? (
                    <>
                        <Link to="/" style={styles.link}>
                            <Home size={18} /> Login
                        </Link>
                        <Link to="/register" style={styles.link}>
                            <UserPlus size={18} /> Register
                        </Link>
                    </>
                ) : (
                    <>
                        <NavLink
                            to="/dashboard"
                            style={({ isActive }) => ({
                                ...styles.link,
                                color: isActive ? "#a78bfa" : "white"
                            })}
                        >
                            <LayoutDashboard size={18} /> Dashboard
                        </NavLink>
                        <div style={styles.userInfo}>
                            <span style={styles.userEmail}>{user.email}</span>
                            <button onClick={handleLogout} style={styles.button}>
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "#0f172a", // Updated to a deep, premium slate
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
    },
    brand: {
        cursor: "pointer",
    },
    logo: {
        margin: 0,
        fontSize: "1.5rem",
        fontWeight: "800",
        letterSpacing: "-0.5px",
        background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    links: {
        display: "flex",
        gap: "30px",
        alignItems: "center",
    },
    link: {
        color: "#cbd5e0",
        textDecoration: "none",
        fontSize: "0.95rem",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "color 0.2s",
        cursor: "pointer",
    },
    userInfo: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
        paddingLeft: "15px",
        borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
    },
    userEmail: {
        fontSize: "0.85rem",
        color: "#718096",
    },
    button: {
        background: "rgba(239, 68, 68, 0.15)",
        color: "#fca5a5",
        border: "1px solid rgba(239, 68, 68, 0.3)",
        padding: "8px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "0.85rem",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        transition: "all 0.2s",
    },
};

export default Navbar;
