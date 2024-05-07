"use client";

import Link from "next/link";
import { FiLoader, FiLock, FiLogOut, FiUser } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
  const { status, data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold text-2xl pl-1 hover:tracking-widest duration-300">
            <span className="text-blue-500">DEV</span>CONTROLE
          </h1>
        </Link>

        {status === "loading" && (
          <button>
            <FiLoader size={26} color="#4b5563" className="animate-spin" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleLogin}>
            <FiLock size={26} color="#4b5563" />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-baseline gap-4">
            <Link href="/dashboard">
              <FiUser size={26} color="#4b5563" />
            </Link>

            <button onClick={handleLogout}>
              <FiLogOut size={26} color="#ec3333" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
