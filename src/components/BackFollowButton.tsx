import React from "react";
import { Button } from "./ui/button";
import { Follow } from "@/lib/actions";
import { UserRelationship } from "@/lib/definitions";
import Link from "next/link";

type Props = {
  myId: string | undefined;
  userId: string | undefined;
  relationship: UserRelationship;
};

const BackFollowButton = (props: Props) => {
  const { myId, userId, relationship } = props;
  const FollowWithId = Follow.bind(null, myId!, userId!);
  switch (relationship) {
    case UserRelationship.Following:
      return (
        <p className="whitespace-nowrap text-lg text-white text-center">
          You are not being followed
        </p>
      );
      break;
    case UserRelationship.Follower:
    case UserRelationship.None:
      return (
        <form
          action={FollowWithId}
          className="my-2 flex flex-col justify-center"
        >
          <p className="whitespace-nowrap text-lg text-white text-center">
            You have to follow
          </p>
          <Button
            type="submit"
            className="mt-2 mx-auto bg-white hover:bg-slate-100 rounded-full text-black font-bold max-w-fit"
          >
            Follow
          </Button>
        </form>
      );
      break;
    case UserRelationship.NoSession:
      return (
        <div className="my-2 flex flex-col justify-center">
          <p className="whitespace-nowrap text-lg text-white text-center">
            You have to sign in
          </p>
          <Link
            onClick={(e) => e.stopPropagation()}
            href="/api/auth/signin"
            className="mx-auto"
          >
            <Button className="mt-2 bg-white hover:bg-slate-100 rounded-full text-black font-bold max-w-fit">
              Sign in
            </Button>
          </Link>
        </div>
      );
    default:
      break;
  }
};

export default BackFollowButton;
