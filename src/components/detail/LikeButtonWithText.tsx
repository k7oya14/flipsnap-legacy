import React, { useState } from "react";
import LikeButton from "../LikeButton";

type Props = {
  defaultLiked: boolean;
  myId: string | undefined | null;
  postId: string;
  initialCountLikes: number;
};

const LikeButtonWithText = (props: Props) => {
  const { defaultLiked, myId, postId, initialCountLikes } = props;
  const [countLikes, setCountLikes] = useState(initialCountLikes);

  const onClick = (liked: boolean) => {
    if (liked) {
      setCountLikes(countLikes + 1);
    } else {
      setCountLikes(countLikes - 1);
    }
  };
  return (
    <LikeButton
      defaultLiked={defaultLiked}
      myId={myId}
      postId={postId}
      text={String(countLikes)}
      onClick={onClick}
    />
  );
};

export default LikeButtonWithText;
