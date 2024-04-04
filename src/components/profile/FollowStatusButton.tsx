"use client";

import React, { useOptimistic } from "react";
import { Button } from "../ui/button";
import { Follow, UnFollow } from "@/lib/actions";
import { UserRelationship } from "@/lib/definitions";

type Props = {
  myId: string;
  userId: string;
  relationship: UserRelationship;
};

const FollowStatusButton = (props: Props) => {
  const { myId, userId, relationship } = props;

  const [optimisticRelationship, updateOptimisticRelationship] = useOptimistic<
    UserRelationship,
    UserRelationship
  >(relationship, (state, newState: UserRelationship) => newState);

  switch (optimisticRelationship) {
    case UserRelationship.Follower:
    case UserRelationship.None:
      return (
        <div>
          <form
            action={async () => {
              updateOptimisticRelationship(relationship + 1);
              await Follow(myId, userId);
            }}
            className="my-2 flex flex-col"
          >
            <Button type="submit" className="my-2 rounded-full">
              Follow
            </Button>
          </form>
          {optimisticRelationship === UserRelationship.Follower && (
            <p className="text-sm font-normal">You are being followed</p>
          )}
        </div>
      );
    case UserRelationship.Following:
    case UserRelationship.Mutual:
      return (
        <div>
          <form
            action={async () => {
              updateOptimisticRelationship(relationship - 1);
              await UnFollow(myId, userId);
            }}
            className="my-2 flex flex-col"
          >
            <Button
              type="submit"
              className="my-2 rounded-full bg-slate-300 hover:bg-slate-400 text-black"
            >
              Unfollow
            </Button>
          </form>
          {optimisticRelationship === UserRelationship.Mutual && (
            <p className="text-sm font-normal">You are being followed</p>
          )}
        </div>
      );
    default:
      break;
  }
};

export default FollowStatusButton;
