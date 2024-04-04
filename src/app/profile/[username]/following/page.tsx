import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { fetchFollows } from "@/lib/fetch";
import { MoveRight, UserRoundX } from "lucide-react";
import Link from "next/link";
import React from "react";

const Following = async ({ params }: { params: { username: string } }) => {
  const username = params.username;
  const followings = await fetchFollows(username);

  return (
    <>
      <h1 className="text-2xl font-semibold text-center mt-4">Following</h1>
      <Card className="m-4 max-w-[90vw] w-[500px] mx-auto shadow-lg">
        <CardContent className="py-1">
          {followings.length === 0 ? (
            <div className="m-4 flex flex-col items-center justify-center">
              <UserRoundX className="w-20 h-20" />
              <p className="font-bold">No following</p>
            </div>
          ) : (
            followings.map((following, index) => (
              <Link
                href={`/profile/${following.username}`}
                key={following.username}
                className={`flex items-center justify-between ${
                  followings.length === index + 1 || "border-b border-gray-200"
                } py-2`}
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="size-[50px]">
                    <AvatarImage src={following.image || "/default_icon.png"} />
                    <AvatarFallback>{following.name}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-xl font-semibold">{following.name}</h1>
                    <p className="text-gray-600 text-sm">
                      @{following.username}
                    </p>
                  </div>
                </div>
                <MoveRight className="w-6 h-6 text-gray-400 hover:text-gray-500 transition-transform transform-gpu hover:translate-x-1 duration-200" />
              </Link>
            ))
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Following;
