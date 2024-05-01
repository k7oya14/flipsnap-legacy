"use client";

import React, { useOptimistic } from "react";
import { Button } from "./ui/button";
import { Follow } from "@/lib/actions";
import { UserRelationship } from "@/lib/definitions";
import { signIn } from "next-auth/react";

type Props = {
  profile?: boolean;
  myId: string | undefined;
  userId: string | undefined;
  relationship: UserRelationship;
  fetchRelationship?: () => void;
};

const BackFollowButton = (props: Props) => {
  const {
    profile = true,
    myId,
    userId,
    relationship,
    fetchRelationship,
  } = props;
  const [optimisticRelationship, updateOptimisticRelationship] = useOptimistic<
    UserRelationship,
    UserRelationship
  >(relationship, (state, newState: UserRelationship) => newState);

  switch (optimisticRelationship) {
    case UserRelationship.Following:
      return (
        <p className="whitespace-nowrap text-lg text-white text-center">
          You are not being followed
        </p>
      );
    case UserRelationship.Follower:
    case UserRelationship.None:
      return (
        <form
          action={async () => {
            updateOptimisticRelationship(relationship + 1);
            await Follow(myId!, userId!);
            await fetchRelationship?.();
          }}
          className="my-2 flex flex-col justify-center"
        >
          <p className="hidden sm:block whitespace-nowrap text-lg text-white text-center">
            You have to follow
          </p>
          <div className="mx-auto" onClick={(e) => e.stopPropagation()}>
            <Button
              type="submit"
              className="mt-2 mx-auto px-0 bg-white hover:bg-slate-100 rounded-full text-black font-bold max-w-fit"
            >
              Follow
            </Button>
          </div>
        </form>
      );
    case UserRelationship.NoSession:
      return (
        <div className="my-2 flex flex-col justify-center">
          <p className="whitespace-nowrap text-lg text-white text-center">
            You have to sign in
          </p>
          <div className="mx-auto" onClick={(e) => e.stopPropagation()}>
            <Button
              onClick={() => signIn("google")}
              className="mt-2 bg-white hover:bg-slate-100 rounded-full text-black font-bold max-w-fit"
            >
              Sign in
            </Button>
          </div>
        </div>
      );
    default:
      break;
  }
};

export default BackFollowButton;
