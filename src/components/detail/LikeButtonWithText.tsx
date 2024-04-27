import React, { useState } from "react";
import LikeButton from "../LikeButton";

type Props = {
  myId: string | undefined | null;
  postId: string;
  initialCountLikes: number;
};

const LikeButtonWithText = (props: Props) => {
  const { myId, postId, initialCountLikes } = props;
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
      myId={myId}
      postId={postId}
      text={String(countLikes)}
      onClick={onClick}
    />
  );
};

export default LikeButtonWithText;
