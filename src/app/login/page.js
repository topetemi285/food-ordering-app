"use client";
import React, { useState } from "react";
import SectionHeader from "../../components/layout/SectionHeader";
import Image from "next/image";
import { signIn } from "next-auth/react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault(ev);
    setLoginInProgress(true);

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
    setLoginInProgress(false);
  }
  return (
    <section>
      <div className="text-center mt-16">
        <SectionHeader title={"LOGIN FORM"} />
      </div>

      <form className="mx-auto max-w-xs" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          disabled={loginInProgress}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          name="password"
          onChange={(ev) => setPassword(ev.target.value)}
          disabled={loginInProgress}
        />

        <button disabled={false} type="submit">
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>

        <button
          className="flex items-center justify-center gap-4"
          // type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <Image src="/google.webp" alt="google" width={30} height={30} />
          Login with google
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
