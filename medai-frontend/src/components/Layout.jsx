import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

function Layout({ children }) {
    const { user } = useAuth();

    return (
        <div style={styles.layout}>
            <Navbar />
            <div style={styles.container}>
                {user && <Sidebar />}
                <div style={{
                    padding: user ? "20px" : "0",
                    flex: 1,
                    minHeight: "calc(100vh - 72px)" // Account for Navbar height
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

const styles = {
    layout: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#0f172a',
    },
    container: {
        display: "flex",
        flex: 1
    }
};

export default Layout;
