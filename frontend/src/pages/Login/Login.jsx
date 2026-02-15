import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import Card from "../../components/common/Card/Card";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await login(formData);
      navigate("/dashboard");
    } catch (error) {
      setErrors({ general: "Login failed. Please check your credentials." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <button
        className={styles.homeButton}
        onClick={() => navigate("/")}
        type="button"
      >
        Home
      </button>

      <Card className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <span className={styles.leafIcon}>🍃</span>
            <h1 className={styles.title}>CeylonLeaf</h1>
          </div>
          <p className={styles.subtitle}>
            Sign in to manage fields, workers, and factory handovers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {errors.general && (
            <div className={styles.errorAlert}>{errors.general}</div>
          )}

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
            icon={<FiMail />}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
            icon={<FiLock />}
            required
          />

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            className={styles.signInButton}
          >
            {loading ? (
              "Signing in..."
            ) : (
              <>
                Sign in <FiArrowRight className={styles.arrowIcon} />
              </>
            )}
          </Button>
        </form>

        <div className={styles.cardFooter}>
          <span className={styles.footerIcon}>🍃</span>
          <span className={styles.footerText}>
            Tea estates • Factory integration
          </span>
          <span className={styles.version}>v1.0</span>
        </div>
      </Card>

      <p className={styles.helpText}>
        Trouble logging in? Contact your administrator for credentials.
      </p>
    </div>
  );
};

export default Login;
