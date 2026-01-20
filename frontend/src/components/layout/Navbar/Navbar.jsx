import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import RoleBadge from "../../common/RoleBadge/RoleBadge";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <h1>Productivity Tracker</h1>
        </Link>

        <div className={styles.navItems}>
          {user ? (
            <>
              <RoleBadge />
              <span className={styles.userName}>Welcome, {user.name}</span>
              <button onClick={logout} className={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={styles.loginLink}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
