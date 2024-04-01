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
      <nav className="flex items-center justify-between p-1 sm:p-2">
        <div className={`${pacifico.className} flex items-center`}>
          <Image
            src="/logo.svg"
            alt="FlipSnap"
            width={45}
            height={45}
            className="sm:w-[75px] sm:h-[75px]"
          />
          <Link href="/" className="sm:font-bold text-lg sm:text-xl">
            FlipSnap
          </Link>
        </div>
        <div className={`${robotoSlab.className} flex sm:space-x-8 space-x-4`}>
          {session ? (
            <>
              <Link
                href="/posts/create"
                scroll={false}
                className="flex items-center"
              >
                <p className="sm:text-xl text-black">Post</p>
                <ImageUp className="ml:ml-[1.5px] sm:ml-[5px] sm:w-7 sm:h-7 text-black" />
              </Link>
              <IconDropDown user={user!} />
            </>
          ) : (
            <Link href="/api/auth/signin" prefetch={false}>
              SignIn
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
