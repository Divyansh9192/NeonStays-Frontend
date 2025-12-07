import React, { useState, useEffect } from "react";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { HomeIcon, LogOut, LogOutIcon, Timer, TimerReset } from "lucide-react";
import { clearUser } from "../store/authSlice";
import { clearAccessToken } from "../auth/TokenStorage";
import api from "../api/axios";
import CountdownTimer from "./CountdownTimer";
import { User } from "lucide-react";
import { SquareUserRound } from "lucide-react";
import { store } from "../store/store";
import ProfilePopup from "./ProfilePopup";
import { Button } from "@mui/material";
import { Avatar } from "@mui/material";
import { logout } from "../api/auth";

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfile = () => {
    setIsProfileOpen(true);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/experience" },
    { name: "About", path: "/aboutus" },
  ];
  const isLoginPage = useLocation().pathname.includes("login");
  const isRoomPage = useLocation().pathname.includes("room");
  const isHotelPage = useLocation().pathname.includes("hotelinfo");
  const isGuestPage = useLocation().pathname.includes("/addguests");

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const startTime = useSelector((state) => state.booking.bookingInitiatedTime);
  const user = useSelector((state) => state?.auth?.user?.data);
  const roles = useSelector((state) => state?.auth?.user?.data?.roles);

  function getInitials(name = "") {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  const { isAuthenticated } = useSelector((state) => state.auth || {});
  async function handleLogout() {
    try {
      await logout();
    } catch (e) {
      console.error("Logout failed", e);
    }
    clearAccessToken();
    localStorage.setItem("loggedOut", "true");
    dispatch(clearUser());
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
  }
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-20 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/50 shadow-md text-gray-700 backdrop-blur-xl py-3 md:py-4"
          : "py-4 md:py-6"
      } ${isRoomPage && "bg-neutral-950"}
      
      `}
    >
      {/* Logo */}
      <Link to="/">
        <div className=" flex items-center gap-3 z-10 animate-fade-in-up">
          <div className="bg-white  text-black p-1.5 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            <HomeIcon size={22} fill="currentColor" strokeWidth={0} />
          </div>
          <span
            className={`text-2xl  font-bold tracking-wider text-white
            ${isScrolled ? "invert" : "text-white"}
          `}
          >
            NEONSTAYS
          </span>
        </div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className={`group flex flex-col gap-0.5 ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
          >
            {link.name}
            <div
              className={`${
                isScrolled ? "bg-gray-700" : "bg-white"
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </a>
        ))}
        {isAuthenticated && (
          <button
            onClick={() => {
              if (roles?.includes("HOTEL_MANAGER")) {
                navigate("/owner/dashboard");
              } else {
                navigate("/join-host");
              }
            }}
            className={`border px-4 py-1  font-light rounded-full cursor-pointer ${
              isScrolled ? "text-black border-black" : "text-white"
            } transition-all`}
          >
            {roles?.includes("HOTEL_MANAGER") ? "Dashboard" : "Become a Host"}
          </button>
        )}
      </div>

      {isGuestPage && <CountdownTimer startTime={startTime} />}

      {/* Desktop Right */}
      {!isAuthenticated ? (
        !isLoginPage && (
          <div className="hidden md:flex items-center gap-4">
            <Link
              to={"/login"}
              className={`px-8 py-2.5 flex justify-center gap-2 items-center mx-auto border-none 
bg-white backdrop-blur-md lg:font-semibold isolation-auto border-gray-200
before:absolute before:w-full before:transition-all before:duration-700 
before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full 
before:bg-black hover:text-white before:-z-10 before:aspect-square 
before:hover:scale-150 before:hover:duration-700 relative z-10 
overflow-hidden border-2 rounded-full group 
          ${isScrolled && "invert"} `}
            >
              Login
            </Link>
          </div>
        )
      ) : (
        <div className="flex gap-3">
          <Avatar
            onClick={() => setIsProfileOpen(true)}
            sx={{
              width: 40,
              height: 40,
              bgcolor: isScrolled ? "#1e293b" : "white", // Dark on scroll, white otherwise
              color: isScrolled ? "white" : "#1e293b", // Contrast text
              border:isScrolled? "2px solid white": "2px solid black",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            {getInitials(user?.name || "U")}
          </Avatar>

          <button
            onClick={handleLogout}
            className={`hidden md:flex group px-8 py-2.5 bg-black/80 rounded-lg text-white cursor-pointer active:scale-95 transition duration-300 hover:bg-black ${
              isRoomPage && "invert"
            } ${isHotelPage && "invert"} ${
              isHotelPage && isScrolled && "invert-0"
            }`}
          >
            <p className="relative h-6 overflow-hidden">
              <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                Logout
              </span>
              <span className="absolute w-full top-full left-1/2 -translate-x-1/2 block transition-transform duration-300 group-hover:translate-y-[-100%]">
                Bye!
              </span>
            </p>
          </button>
        </div>
      )}

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <img
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          src={assets.menuIcon}
          alt=""
          className={`${isScrolled && "invert"} h-4`}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={assets.closeIcon} alt="Close menu" className="h-6.5" />
        </button>

        {navLinks.map((link, i) => (
          <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </a>
        ))}

        <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
          Dashboard
        </button>
        <Link
          to="/login"
          className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500 inline-block cursor-pointer"
        >
          Login
        </Link>
      </div>
      <ProfilePopup
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </nav>
  );
}
