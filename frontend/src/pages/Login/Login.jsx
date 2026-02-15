import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import Card from "../../components/common/Card/Card";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1e6b52] via-[#165543] to-[#0f3d2a] p-4 lg:p-6 relative">
      <button
        className="absolute top-8 px-8 py-3 bg-transparent border-2 border-white/30 rounded-lg text-white text-base font-medium cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/50"
        onClick={() => navigate("/")}
        type="button"
      >
        Home
      </button>

      <Card className="w-full max-w-md p-10 !bg-[#1c5e4e]/85 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
              🍃
            </span>
            <h1 className="text-3xl font-semibold text-white m-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
              CeylonLeaf
            </h1>
          </div>
          <p className="text-white/85 text-[0.95rem] leading-relaxed m-0">
            Sign in to manage fields, workers, and factory handovers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {errors.general && (
            <div className="px-3.5 py-3.5 bg-red-100/90 text-red-600 rounded-lg text-sm text-center border border-red-400/20">
              {errors.general}
            </div>
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
            className="!bg-ceylon-green-500 flex items-center justify-center gap-2 !py-3.5 !text-base !font-medium transition-all duration-300 hover:!bg-ceylon-green-600 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(34,197,94,0.3)]"
          >
            {loading ? (
              "Signing in..."
            ) : (
              <>
                Sign in <FiArrowRight className="text-lg" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[0.85rem]">
          <span className="text-base">🍃</span>
          <span className="text-white/70 flex-1 mx-3">
            Tea estates • Factory integration
          </span>
          <span className="text-white/60 font-medium">v1.0</span>
        </div>
      </Card>

      <p className="mt-6 text-white/70 text-sm text-center">
        Trouble logging in? Contact your administrator for credentials.
      </p>
    </div>
  );
};

export default Login;
