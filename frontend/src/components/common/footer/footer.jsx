import React from "react";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMapPin,
  FiPhone,
  FiMail,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#2d7d56] to-[#1e5a3d]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Branding Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-2xl">🍃</div>
              <span className="text-2xl font-bold text-white">CeylonLeaf</span>
            </div>
            <p className="text-white/85 text-sm leading-relaxed mb-6">
              Leading tea plantation management system providing comprehensive
              solutions for modern tea cultivation, processing, and
              distribution.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"
              >
                <FiFacebook size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"
              >
                <FiTwitter size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"
              >
                <FiInstagram size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"
              >
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-green-400">•</span> Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-green-400">•</span> About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-green-400">•</span> Services
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-green-400">•</span> Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Our Solutions */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5">Our Solutions</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-green-400">•</span> Tea Plantation
                  Management
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-green-400">•</span> Production Tracking
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-green-400">•</span> Inventory Management
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-green-400">•</span> Transport Solutions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-green-400">•</span> Analytics & Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <FiMapPin
                  className="text-green-400 flex-shrink-0 mt-1"
                  size={20}
                />
                <div className="text-white/80 text-sm">
                  123, Tea Garden Road,
                  <br />
                  Avissawella,
                  <br />
                  Sri Lanka 22200
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <FiPhone className="text-green-400 flex-shrink-0" size={20} />
                <a
                  href="tel:+94112345678"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  +94 11 234 5678
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <FiMail className="text-green-400 flex-shrink-0" size={20} />
                <a
                  href="mailto:info@ceylonleaf.com"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  info@ceylonleaf.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/70 text-sm">
            © 2026 CeylonLeaf. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-white/70 hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-white transition-colors text-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
