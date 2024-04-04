import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { fetchFollowers } from "@/lib/fetch";
import { MoveRight, UserRoundX } from "lucide-react";
import Link from "next/link";
import React from "react";

const Follower = async ({ params }: { params: { username: string } }) => {
  const username = params.username;
  const followers = await fetchFollowers(username);

  return (
    <>
      <h1 className="text-2xl font-semibold text-center mt-4">Follower</h1>
      <Card className="m-4 max-w-[95vw] w-[500px] mx-auto shadow-lg">
        <CardContent className="py-1">
          {followers.length === 0 ? (
            <div className="m-4 flex flex-col items-center justify-center">
              <UserRoundX className="w-20 h-20" />
              <p className="font-bold">No following</p>
            </div>
          ) : (
            followers.map((follower, index) => (
              <Link
                href={`/profile/${follower.username}`}
                key={follower.username}
                className={`flex items-center justify-between ${
                  followers.length === index + 1 || "border-b border-gray-200"
                } py-2`}
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={follower.image || "/default_icon.png"} />
                    <AvatarFallback>{follower.name}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-xl font-semibold">{follower.name}</h1>
                    <p className="text-gray-600 text-sm">
                      @{follower.username}
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

export default Follower;
