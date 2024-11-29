"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { CartContext } from "./AppContxt";
import { useContext } from "react";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FaUserCircle } from "react-icons/fa";
import UserTabs from "../components/layout/Tabs";
import Image from "next/image";

function Header() {
  const [isOpened, setIsOpened] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // const session = useSession();
  // console.log(session)
  // const status = session?.status;
  // const userData = session.data?.user;
  // const { cartProducts } = useContext(CartContext);
  // let username = userData?.name || userData?.email;
  // if (username && username.includes(" ")) {
  //   username = username.split(" ")[0];
  // }
  const { data: session, status } = useSession();
  console.log("Session:", session);
  console.log("Status:", status);

  const userData = session?.user;
  const { cartProducts } = useContext(CartContext);
  let username = userData?.name || userData?.email;

  if (username && username.includes(" ")) {
    username = username.split(" ")[0];
  }

  return (
    <nav className="bg-gray-50 sticky top-0 z-50 mb-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            {/* {!isMobile ? (
              <Link href="" className="text-blue-700 font-semibold text-4xl">
                WoConIn
              </Link>
            ) : (
              <button
                onClick={() => (
                  <div className="flex flex-row justify-start items-start py-6 px-4 bg-slate-400">
                    <p>peter</p>
                  </div>
                )}
              >
                <FaUserCircle size={40} color="gray" />
              </button>
            )} */}

            {!isMobile ? (
              <Link href="" className="text-blue-700 font-semibold text-4xl">
                WoConIn
              </Link>
            ) : (
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <FaUserCircle size={25} color="gray" />
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpened(!isOpened)}
              className="text-black hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main Menu</span>
              {isOpened ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={"2"}
                    d="M6 18L18 6M6 6L12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={"2"}
                    d="M6 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center justify-center gap-4">
            <div>
              <Link
                className="text-black hover:text-blue-700 px-3 rounded-md text-sm font-medium"
                href="/"
              >
                Home
              </Link>
              <Link
                className="text-black hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                href="/menu"
              >
                Menu
              </Link>
              <Link
                className="text-black hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                href="/#AboutUs"
              >
                About
              </Link>
              <Link
                className="text-black hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                href="/#"
              >
                Contact
              </Link>
            </div>

            <div>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <FaUserCircle size={25} color="gray" />
              </button>
            </div>
          </div>
        </div>

        <div>
          {isDropdownOpen && (
            <div className="flex flex-col items-end justify-end gap-4 top-full py-4 px-6 rounded shadow-lg my-3">
              {status === "authenticated" && (
                <>
                  <Link href={"/profile"} className="whitespace-nowrap">
                    Hello, {username}
                  </Link>

                  <UserTabs isAdmin={true} />

                  <p
                    onClick={() => signOut()}
                    className="bg-blue-700 px-4 py-2 rounded-full text-cyan-50 cursor-pointer"
                    href={"/register"}
                  >
                    Logout
                  </p>
                </>
              )}
              {status === "unauthenticated" && (
                <>
                  <Link
                    className="text-black hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                    href="/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="bg-blue-700 px-4 py-2 rounded-full text-cyan-50 cursor-pointer"
                    href="/register"
                  >
                    Register
                  </Link>
                </>
              )}
              <Link
                className="relative text-black hover:text-blue-700  rounded-md text-sm font-medium"
                href={"/cart"}
              >
                <p>Cart</p>
                <span className="absolute -top-2 -right-2 bg-red-700 text-white text-sm p-1 rounded-full leading-3">
                  {cartProducts.length}
                </span>
              </Link>
            </div>
          )}
        </div>

        <div>
          {isOpened && (
            <div className="md:hidden">
              <div className="flex flex-col items-end text-gray-500 justify-start bg-gray-100 h-40 my-3">
                <Link
                  className=" hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                  href="/"
                >
                  Home
                </Link>
                <Link
                  className=" hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                  href="/menu"
                >
                  Menu
                </Link>
                <Link
                  className=" hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                  href="/#AboutUs"
                >
                  About
                </Link>
                <Link
                  className="hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                  href="/#"
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* <div>
          {isDropdownOpen && (
            <div className="md:hidden">
              <div className="top-full right-0 py-4 px-6 rounded shadow-lg my-3">
                {status === "authenticated" && (
                  <>
                    <Link href={"/profile"} className="whitespace-nowrap">
                      Hello, {username}
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="text-black hover:text-blue-700 px-3 py-2 rounded-md text-lg cursor-pointer my-2"
                      href={"/register"}
                    >
                      Logout
                    </button>
                  </>
                )}
                {status === "unauthenticated" && (
                  <>
                    <Link href="/login">Login</Link>
                    <Link
                      className="bg-blue-700 px-4 py-2 rounded-full text-cyan-50 cursor-pointer"
                      href="/register"
                    >
                      Register
                    </Link>
                  </>
                )}
                <Link
                  className=" relative text-black hover:text-blue-700 px-1 py-1 rounded-md text-sm font-medium"
                  href={"/cart"}
                >
                  <p>Cart</p>
                  <span className="absolute top-3 left-6 bg-red-700 text-white text-sm p-1 rounded-full leading-3">
                    {cartProducts.length}
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div> */}
      </div>
    </nav>
  );
}

export default Header;
