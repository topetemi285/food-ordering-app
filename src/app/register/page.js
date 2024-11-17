"use client";
import React, { useState } from "react";
import Image from "next/image";
import SectionHeader from "../../components/layout/SectionHeader";
import Link from "next/link";
import { signIn } from "next-auth/react";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  };

  return (
    <section className="my-10">
      <div className="text-center">
        <SectionHeader title={"REGISTRATION FORM"} />
      </div>
      {userCreated && (
        <div className="text-center my-6">
          User created.
          <br /> Now you can
          <Link className="underline" href="/login">
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 ltext center">
          An error as occurred <br />
          Please try again later
        </div>
      )}
      <form className="block max-w-xl mx-auto" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          onChange={(ev) => setEmail(ev.target.value)}
          disabled={setCreatingUser}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(ev) => setPassword(ev.target.value)}
          disabled={setCreatingUser}
        />
        <button type="submit" disabled={setCreatingUser}>
          Register
        </button>

        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          className="flex items-center justify-center gap-4"
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <Image src="/google.webp" alt="google" width={30} height={30} />
          Login with google
        </button>

        <div className="my-4 text-center text-gray-500 mt-4">
          Existing Account?{" "}
          <Link href={"/login"} className="underline">
            Login Here&raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;
