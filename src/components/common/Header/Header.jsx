import React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import * as icons from "../../../assets/icons/navIcon.js";
import logo from "../../../assets/logo.png";
import DarkModeToggler from "../DarkModeToggler.jsx";
import { navLinks } from "../../../utils/localDb.js";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { MdExpandMore } from "react-icons/md";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Lifted state for dark mode
  const dropdownRef = useRef([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode); // Update dark mode globally
  };

  const handleMouseEnter = (index) => {
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleClickOutside = (event) => {
    const isDropdownClicked = dropdownRef.current.some(
      (ref) => ref && ref.contains(event.target)
    );
    if (!isDropdownClicked) {
      setActiveDropdown(null); // Close all dropdowns if clicked outside
    }
  };

  // Add event listener to handle clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sync dark mode class on the <html> element based on isDarkMode state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <header className="dark:bg-slate-600 dark:text-white">
      {/* First Row: Offer Banner */}
      <div className="offer first-row px-4 mx-auto relative bg-gradient-to-r from-[#AB262B] from-10% via-[#EBBA0E] via-70% to-[#EBBA0E] to-90%">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-8 py-4 items-center justify-center font-roboto font-semibold text-small leading-normal">
          <p className="text-white text-center">
            Spread the Cheer! Enjoy 30% Off on Personalized Wish Videos This
            Holiday Season – Don’t Miss Out!
          </p>
          <a
            href="#"
            className="px-7 py-1 bg-slate-100 rounded-[8px] capitalize text-[#896340] text-center text-small"
          >
            grab now
          </a>
        </div>
      </div>

      {/* Second Row: Hidden on Mobile */}
      <div className="second-row hidden xl:container xl:mx-auto lg:flex font-poppins bg-background justify-between py-4 items-center px-10 dark:bg-slate-600">
        <div className="left flex gap-3 ">
          <img
            src={icons.mail}
            alt="mail icon"
            className="dark:filter dark:brightness-0 dark:invert"
          />
          <p className="text-[#5C6671] text-sm font-normal dark:text-white">
            Info@wishings.io
          </p>
        </div>
        <div className="right flex gap-10">
          <div className="left flex items-center gap-8">
            <ul className="flex items-center gap-3">
              <li className="cursor-pointer">
                <img
                  src={icons.fb}
                  alt="Facebook"
                  className="dark:filter dark:brightness-0 dark:invert"
                />
              </li>
              <li className="cursor-pointer">
                <img
                  src={icons.yt}
                  alt="YouTube"
                  className="dark:filter dark:brightness-0 dark:invert"
                />
              </li>
              <li className="cursor-pointer">
                <img
                  src={icons.X}
                  alt="X"
                  className="dark:filter dark:brightness-0 dark:invert"
                />
              </li>
              <li className="cursor-pointer">
                <img
                  src={icons.insta}
                  alt="Instagram"
                  className="dark:filter dark:brightness-0 dark:invert"
                />
              </li>
              <li className="cursor-pointer">
                <img
                  src={icons.linkedin}
                  alt="LinkedIn"
                  className="dark:filter dark:brightness-0 dark:invert"
                />
              </li>
            </ul>
            <div className="dark-mode">
              <DarkModeToggler
                isDarkMode={isDarkMode} // Pass state
                toggleDarkMode={toggleDarkMode} // Pass function to toggle
              />
            </div>
            <div className="right flex items-center">
              <img
                src={icons.globe}
                alt="globe icon"
                className="dark:filter dark:brightness-0 dark:invert"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-b-2 mb-3"></div>

      {/* Third Row: Main Navigation */}
      <div className="third-row xl:container m-auto relative flex items-center justify-between py-0 px-4 md:px-10">
        <img
          src={logo}
          alt="logo"
          className="inline align-middle w-40 xl:w-60"
        />

        {/* Hamburger Menu for Mobile View */}
        <div className="lg:hidden ml-auto flex items-center justify-center mt-3">
          <button onClick={toggleMenu} className="text-2xl">
            {isMenuOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
          </button>
        </div>

        {/* Navigation Links and CTA Buttons for Large Screens */}
        <div className="hidden lg:flex text-center justify-between">
          {/* Nav Links */}
          <nav className="flex gap-6 xl:gap-10 justify-center">
            {navLinks.map((section, index) => (
              <div
                key={index}
                className="relative group font-poppins capitalize"
                ref={(el) => (dropdownRef.current[index] = el)}
                onMouseEnter={() => handleMouseEnter(index)} // Add hover functionality
                onMouseLeave={handleMouseLeave} // Remove hover functionality
              >
                {/*flex items-center justify-between text-small font-medium py-2 text-left hover:text-[#FEA500] */}
                <NavLink
                  to={section.path}
                  className={({ isActive }) =>
                    isActive
                      ? `flex items-center justify-between text-small font-medium py-2 text-left text-primary`
                      : `text-black flex items-center justify-between text-small font-medium py-2 text-left hover:text-[#FEA500]`
                  }
                >
                  {section.title}
                  <MdExpandMore
                    className={`w-5 h-5 ml-1 transition-transform duration-300 ${
                      activeDropdown === index ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </NavLink>

                {/* Dropdown Menu */}
                <div
                  className={`${
                    activeDropdown === index
                      ? "max-h-auto opacity-100"
                      : "max-h-0 opacity-0"
                  } lg:absolute left-0 w-48 p-2 top-12 bg-white shadow-lg rounded-xl transition-all duration-500 ease-in-out overflow-hidden`}
                >
                  {section.links.map((link, subIndex) => (
                    <a
                      key={subIndex}
                      href={link.url}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200 text-left"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
        <div className="cta-btns items-center gap-6 hidden lg:flex">
          <a
            href="#"
            className="cursor-pointer capitalize text-small font-medium"
          >
            login
          </a>
          <a
            href="#"
            className="cursor-pointer py-2 px-5 text-small font-medium text-white rounded-full capitalize bg-[#FEA500]"
          >
            sign up
          </a>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } transition-all duration-500 ease-in-out overflow-hidden py-6 px-6 absolute left-0 right-0 top-auto sm:w-1/2 sm:left-1/2 rounded-lg md:rounded-xl border bg-white z-50 dark:bg-slate-600 dark:border-slate-600`}
      >
        {/* Nav Links */}
        <nav className="flex flex-col gap-0 ">
          {navLinks.map((section, index) => (
            <div
              key={index}
              className="relative"
              ref={(el) => (dropdownRef.current[index] = el)}
            >
              <div className="flex items-center">
                <NavLink
                  to={section.path} // Toggle dropdown on click for mobile
                  className="flex justify-between items-center w-full py-2 text-gray-700 hover:text-[#FEA500] dark:text-white"
                >
                  {section.title}
                </NavLink>
                <MdExpandMore
                  onClick={() => toggleDropdown(index)}
                  className={`w-5 h-5 ml-1 transition-transform duration-300 ${
                    activeDropdown === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
              {/* Dropdown Menu */}
              <div
                className={`${
                  activeDropdown === index
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden transition-all duration-300 ease-in-out`}
              >
                {section.links.map((link, subIndex) => (
                  <a
                    key={subIndex}
                    href={link.url}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200 text-left dark:text-white"
                    onClick={() => {
                      setActiveDropdown(null); // Close dropdown on link click
                      setIsMenuOpen(false); // Close mobile menu
                    }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Second Row Content in Mobile */}
        <div className="flex flex-col gap-6 mt-4 ">
          <div className="flex gap-3 ">
            <img
              src={icons.mail}
              alt="mail icon"
              className="dark:filter dark:brightness-0 dark:invert"
            />
            <span className="text-[#5C6671] text-sm font-normal dark:text-white">
              Info@wishings.io
            </span>
          </div>
          <ul className="flex justify-start gap-10">
            <li className="cursor-pointer">
              <img
                src={icons.fb}
                alt="Facebook"
                className="dark:filter dark:brightness-0 dark:invert"
              />
            </li>
            <li className="cursor-pointer">
              <img
                src={icons.yt}
                alt="YouTube"
                className="dark:filter dark:brightness-0 dark:invert"
              />
            </li>
            <li className="cursor-pointer">
              <img
                src={icons.X}
                alt="X"
                className="dark:filter dark:brightness-0 dark:invert"
              />
            </li>
            <li className="cursor-pointer">
              <img
                src={icons.insta}
                alt="Instagram"
                className="dark:filter dark:brightness-0 dark:invert"
              />
            </li>
            <li className="cursor-pointer">
              <img
                src={icons.linkedin}
                alt="LinkedIn"
                className="dark:filter dark:brightness-0 dark:invert"
              />
            </li>
          </ul>
          <div className="flex gap-4 max-w-96">
            <a
              href="#"
              className="cursor-pointer capitalize text-center py-2 px-4 border border-gray-300 rounded-md basis-1/2"
            >
              login
            </a>
            <a
              href="#"
              className="cursor-pointer py-2 px-4 text-white bg-[#FEA500] text-center rounded-md capitalize basis-1/2"
            >
              Sign up
            </a>
          </div>
          <div className="flex justify-between text-center">
            <div className="dark-mode">
              <DarkModeToggler
                isDarkMode={isDarkMode} // Pass state to mobile toggle too
                toggleDarkMode={toggleDarkMode} // Same toggle function
              />
            </div>
            <div className="right flex items-center">
              <img
                src={icons.globe}
                alt="globe icon"
                className="dark:filter dark:brightness-0 dark:invert"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
