import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Pacifico, Roboto_Slab } from "next/font/google";
import { BanknotesIcon } from "@heroicons/react/24/outline";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });
const robotoSlab = Roboto_Slab({ weight: "400", subsets: ["latin"] });

const Header = async () => {
  const session = await auth(); //sessionがnullログインしてない
  const user = session?.user;
  return (
    <header className="">
      <nav className="flex items-center justify-between p-2">
        <div className={`${pacifico.className} flex items-center`}>
          <Image src="/logo.png" alt="FlipSnap" width={60} height={60} />
          <Link href="/" className="font-bold text-xl">
            FlipSnap
          </Link>
        </div>
        <div className={`${robotoSlab.className} flex space-x-4`}>
          <Link
            href="/posts/create"
            scroll={false}
            className="flex items-center"
          >
            <p>Post</p>
            <BanknotesIcon className="ml-[0.8px] w-6 h-6 text-black" />
          </Link>
          {session ? (
            // <Link href="/api/auth/signout">SignOut</Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.image!} />
                  <AvatarFallback>{user?.name!}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/profile/${user?.id}`}>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href="/api/auth/signout">
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/api/auth/signin">SignIn</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
