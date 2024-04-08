"use client";

import { Post, UserInfo } from "@/lib/definitions";
import { fetchMoreUserPostsById } from "@/lib/fetch";
import { useCursorById } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ProfilePost from "./ProfilePost";
import { Skeleton } from "../ui/skeleton";

type Props = {
  myId: string | undefined;
  userInfo: UserInfo;
  cursorId: string;
};

const ProfileLoadMore = (props: Props) => {
  const { myId, userInfo, cursorId } = props;
  const { cursorById } = useCursorById();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postLimit, setPostLimit] = useState(false);
  const [cursorPostId, setCursorPostId] = useState(cursorId);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: undefined,
  });

  useEffect(() => {
    if (inView && !loading && !postLimit) {
      const fetchMorePosts = async () => {
        setLoading(true);
        const data = await fetchMoreUserPostsById(
          userInfo.id!,
          6,
          cursorPostId
        );
        if (data.length < 6) {
          setPostLimit(true);
        }
        setPosts((prevPosts) => [...prevPosts, ...data]);
        const newCursorId = cursorById(data);
        setCursorPostId(newCursorId);
        setLoading(false);
      };
      fetchMorePosts();
    }
  }, [inView, loading, postLimit]);
  return (
    <>
      {posts.map((post, index) => (
        <ProfilePost
          key={post.id}
          post={post}
          index={index}
          myId={myId}
          userInfo={userInfo}
        />
      ))}
      {loading &&
        !postLimit &&
        [...Array(6)].map((_, index) => (
          <Skeleton key={index} className="w-full aspect-square" />
        ))}
      <div className="h-[1px]" ref={ref}></div>
    </>
  );
};

export default ProfileLoadMore;
