import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Pacifico, Roboto_Slab } from "next/font/google";
import { ImageUp } from "lucide-react";
import IconDropDown from "./IconDropDown";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });
const robotoSlab = Roboto_Slab({ weight: "400", subsets: ["latin"] });

const Header = async () => {
  const session = await auth();
  const user = session?.user;
  return (
    <header className="sm:px-10 px-2 border-b border-gray-300 shadow-sm shadow-gray-300">
      <nav className="flex items-center justify-between p-2">
        <div className={`${pacifico.className} flex items-center`}>
          <Image src="/logo.png" alt="FlipSnap" width={60} height={60} />
          <Link href="/" className="font-bold text-xl">
            FlipSnap
          </Link>
        </div>
        <div className={`${robotoSlab.className} flex sm:space-x-8 space-x-6`}>
          {session ? (
            <>
              <Link
                href="/posts/create"
                scroll={false}
                className="flex items-center"
              >
                <p className="text-xl text-black">Post</p>
                <ImageUp className="ml-[5px] w-7 h-7 text-black" />
              </Link>
              <IconDropDown user={user!} />
            </>
          ) : (
            <Link href="/api/auth/signin">SignIn</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
