import { useState } from "react";
import {
  FaShoppingCart,
  FaHome,
  FaUser,
  FaBars,
  FaTimes,
  FaEnvelope,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectCartCount } from "../features/cartSlice";

function NavBar() {
  const cartCount = useSelector(selectCartCount);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-500 text-white shadow-md">
      <div className="mx-auto max-w-screen-xl px-6 flex justify-between items-center py-4">
        {/* Left Side: Logo */}
        <div className="flex items-center space-x-4">
          <img
            src="https://i.pinimg.com/736x/df/70/fc/df70fc7f957c5811ff783ad0efdd4966.jpg"
            alt="Quick Shopping Logo"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-xl font-bold">Quick Shopping</h1>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Right Side: Navigation Links + Profile & Cart */}
        <div
          className={`absolute lg:static top-16 left-0 w-full lg:w-auto bg-blue-500 lg:bg-transparent transition-transform duration-300 ${
            menuOpen ? "flex flex-col lg:flex-row" : "hidden"
          } lg:flex lg:items-center lg:space-x-8 p-4 lg:p-0`}
        >
          {/* Wrapped Home, Contact, Profile & Cart in one div */}
          <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-2 lg:space-y-0">
            <li>
              <Link
                to="/"
                className="flex items-center space-x-2 text-white! block py-2 px-4"
                onClick={() => setMenuOpen(false)}
              >
                <FaHome />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="flex items-center space-x-2 text-white! block py-2 px-4"
                onClick={() => setMenuOpen(false)}
              >
                <FaEnvelope />
                <span>Contact</span>
              </Link>
            </li>
            <li>
              <button
                className="flex items-center space-x-2 cursor-pointer py-2 px-4"
                onClick={() => setMenuOpen(false)}
              >
                <FaUser />
                <span>Profile</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/cart");
                  setMenuOpen(false);
                }}
                className="flex items-center space-x-2 cursor-pointer py-2 px-4"
              >
                <FaShoppingCart />
                <span>Cart {cartCount > 0 && `${cartCount}`}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
