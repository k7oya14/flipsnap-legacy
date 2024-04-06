import React from "react";
import FlipImage from "../FlipImage";
import ProfileImageFront from "./ProfileImageFront";
import ProfileImageBack from "./ProfileImageBack";
import { Post, UserInfo } from "@/lib/definitions";

type Props = {
  post: Post;
  index: number;
  myId: string | undefined;
  userInfo: UserInfo;
};

const ProfilePost = (props: Props) => {
  const { post, index, myId, userInfo } = props;
  return (
    <FlipImage
      containerStyle={{
        width: "100%",
        height: "auto",
      }}
      frontComponent={
        <ProfileImageFront index={index} src={post.imgFront} postId={post.id} />
      }
      backComponent={
        <ProfileImageBack
          src={post.imgBack}
          userId={post.authorId}
          myId={myId}
          relationship={userInfo.relationship!}
        />
      }
    />
  );
};

export default ProfilePost;
