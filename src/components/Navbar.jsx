"use client";

import {
  AiOutlineSearch as SearchIcon,
  AiOutlineShoppingCart as CartIcon,
} from "react-icons/ai";
import { GrLinkPrevious as LinkPreviousIcon } from 'react-icons/gr'
import { AiOutlineHeart as HeartIcon } from 'react-icons/ai'
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const selectCart = (state) => state.cart;

function Navbar() {
  const pathname = usePathname();
  const router = useRouter()

  const { data: session, status } = useSession();

  const cart = useSelector(selectCart)

  const navbar = useRef(null);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isNavbarTransparent, setIsNavbarTransparent] = useState(false);

  // set transparent background only in home page
  useEffect(() => {
    if (pathname === "/") {
      setIsNavbarTransparent(true);
    } else {
      setIsNavbarTransparent(false);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/" && navbar.current) {
        if (window.pageYOffset > 0) {
          setIsNavbarTransparent(false);
        } else {
          setIsNavbarTransparent(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const toggleNavMenu = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
  };

  return (
    <nav
      className={`z-50 w-full transition-all duration-300 ease-in-out ${
        isNavbarTransparent ? "bg-transparent" : "bg-white"
      } ${pathname === '/' ? "fixed top-0" : "sticky top-0"}`}
      ref={navbar}
    >
      <div className="section-space-x grid grid-cols-2 w-full md:grid-cols-[1fr_2fr_1fr] items-center justify-between py-3">
        {/* back navigation and search bar */}
        <div className="flex gap-3 w-full items-center justify-start sm:w-auto">
          {pathname !== "/" && <button type="button" onClick={() => router.back()}><LinkPreviousIcon size={20}/></button>}
          <input
            className="w-full rounded-md border bg-transparent px-4 py-2 focus:outline-none"
            type="text"
            placeholder="Search..."
          />
        </div>
        {/* brand name */}
        <div className="hidden text-center md:block">
          <h1
            className={`text-2xl font-medium ${
              isNavbarTransparent ? "text-white" : "text-black"
            }`}
          >
            Thunderstone Emporium
          </h1>
        </div>
        {/* Toggle Bar */}
        <div className="flex flex-grow-0 items-center justify-end gap-5">
          {status === 'authenticated' && (
            <>
              <Link href="/cart" className="relative">
                <CartIcon
                  size={25}
                  color={
                    isNavbarTransparent ? "white" : "black"
                  }
                />
                <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-800 text-white">
                  {cart.totalQuantity}
                </span>
              </Link>
              <Link href="/wishlists">
                <HeartIcon 
                  size={25}
                  color={
                    isNavbarTransparent ? "white" : "black"
                  }
                />
              </Link>
            </>
          )}
          <button
            className={`focus:outline-none ${
              isNavbarTransparent ? "text-white" : "text-black"
            }`}
            onClick={toggleNavMenu}
          >
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isNavMenuOpen ? (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </>
              ) : (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isNavMenuOpen && (
        <div
          className={`relative ${
            isNavbarTransparent ? "bg-transparent" : "bg-white"
          }`}
        >
          <div
            className={`absolute top-0 w-full px-5 py-5 ${
              isNavbarTransparent ? "bg-transparent" : "bg-white"
            }`}
          >
            <div className="flex flex-col justify-center gap-5">
              {status === 'authenticated' ? (
                <>
                  <h2>Hi {session.user.firstName} 👋</h2>
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className={`border-2 py-3 text-lg transition-all duration-500 ease-in-out hover:font-semibold ${
                      isNavbarTransparent
                        ? "text-white hover:bg-black hover:text-white"
                        : "hover:text-black"
                    }`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/register"
                    className={`border-2 py-3 text-center text-lg transition-all duration-500 ease-in-out hover:font-semibold ${
                      isNavbarTransparent
                        ? "text-white hover:bg-black hover:text-white"
                        : "hover:text-black"
                    }`}
                  >
                    Register
                  </Link>
                  <Link
                    href="/login"
                    className={`border-2 py-3 text-center text-lg transition-all duration-500 ease-in-out hover:font-semibold ${
                      isNavbarTransparent
                        ? "text-white hover:bg-black hover:text-white"
                        : "hover:text-black"
                    }`}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
export default Navbar;
