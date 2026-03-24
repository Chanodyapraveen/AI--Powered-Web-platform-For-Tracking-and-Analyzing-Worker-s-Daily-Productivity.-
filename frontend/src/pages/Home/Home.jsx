import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/common/Button/Button";
import BackgroundCarousel from "../../components/common/BackgroundCarousel/BackgroundCarousel";
import {
  FiUser,
  FiTrendingUp,
  FiUsers,
  FiPackage,
  FiMap,
  FiBarChart2,
  FiTruck,
  FiClipboard,
  FiBox,
} from "react-icons/fi";

// Replace these with your actual image paths/URLs
const CAROUSEL_IMAGES = [
  "/images/banner-sp-1024x576.jpg",
  "/images/jerry-kavan-i9eaAR4dWi8-unsplash.jpg",
  "/images/pexels-andrea-zanenga-9756792-6120446.jpg",
];

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleLogin = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleRegister = () => {
    navigate("/register");
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

  const operations = [
    {
      title: "Fields Management",
      description:
        "Map plots, plan rounds, and monitor yield potential with clear field insights.",
      icon: <FiMap />,
    },
    {
      title: "Workers",
      description:
        "Assign tasks, track attendance, and review performance in one place.",
      icon: <FiUsers />,
    },
    {
      title: "Harvests & Reports",
      description:
        "Capture daily plucking, analyze trends, and export clean summaries.",
      icon: <FiBarChart2 />,
    },
    {
      title: "Weighing & Bins",
      description:
        "Record weights at collection points and keep inventory tidy.",
      icon: <FiBox />,
    },
    {
      title: "Logistics",
      description:
        "Coordinate transport from field sheds to the factory gate smoothly.",
      icon: <FiTruck />,
    },
    {
      title: "Factory Handover",
      description:
        "Generate handover notes and confirm reception at the factory.",
      icon: <FiClipboard />,
    },
  ];

  return (
    <BackgroundCarousel
      images={CAROUSEL_IMAGES}
      interval={5000}
      overlayClassName="bg-black/50"
      showIndicators={true}
      showArrows={false}
    >
      {/* Header */}
      <header className="py-4 bg-[#2d7d56]/90 backdrop-blur-md">
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
          {!isAuthenticated && (
            <Button
              variant="primary"
              onClick={handleRegister}
              className="!bg-white !text-[#1e6b52] hover:!bg-[#f3fbf7]"
            >
              Register
            </Button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-8 py-16 text-center">
        <div className="max-w-3xl">
          <div className="text-6xl mb-4">🍃</div>
          <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
            CeylonLeaf
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]">
            Smart tools for tea estates from field planning and worker
            management to{" "}
            <span className="text-green-500 font-semibold">
              harvest tracking
            </span>{" "}
            and seamless handover to the factory.
          </p>
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="large"
                onClick={handleLogin}
                className="!bg-green-600 hover:!bg-green-700"
              >
                {isAuthenticated ? "Open Dashboard" : "Login"}
              </Button>
              {(!isAuthenticated || user?.role === "admin") && (
                <Button
                  variant="outline"
                  size="large"
                  onClick={handleRegister}
                  className="!border-white !text-white hover:!bg-white/10"
                >
                  {user?.role === "admin" ? "Create Account" : "Register"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Statistics Section */}
      <section className="py-8 bg-black/60 backdrop-blur-md">
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

      {/* Operations Section */}
      <section className="pb-16 pt-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            {operations.map((item, index) => (
              <article
                key={index}
                className="rounded-3xl border border-white/25 bg-white/12 backdrop-blur-xl px-6 py-7 shadow-[0_12px_35px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/18"
              >
                <div className="w-11 h-11 rounded-xl border border-white/35 bg-white/15 flex items-center justify-center text-white text-xl mb-4">
                  {item.icon}
                </div>
                <h3 className="text-3xl sm:text-[2rem] leading-tight font-bold text-white drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)] mb-3">
                  {item.title}
                </h3>
                <p className="text-white/85 text-lg leading-relaxed drop-shadow-[1px_1px_2px_rgba(0,0,0,0.45)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </BackgroundCarousel>
  );
};

export default Home;
