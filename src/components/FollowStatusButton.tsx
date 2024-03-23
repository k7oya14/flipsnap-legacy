import React from "react";
import { Button } from "./ui/button";
import { Follow, UnFollow } from "@/lib/actions";
import { UserRelationship } from "@/lib/definitions";

type Props = {
  myId: string;
  userId: string;
  relationship: UserRelationship;
};

const FollowStatusButton = (props: Props) => {
  const { myId, userId, relationship } = props;
  const FollowWithId = Follow.bind(null, myId, userId);
  const UnfollowWithId = UnFollow.bind(null, myId, userId);

  switch (relationship) {
    case UserRelationship.Following:
      return (
        <form action={UnfollowWithId} className="my-2 flex flex-col">
          <Button
            type="submit"
            className="my-2 rounded-full bg-slate-300 hover:bg-slate-400 text-black"
          >
            Unfollow
          </Button>
        </form>
      );
      break;
    case UserRelationship.Follower:
      return (
        <form action={FollowWithId} className="my-2 flex flex-col">
          <Button type="submit" className="my-2 rounded-full">
            Follow
          </Button>
          <p className="text-sm font-normal">You are being followed</p>
        </form>
      );
      break;
    case UserRelationship.Mutual:
      return (
        <form action={UnfollowWithId} className="my-2 flex flex-col">
          <Button
            type="submit"
            className="my-2 rounded-full bg-slate-300 hover:bg-slate-400 text-black"
          >
            Unfollow
          </Button>
          <p className="text-sm font-normal">You are being followed</p>
        </form>
      );
      break;
    case UserRelationship.None:
      return (
        <form action={FollowWithId} className="my-2 flex flex-col">
          <Button type="submit" className="my-2 rounded-full">
            Follow
          </Button>
        </form>
      );
      break;
    default:
      break;
  }
};

export default FollowStatusButton;
