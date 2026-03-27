import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiBriefcase,
  FiLock,
  FiMail,
  FiPhone,
  FiShield,
  FiTag,
  FiTruck,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import Card from "../components/common/Card/Card";
import Input from "../components/common/Input/Input";
import Button from "../components/common/Button/Button";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/authService";

const ROLE_OPTIONS = {
  admin: {
    label: "Admin",
    description: "Full platform control, setup, and reporting access.",
    icon: <FiShield className="text-lg" />,
  },
  manager: {
    label: "Manager",
    description: "Supervise teams, assign work, and review performance.",
    icon: <FiBriefcase className="text-lg" />,
  },
  worker: {
    label: "Worker",
    description: "Track daily assignments, completion, and productivity.",
    icon: <FiUsers className="text-lg" />,
  },
  supplier: {
    label: "Supplier",
    description: "Manage leaf supply coordination and field handovers.",
    icon: <FiTruck className="text-lg" />,
  },
};

const Register = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const isAdmin = user?.role === "admin";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "worker",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const availableRoles = useMemo(
    () => (isAdmin ? Object.keys(ROLE_OPTIONS) : ["worker", "supplier"]),
    [isAdmin],
  );

  useEffect(() => {
    if (isAuthenticated && !isAdmin) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAdmin, isAuthenticated, navigate]);

  useEffect(() => {
    if (!availableRoles.includes(formData.role)) {
      setFormData((prev) => ({
        ...prev,
        role: availableRoles[0],
      }));
    }
  }, [availableRoles, formData.role]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name] || errors.general) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
        general: "",
      }));
    }

    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));

    if (errors.role || errors.general) {
      setErrors((prev) => ({
        ...prev,
        role: "",
        general: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm the password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!availableRoles.includes(formData.role)) {
      newErrors.role = "Please select a valid role";
    }

    return newErrors;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      department: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: availableRoles[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setSuccessMessage("");

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      department: formData.department.trim(),
      phone: formData.phone.trim(),
      password: formData.password,
      role: formData.role,
    };

    try {
      if (isAdmin) {
        const response = await authService.createUser(payload);
        setSuccessMessage(response.message || "Account created successfully");
        resetForm();
      } else {
        await authService.register(payload);
        navigate("/dashboard");
      }
    } catch (error) {
      setErrors({
        general: error.message || "Registration failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(74,222,128,0.2),_transparent_35%),linear-gradient(135deg,#123524_0%,#184d3b_45%,#0d2c22_100%)] px-4 py-8 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/8 p-8 text-white shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-md lg:p-10">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 no-underline transition-colors hover:text-white"
            >
              <span className="text-xl">🍃</span>
              CeylonLeaf
            </Link>

            <div className="mt-10 max-w-xl">
              <p className="mb-3 inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-sm font-medium text-emerald-100">
                {isAdmin
                  ? "Admin account creation"
                  : "Worker and supplier onboarding"}
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-white lg:text-5xl">
                {isAdmin
                  ? "Create accounts across every team."
                  : "Register your production account."}
              </h1>
              <p className="mt-4 text-base leading-7 text-white/75 lg:text-lg">
                {isAdmin
                  ? "Use one form to provision admins, managers, workers, and suppliers without losing your current session."
                  : "Create a worker or supplier account to access daily operations, task updates, and field-to-factory coordination."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/15 p-5">
              <div className="mb-3 text-2xl text-emerald-300">01</div>
              <h2 className="text-lg font-semibold text-white">
                Role-based onboarding
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/70">
                {isAdmin
                  ? "Privileged roles stay admin-controlled, while worker and supplier onboarding remains straightforward."
                  : "Public registration is limited to operational roles, keeping privileged access controlled."}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/15 p-5">
              <div className="mb-3 text-2xl text-emerald-300">02</div>
              <h2 className="text-lg font-semibold text-white">
                Shared profile details
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Department and contact details are captured during registration
                so user records are usable immediately.
              </p>
            </div>
          </div>
        </section>

        <Card className="flex h-full flex-col justify-center rounded-[2rem] border border-white/10 !bg-[#f4fbf7] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.24)] lg:p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-slate-900">
              {isAdmin ? "Create a new user" : "Create your account"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {isAdmin
                ? "Select the target role and create the account directly from your admin session."
                : "Choose the account type you need and complete the required details below."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {errors.general && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {errors.general}
              </div>
            )}

            {successMessage && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {successMessage}
              </div>
            )}

            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
                <FiTag />
                Select role
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {availableRoles.map((role) => {
                  const option = ROLE_OPTIONS[role];
                  const isSelected = formData.role === role;

                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleRoleSelect(role)}
                      className={`rounded-2xl border px-4 py-4 text-left transition-all duration-200 ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-50 shadow-[0_12px_30px_rgba(16,185,129,0.16)]"
                          : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50"
                      }`}
                    >
                      <div className="flex items-center gap-3 text-slate-900">
                        <span
                          className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${
                            isSelected
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {option.icon}
                        </span>
                        <div>
                          <div className="font-semibold">{option.label}</div>
                          <div className="text-xs text-slate-500">
                            {option.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.role && (
                <div className="mt-2 text-xs text-red-500">{errors.role}</div>
              )}
            </div>

            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              error={errors.name}
              icon={<FiUser />}
              required
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              error={errors.email}
              icon={<FiMail />}
              required
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Field operations"
                icon={<FiBriefcase />}
              />
              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="07X XXX XXXX"
                icon={<FiPhone />}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                error={errors.password}
                icon={<FiLock />}
                required
              />
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                error={errors.confirmPassword}
                icon={<FiLock />}
                required
              />
            </div>

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              className="!bg-[#1b7a59] !py-3.5 !text-base font-semibold hover:!bg-[#146246]"
            >
              {loading ? (
                isAdmin ? (
                  "Creating account..."
                ) : (
                  "Registering..."
                )
              ) : (
                <>
                  {isAdmin ? "Create Account" : "Register Account"}
                  <FiArrowRight className="text-lg" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            {isAdmin ? (
              <>
                Need to return to the app?{" "}
                <Link
                  to="/dashboard"
                  className="font-semibold text-[#1b7a59] no-underline hover:text-[#146246]"
                >
                  Open dashboard
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-[#1b7a59] no-underline hover:text-[#146246]"
                >
                  Sign in here
                </Link>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
