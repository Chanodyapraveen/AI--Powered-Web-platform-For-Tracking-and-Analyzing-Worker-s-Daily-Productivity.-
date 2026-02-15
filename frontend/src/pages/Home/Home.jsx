import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/common/Button/Button";
import { FiUser, FiTrendingUp, FiUsers, FiPackage } from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleLogin = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const stats = [
    {
      value: "120+",
      label: "Active Fields",
      icon: <FiPackage />,
    },
    {
      value: "1,500+",
      label: "Workers Managed",
      icon: <FiUsers />,
    },
    {
      value: "8,200+",
      label: "Daily Harvest (kg)",
      icon: <FiTrendingUp />,
    },
    {
      value: "7",
      label: "Factories Linked",
      icon: <FiPackage />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d7d56] via-[#1a5438] to-[#0f3d2a] bg-cover bg-center bg-fixed relative flex flex-col">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-[1]"></div>

      {/* Header */}
      <header className="relative z-[2] py-4 bg-[#2d7d56]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 text-white">
            <div className="text-2xl">🍃</div>
            <span className="text-xl font-semibold">CeylonLeaf</span>
          </div>
          <Button
            variant="outline"
            onClick={handleLogin}
            icon={<FiUser />}
            className="!border-white/80 !text-white/90 hover:!bg-white/10 hover:!border-white hover:!text-white"
          >
            {isAuthenticated ? "Dashboard" : "Login"}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-[2] flex-1 flex items-center justify-center px-8 py-16 text-center">
        <div className="max-w-3xl">
          <div className="text-6xl mb-4">🍃</div>
          <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
            CeylonLeaf
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]">
            Smart tools for tea estates — from field planning and worker
            management to{" "}
            <span className="text-green-500 font-semibold">
              harvest tracking
            </span>{" "}
            and seamless handover to the factory.
          </p>
          <div className="mt-8">
            <Button variant="primary" size="large" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </div>
      </main>

      {/* Statistics Section */}
      <section className="relative z-[2] py-8 bg-black/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
            >
              <div className="text-4xl font-bold text-white mb-2 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
                {stat.value}
              </div>
              <div className="text-base text-white/80 font-medium drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
