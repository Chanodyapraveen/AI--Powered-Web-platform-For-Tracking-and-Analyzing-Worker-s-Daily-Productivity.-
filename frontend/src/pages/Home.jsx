import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/common/Button/Button";
import BackgroundCarousel from "../components/common/BackgroundCarousel/BackgroundCarousel";
import Footer from "../components/common/footer/footer";
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
  FiMenu,
  FiX,
} from "react-icons/fi";
const CAROUSEL_IMAGES = [
  "/images/banner-sp-1024x576.jpg",
  "/images/jerry-kavan-i9eaAR4dWi8-unsplash.jpg",
  "/images/pexels-andrea-zanenga-9756792-6120446.jpg",
];

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    setIsMobileMenuOpen(false);
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleRegister = () => {
    setIsMobileMenuOpen(false);
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

  const dailyFlowSteps = [
    {
      step: "01",
      title: "Plan & Assign",
      description: "Create rounds by field; assign pluckers and supervisors.",
    },
    {
      step: "02",
      title: "Pluck & Record",
      description: "Capture plucking per worker; note quality and weather.",
    },
    {
      step: "03",
      title: "Weight & Verify",
      description: "Weigh leaves at sheds; auto-sum per field and per truck.",
    },
    {
      step: "04",
      title: "Transport",
      description: "Schedule trips; track loads and ETA to factory.",
    },
    {
      step: "05",
      title: "Factory Handover",
      description:
        "Issue handover note, get digital acknowledgment at the gate.",
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
      <header className="py-4 bg-[#2d7d56]/90 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 text-white">
            <div className="text-2xl">🍃</div>
            <span className="text-xl font-semibold">CeylonLeaf</span>
          </div>

          <div className="hidden md:flex items-center gap-3">
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

          <button
            className="md:hidden p-2 rounded-md text-white hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 px-6 pb-2">
            <div className="bg-black/35 border border-white/25 rounded-xl p-3 space-y-3 backdrop-blur-md">
              <Button
                variant="outline"
                onClick={handleLogin}
                icon={<FiUser />}
                className="w-full !justify-center !border-white/80 !text-white hover:!bg-white/10"
              >
                {isAuthenticated ? "Dashboard" : "Login"}
              </Button>
              {!isAuthenticated && (
                <Button
                  variant="primary"
                  onClick={handleRegister}
                  className="w-full !justify-center !bg-white !text-[#1e6b52] hover:!bg-[#f3fbf7]"
                >
                  Register
                </Button>
              )}
            </div>
          </div>
        )}
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
      <section className="py-8 ">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
            >
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
                {stat.value}
              </div>
              <div className="text-sm text-white/80 font-medium drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]">
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
                <h3 className="text-2xl sm:text-[1.6rem] leading-tight font-bold text-white drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)] mb-3">
                  {item.title}
                </h3>
                <p className="text-white/85 text-base leading-relaxed drop-shadow-[1px_1px_2px_rgba(0,0,0,0.45)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Flow Section */}
      <section className="pb-20 pt-4">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h2 className="text-[1.8rem] md:text-[2.4rem] leading-[1.1] font-bold text-white drop-shadow-[2px_2px_3px_rgba(0,0,0,0.5)] mb-8 md:mb-10">
            From Leaf to Factory - Your Daily Flow
          </h2>

          <div className="relative pl-3 md:pl-5 space-y-7 md:space-y-8">
            <div className="absolute left-[14px] md:left-[18px] top-4 bottom-4 w-px bg-white/40" />

            {dailyFlowSteps.map((item, index) => (
              <article key={index} className="relative">
                <div className="absolute left-[-3px] md:left-[-1px] top-8 w-4 h-4 rounded-full bg-[#3ce6bd] shadow-[0_0_0_4px_rgba(60,230,189,0.25)]" />

                <div className="ml-6 md:ml-8 rounded-2xl border border-white/25 bg-white/12 backdrop-blur-xl px-5 md:px-7 py-5 md:py-4 md:h-[164px] shadow-[0_12px_35px_rgba(0,0,0,0.28)]">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-[#66f1cc] text-[1.15rem] md:text-[1.35rem] leading-none font-extrabold tracking-wide">
                      {item.step}
                    </span>
                    <h3 className="text-[1.3rem] md:text-[1.7rem] font-bold text-white leading-tight drop-shadow-[1px_1px_2px_rgba(0,0,0,0.45)]">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-white/85 text-base md:text-lg leading-[1.35] drop-shadow-[1px_1px_2px_rgba(0,0,0,0.45)]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </BackgroundCarousel>
  );
};

export default Home;
