"use client";

import { AiOutlineShoppingCart as CartIcon } from "react-icons/ai";
import { GrLinkPrevious as LinkPreviousIcon } from "react-icons/gr";
import {
  AiOutlineHeart as HeartIcon,
  AiOutlineClose as CloseIcon,
  AiOutlineUserAdd as RegisterIcon,
  AiOutlineLogin as LoginIcon,
} from "react-icons/ai";
import { IoExitOutline as ExitIcon } from "react-icons/io5";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

const selectCart = (state) => state.cart;
const selectWishlist = (state) => state.wishlist;

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, status } = useSession();

  const cart = useSelector(selectCart);
  const wishlist = useSelector(selectWishlist);

  const navbar = useRef(null);
  const navbarAside = useRef(null);

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

  const handleSidebar = () => {
    navbarAside.current.classList.toggle("navbar-aside");
  };

  const handleLogout = async () => {
    const confirmLogout = await Swal.fire({
      title: "Are you want to logout?",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Logout",
      showCancelButton: true,
    });
    confirmLogout.isConfirmed && signOut();
  };

  return (
    <nav
      className={`z-50 w-full transition-all duration-300 ease-in-out ${
        isNavbarTransparent ? "bg-transparent" : "bg-white"
      } ${pathname === "/" ? "fixed top-0" : "sticky top-0"}`}
      ref={navbar}
    >
      <div className="section-space-x grid w-full grid-cols-2 items-center justify-between py-3 md:grid-cols-[1fr_2fr_1fr]">
        {/* back navigation and search bar */}
        <div className="flex w-full items-center justify-start gap-3 sm:w-auto">
          {pathname !== "/" && (
            <button type="button" onClick={() => router.back()}>
              <LinkPreviousIcon size={20} />
            </button>
          )}
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
          {status === "authenticated" && (
            <>
              <Link href="/cart" className="relative">
                <CartIcon
                  size={25}
                  color={isNavbarTransparent ? "white" : "black"}
                />
                <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white">
                  {cart.totalQuantity}
                </span>
              </Link>
              <Link href="/wishlists" className="relative">
                <HeartIcon
                  size={25}
                  color={isNavbarTransparent ? "white" : "black"}
                />
                <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white">
                  {wishlist.products.length - 1}
                </span>
              </Link>
            </>
          )}
          <button
            className={`focus:outline-none ${
              isNavbarTransparent ? "text-white" : "text-black"
            }`}
            onClick={handleSidebar}
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
      {/* Aside bar */}
      <div
        className="absolute -right-full top-0 flex h-screen min-w-[300px] transform flex-col justify-between gap-3 overflow-hidden border-l bg-white p-5 transition-all duration-500 ease-in-out"
        ref={navbarAside}
      >
        <div>
          <div className="flex justify-end mb-3">
            <button onClick={handleSidebar}>
              <CloseIcon size={25} />
            </button>
          </div>
          <div className="mb-10 flex items-center gap-5">
            <div className="h-9 w-9 overflow-hidden rounded-full">
              <img
                src="/assets/img/other/no-profile.png"
                alt="No profile picture"
                className="w-9"
              />
            </div>
            <h3 className="text-lg">Muhamad Handika</h3>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-5">
              <CartIcon size={30} />
              <h4 className="text-md">Cart</h4>
            </div>
            <div className="flex items-center gap-5">
              <HeartIcon size={30} />
              <h4 className="text-md">Wishlist</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {status === 'unauthenticated' && (
            <>
              <Link href="/register" className="flex items-center gap-5">
                <RegisterIcon size={30} />
                <span className="text-md">Register</span>
              </Link>
              <Link href="/login" className="flex items-center gap-5">
                <LoginIcon size={30} />
                <span className="text-md">Login</span>
              </Link>
            </> 
          )}
          {status === "authenticated" && (
            <button onClick={handleLogout} className="flex items-center gap-5">
              <ExitIcon size={30} color="red" />
              <span className="text-md text-red-700">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
