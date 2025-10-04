"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useUser, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Search, Menu, X } from "lucide-react";

const Nav = () => {
  const { user, isSignedIn } = useUser();
  const [activeTab, setActiveTab] = useState("reviews");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { key: "reviews", label: "People Reviews", href: "/peoples-review" },
    { key: "movies", label: "Films", href: "/movies" },
    { key: "tv", label: "TV Shows", href: "/tv-shows" },
    { key: "members", label: "Members", href: "/members" },
  ];

  const activeStyle = "text-white font-semibold";
  const defaultStyle = "text-cgray";
  const hoverStyle = "hover:text-white transition-colors duration-300";

  const closeMenu = () => setIsMobileMenuOpen(false);

  // Desktop & Mobile Links
  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={`flex ${isMobile ? "flex-col items-start gap-6" : "flex-row items-center gap-6"}`}>
      {/* Profile link */}
      <Link
        href="/profile"
        onClick={() => {
          setActiveTab("profile");
          closeMenu();
        }}
        className={`${activeTab === "profile" ? activeStyle : defaultStyle} ${hoverStyle} ${isMobile ? "text-2xl" : "text-lg"}`}
      >
        Profile
      </Link>

      {/* Search link */}
      <Link
        href="/search"
        onClick={() => {
          setActiveTab("search");
          closeMenu();
        }}
        className={`${activeTab === "search" ? activeStyle : defaultStyle} ${hoverStyle} ${isMobile ? "text-2xl flex items-center gap-2" : "text-lg flex items-center gap-1"}`}
      >
        <Search size={isMobile ? 28 : 20} />
        {isMobile && "Search"}
      </Link>

      {/* Other nav items */}
      {navItems.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          onClick={() => {
            setActiveTab(item.key);
            closeMenu();
          }}
          className={`${item.key === activeTab ? activeStyle : defaultStyle} ${hoverStyle} ${isMobile ? "text-2xl" : "text-lg"}`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );

  return (
    <nav className="w-full py-4 px-4 md:px-8 text-cgray relative z-50">
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setActiveTab("home")}
          className="flex items-center gap-1 text-2xl font-bold text-white"
        >
          <div className="text-green-500 text-3xl">▶</div>
          <span className="font-sans font-normal text-3xl">Movix</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 w-full h-screen bg-black z-40 flex flex-col pt-20 px-8 gap-8">
          {/* Links */}
          <NavLinks isMobile />

          {/* Auth Buttons */}
          <SignedOut>
            <div className="mt-6 flex flex-col items-start gap-5 w-full">
              <SignInButton mode="modal">
                <button className="hover:text-white border border-cgray rounded py-2 px-4 text-2xl w-full text-left">
                  SIGN IN
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="hover:text-white border border-cgray rounded py-2 px-4 text-2xl w-full text-left">
                  CREATE ACCOUNT
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      )}
    </nav>
  );
};

export default Nav;
