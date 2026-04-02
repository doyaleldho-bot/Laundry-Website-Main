import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa"
import logo from "../../assets/icons/Logo/laundry_logo.svg"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-[linear-gradient(170deg,#131E3E_0%,#374D9F_50%,#131E3E_100%)] text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 text-center sm:text-left">
          {/* Brand */}
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
              <img
                src={logo}
                alt="Juggle Laundry Logo"
                className="h-8 sm:h-9 lg:h-10 w-auto"
              />
              <span className="text-lg sm:text-xl lg:text-2xl font-bold">
                Juggle Laundry
              </span>
            </div>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-6 max-w-xs mx-auto sm:mx-0">
              Professional laundry service with convenient pickup and doorstep
              delivery. We make laundry stress-free and easy.
            </p>

            <div className="flex justify-center sm:justify-start gap-4">
              {[FaInstagram, FaFacebookF, FaYoutube].map((Icon, index) => (
                <a
                  key={index}
                  className="p-2 sm:p-2.5 rounded-full border border-white/40 hover:bg-white hover:text-blue-800 transition"
                >
                  <Icon className="text-sm sm:text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-base sm:text-lg border-b-2 border-blue-400 inline-block pb-1">
              Quick links
            </h4>
            <ul className="space-y-2 text-sm sm:text-base text-gray-200">
              <li>
                <Link to="/" className="hover:text-white transition">
                  • Home
                </Link>
              </li>
              <li>
                {" "}
                <Link to="/service" className="hover:text-white transition">
                  • Services
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  to="/service/rate"
                  className="hover:text-white transition"
                >
                  • Price
                </Link>
              </li>
              <li>
                
                <Link
                  to="/"
                  state={{ scrollTo: "about" }}
                  className="hover:text-white transition"
                >
                  • About us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  state={{ scrollTo: "contact" }}
                  className="hover:text-white transition"
                >
                  • Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-base sm:text-lg border-b-2 border-blue-400 inline-block pb-1">
              Our Services
            </h4>
            <ul className="space-y-2 text-sm sm:text-base text-gray-200">
              <li>• Wash & Fold</li>
              <li>• Wash & Iron</li>
              <li>• Dry Cleaning</li>
              <li>• Starching</li>
              <li>• Starching</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-base sm:text-lg border-b-2 border-blue-400 inline-block pb-1">
              Contact Us
            </h4>

            <div className="space-y-4 text-sm sm:text-base text-gray-200">
              <div className="flex gap-3 justify-center sm:justify-start">
                <FaMapMarkerAlt className="mt-1 shrink-0" />
                <p className="text-left">
                  Juggle Laundry Service
                  <br />
                  2nd Floor, Green Plaza
                  <br />
                  MG Road, Kochi - 682016
                </p>
              </div>

              <div className="flex gap-3 justify-center sm:justify-start">
                <FaPhoneAlt className="shrink-0" />
                <p>+91 98765 43210</p>
              </div>

              <div className="flex gap-3 justify-center sm:justify-start">
                <FaEnvelope className="shrink-0" />
                <p>support@jugglelaundry.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8 lg:my-10"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center text-xs sm:text-sm text-gray-200">
          <p className="text-center md:text-left">
            © 2025 juggle. All rights reserved
          </p>

          <div className="flex gap-3 sm:gap-4">
            <a className="hover:underline">Privacy policy</a>
            <span>|</span>
            <a className="hover:underline">Terms & condition</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
