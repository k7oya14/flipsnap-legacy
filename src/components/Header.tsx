import { auth } from "@/lib/auth";
import Link from "next/link";
import React from "react";

const Header = async () => {
  const session = await auth();
  return (
    <header className="">
      <nav className="flex items-center justify-between p-4">
        <Link href="/">FlipSnap</Link>
        <div className="flex space-x-4">
          <Link href="/posts/create" scroll={false}>
            Post
          </Link>
          {session ? (
            <Link href="/api/auth/signout">SignOut</Link>
          ) : (
            <Link href="/api/auth/signin">SignIn</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
