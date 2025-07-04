import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">VT</span>
              </div>
              <span className="text-xl font-bold">Vybe Tribe</span>
            </div>
            <p className="text-gray-300 text-sm">
              One Vybe. One Tribe. One Nation. Empowering youth through unity,
              collaboration, and positive change.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link
                to="/about"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                About Us
              </Link>
              <Link
                to="/events"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Events
              </Link>
              <Link
                to="/projects"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Projects
              </Link>
              <Link
                to="/news"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                News & Media
              </Link>
            </div>
          </div>

          {/* Get Involved */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get Involved</h3>
            <div className="space-y-2">
              <Link
                to="/join"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Join the Tribe
              </Link>
              <Link
                to="/checheza-mtaani"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Checheza Mtaani
              </Link>
              <Link
                to="/get-involved"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Volunteer
              </Link>
              <Link
                to="/contact"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="text-gray-300 text-sm">Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-green-500" />
                <span className="text-gray-300 text-sm">+254 700 000 000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-300 text-sm">info@vybe.africa</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Vybe Tribe. All rights reserved. Built with ❤️ by and for new
            Kenyan.
          </p>
        </div>
      </div>
    </footer>
  );
}
