"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sessionUser } from "@/lib/types";
import Link from "next/link";
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ weight: "400", subsets: ["latin"] });

const IconDropDown = ({ user }: { user: sessionUser }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-12 w-12">
          <AvatarImage src={user?.image!} />
          <AvatarFallback>{user?.name!}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`${robotoSlab.className} text-center rounded-2xl shadow-lg bg-white p-2`}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel className="text-center">
          {user?.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/profile/${user?.name}`}>
          <DropdownMenuItem className="hover:cursor-pointer flex justify-center">
            Profile
          </DropdownMenuItem>
        </Link>
        <Link href="/api/auth/signout">
          <DropdownMenuItem className="hover:cursor-pointer flex justify-center">
            Sign out
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default IconDropDown;
