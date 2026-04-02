import React, { useState, useRef, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { BiSolidUpArrow } from "react-icons/bi"
import { RxHamburgerMenu, RxArrowTopRight, RxCaretDown } from "react-icons/rx"
import { FiUser } from "react-icons/fi"

import logo from "../../assets/icons/Logo/laundry_logo.svg"
import logoBlack from "../../assets/icons/Logo/logo_black.svg"
import AuthModal from "../auth/AuthModal"
import { useAuth } from "../../context/useAuth"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { logoutUser } from "../../redux/action/authThunks"

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const { user, isVerified, authChecked } = useAppSelector((s) => s.auth)
  // const { user, isAuthenticated, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const userMenuRef = useRef<HTMLDivElement>(null)
  const hamburgerMenuRef = useRef<HTMLDivElement>(null)

  const isHome = location.pathname === "/"
  const position = "fixed"
  const bgColor = isHome
    ? scrolled
      ? "bg-white shadow-md"
      : "bg-transparent"
    : "bg-white shadow-md"
  const textColor = isHome
    ? scrolled
      ? "text-black"
      : "text-white"
    : "text-black"
  const logoSrc = isHome ? (!scrolled ? logo : logoBlack) : logoBlack

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close user menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      const clickedUserMenu =
        userMenuRef.current && userMenuRef.current.contains(target)

      const clickedHamburgerMenu =
        hamburgerMenuRef.current && hamburgerMenuRef.current.contains(target)

      // If click is outside BOTH menus → close both
      if (!clickedUserMenu && !clickedHamburgerMenu) {
        setIsUserMenuOpen(false)
        setIsHamburgerOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    await dispatch(logoutUser())
    setIsUserMenuOpen(false)
    navigate("/");
  }

  useEffect(() => {
    const scrollTo = location.state?.scrollTo

    if (scrollTo) {
      const el = document.getElementById(scrollTo)
      el?.scrollIntoView({ behavior: "smooth" })

      //  CLEAR state so it won't trigger again
      navigate(".", { replace: true, state: null })
    }
  }, [location.state, navigate])

  return (
    <header
      className={`${position} top-0 left-0 right-0 z-50  ${bgColor} transition-all duration-300`}
    >
      <div className="flex items-center justify-between px-5 md:px-8 lg:px-15 py-4">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logoSrc}
            alt="Juggle Laundry Logo"
            className="h-8 sm:h-9 lg:h-10 w-auto"
          />
          <span
            className={`text-lg sm:text-xl lg:text-2xl font-bold ${textColor}`}
          >
            Juggle Laundry
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className={`hidden md:flex items-center gap-10 ${textColor}`}>
          <nav className="flex items-center gap-8 font-['Reddit_Sans']">
            <button
              className={`hover:scale-105 transition cursor-pointer ${
                location.pathname === "/" ? "text-blue-200" : ""
              }`}
              onClick={() => navigate("/", { state: { scrollTo: "home" } })}
            >
              Home
            </button>
            <a
              className={`hover:scale-105 transition ${
                location.pathname === "/service" ? "text-blue-200" : ""
              }`}
              href="/service"
            >
              Services
            </a>
            <a
              className={`hover:scale-105 transition ${
                location.pathname === "/service/rate" ? "text-blue-200" : ""
              }`}
              href="/service/rate"
            >
              Prices
            </a>
            <button
              className="hover:scale-105 transition cursor-pointer"
              onClick={() => navigate("/", { state: { scrollTo: "about" } })}
            >
              About us
            </button>
            <button
              className="hover:scale-105 transition cursor-pointer"
              onClick={() => navigate("/", { state: { scrollTo: "contact" } })}
            >
              Contact
            </button>
          </nav>

          {isVerified && user ? (
            <div className="flex items-center gap-6">
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsUserMenuOpen(!isUserMenuOpen)
                    setIsHamburgerOpen(false)
                  }}
                  className={`inline-flex items-center gap-2 rounded-full border px-6 py-2 transition-colors cursor-pointer  ${isHome ? (!scrolled ? "border-white/50 text-white hover:bg-white hover:text-black" : "border-black/20 text-black hover:bg-black hover:text-white") : "border-black/20 text-black hover:bg-black hover:text-white"} `}
                >
                  <span>{user.name || "User"}</span>
                  <RxCaretDown
                    className={`h-5 w-5 transition-transform ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div>
                    <BiSolidUpArrow
                      size={24}
                      className={`${!scrolled ? "text-white z-10" : "text-[#e0dddd]"}  absolute right-5  `}
                    />
                    <div className="absolute right-0 mt-4 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100 animate-in fade-in zoom-in duration-200 origin-top-right">
                      <button
                        onClick={() => navigate("/profile")}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiUser size={16} />
                        Profile
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative" ref={hamburgerMenuRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsHamburgerOpen((prev) => !prev)
                    setIsUserMenuOpen(false)
                  }}
                  className={`cursor-pointer ${textColor}`}
                  aria-label="Toggle Menu"
                >
                  <RxHamburgerMenu className="h-7 w-7" />
                </button>
                {/* Hamburger Dropdown */}
                {isHamburgerOpen && (
                  <div>
                    <BiSolidUpArrow
                      size={24}
                      className={`${!scrolled ? "text-white z-20" : "text-[#e0dddd]"}   absolute  `}
                    />

                    <div className="absolute -right-2 mt-4 w-56 bg-white rounded-xl shadow-lg py-2 border border-gray-100 animate-in fade-in zoom-in duration-200 origin-top-right  border-b text-black">
                      <button
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 `}
                        onClick={() => {
                          setIsHamburgerOpen(false)
                          navigate("/order")
                        }}
                      >
                        Track Order
                      </button>

                      <button
                        className="w-full text-left px-4 py-4 text-sm hover:bg-gray-50 border-[#EAEAEA] border"
                        onClick={() => {
                          setIsHamburgerOpen(false)
                          navigate("/orders/history")
                        }}
                      >
                        Order History
                      </button>

                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                        onClick={() => {
                          setIsHamburgerOpen(false)
                          navigate("/need/help")
                        }}
                      >
                        Need Help
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className={` inline-flex items-center gap-2 rounded-full border px-6 py-2 transition-colors cursor-pointer ${
                isHome
                  ? !scrolled
                    ? "border-white/50 text-white hover:bg-white hover:text-black"
                    : "border-black/20 text-black hover:bg-black hover:text-white"
                  : "border-black/20 text-black hover:bg-black hover:text-white"
              } `}
            >
              Login/SignUp
              <RxArrowTopRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden ${textColor}`}
          aria-label="Toggle Menu"
        >
          <RxHamburgerMenu className="h-7 w-7" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0
        bg-black/90 backdrop-blur-sm transition-all duration-300
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <nav className="flex flex-col items-center gap-6 py-8 text-white text-lg   ">
          <a
            onClick={() => setOpen(false)}
            href="/"
            className=" hover:text-blue-400"
          >
            Home
          </a>
          <a
            onClick={() => setOpen(false)}
            href="/service"
            className=" hover:text-blue-400"
          >
            Services
          </a>
          <a
            onClick={() => setOpen(false)}
            href="/service/rate"
            className=" hover:text-blue-400"
          >
            Prices
          </a>
          <button
            className="cursor-pointer hover:text-blue-400"
            onClick={() => {
              setOpen(false)
              navigate("/", { state: { scrollTo: "about" } })
            }}
          >
            About us
          </button>
          <button
            className="cursor-pointer hover:text-blue-400"
            onClick={() => {
              setOpen(false)
              navigate("/", { state: { scrollTo: "contact" } })
            }}
          >
            Contact us
          </button>

          {
            // !authChecked ? (
            //           /* Skeleton */
            //           <div className="flex flex-col gap-3 mt-6 items-center w-full">
            //             <div className="w-40 h-10 rounded-full bg-gray-200 animate-pulse" />
            //             <div className="w-24 h-8 rounded-md bg-gray-200 animate-pulse" />
            //           </div>
            //         ) :
            isVerified && user ? (
              /* Logged-in User */
              <div className="flex flex-col items-center gap-4 mt-6">
                <button
                  onClick={() => {
                    setOpen(false)
                    navigate("/order/track")
                  }}
                  className="hover:text-blue-400"
                >
                  Track Order
                </button>

                <button
                  onClick={() => {
                    setOpen(false)
                    navigate("/orders")
                  }}
                  className="hover:text-blue-400"
                >
                  Order History
                </button>

                <button
                  onClick={() => {
                    setOpen(false)
                    navigate("/support")
                  }}
                  className="hover:text-blue-400"
                >
                  Need Help
                </button>

                <button
                  onClick={() => {
                    setOpen(false)
                    navigate("/profile")
                  }}
                  className="text-xl font-semibold mt-4 hover:text-blue-400"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout()
                    setOpen(false)
                  }}
                  className="text-red-400 hover:text-red-300 "
                >
                  Logout
                </button>
              </div>
            ) : (
              /* Not Logged In */
              <button
                onClick={() => {
                  setOpen(false)
                  setIsAuthModalOpen(true)
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full
          border border-white/50 px-8 py-3
          hover:bg-white hover:text-black transition"
              >
                Login / Sign Up
                <RxArrowTopRight className="h-5 w-5" />
              </button>
            )
          }
        </nav>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  )
}

export default Navbar
