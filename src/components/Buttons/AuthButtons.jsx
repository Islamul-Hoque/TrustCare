"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AuthButtons = () => {
  const { status } = useSession();

  return (
    <div>
      {status === "authenticated" ? (
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="btn btn-primary"
        >
          Log Out
        </button>
      ) : (
        <Link href="/login">
          <button className="btn btn-primary btn-outline">Login</button>
        </Link>
      )}
    </div>
  );
};

export default AuthButtons;

