import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LayoutDashboard, ShieldCheck, Activity } from 'lucide-react';

function Sidebar() {
    const { user } = useContext(AuthContext);

    return (
        <aside style={styles.sidebar}>
            <p style={styles.sectionTitle}>Main Menu</p>

            <NavLink to="/dashboard" style={linkStyle}>
                <div style={styles.itemContent}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </div>
            </NavLink>

            <NavLink to="/symptom-checker" style={linkStyle}>
                <div style={styles.itemContent}>
                    <Activity size={20} />
                    <span>Symptom Checker</span>
                </div>
            </NavLink>

            {user?.role === "ADMIN" && (
                <NavLink to="/admin" style={linkStyle}>
                    <div style={styles.itemContent}>
                        <ShieldCheck size={20} />
                        <span>Admin Panel</span>
                    </div>
                </NavLink>
            )}
        </aside>
    );
}

const styles = {
    sidebar: {
        width: "260px",
        background: "rgba(15, 23, 42, 0.4)",
        backdropFilter: "blur(10px)",
        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        height: "calc(100vh - 72px)",
        position: "sticky",
        top: "72px",
        padding: "24px 0",
        color: "white"
    },
    sectionTitle: {
        padding: "0 24px",
        fontSize: "0.75rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "#475569",
        marginBottom: "12px",
        fontWeight: "600",
    },
    itemContent: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    }
};

const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "12px 24px",
    color: isActive ? "#a78bfa" : "#94a3b8",
    textDecoration: "none",
    background: isActive ? "rgba(124, 58, 237, 0.15)" : "transparent",
    borderRight: isActive ? "3px solid #7c3aed" : "none",
    transition: "all 0.2s ease",
    fontWeight: "500",
});

export default Sidebar;
