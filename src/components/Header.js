"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { CartContext } from "./AppContxt";
import { useContext } from "react";

function Header() {
  // const session = useSession();
  // console.log(session)
  // const status = session?.status;
  // const userData = session.data?.user;
  // const { cartProducts } = useContext(CartContext);
  // let username = userData?.name || userData?.email;
  // if (username && username.includes(" ")) {
  //   username = username.split(" ")[0];
  // }
  const { data: session, status } = useSession(); // Destructure the session and status
  console.log("Session:", session);
  console.log("Status:", status);

  const userData = session?.user;
  const { cartProducts } = useContext(CartContext);
  let username = userData?.name || userData?.email;

  if (username && username.includes(" ")) {
    username = username.split(" ")[0];
  }

  return (
    <header className="flex items-center justify-between">
      <div>
        <Link href="" className="text-blue-950 font-semibold text-4xl">
          WoConIn
        </Link>
      </div>

      <nav className="flex items-center gap-5 font-semibold text-gray-600">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/#AboutUs">About Us</Link>
        <Link href="/#">Contact Us</Link>
      </nav>

      <nav className="flex items-center gap-8 text-gray-500">
        {status === "authenticated" && (
          <>
            <Link href={"/profile"} className="whitespace-nowrap">
              Hello, {username}
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-blue-950 px-4 py-2 rounded-full text-cyan-50 cursor-pointer"
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
              className="bg-blue-950 px-4 py-2 rounded-full text-cyan-50 cursor-pointer"
              href="/register"
            >
              Register
            </Link>
          </>
        )}
        <Link className="relative" href={"/cart"}>
          <p>Cart</p>
          <span className="absolute -top-2 -right-2 bg-red-700 text-white text-sm p-1 rounded-full leading-3">
            {cartProducts.length}
          </span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
