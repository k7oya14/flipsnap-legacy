"use client";

import { GalleyPost } from "@/lib/definitions";
import { fetchMoreLatestPosts } from "@/lib/fetch";
import { useCursorById } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { SpHomePost } from "./SpHomePost";

type Props = {
  cursorId: string;
};

const SpHomeLoadMore = (props: Props) => {
  const { cursorId } = props;
  const { cursorById } = useCursorById();
  const [posts, setPosts] = useState<GalleyPost[]>([]);
  const [postLimit, setPostLimit] = useState(false);
  const [cursorPostId, setCursorPostId] = useState(cursorId);
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: undefined,
  });

  useEffect(() => {
    if (inView && !postLimit) {
      const fetchMorePosts = async () => {
        const data = await fetchMoreLatestPosts(6, null, cursorPostId);
        if (data.length == 0) {
          setPostLimit(true);
          return;
        }
        setPosts((prevPosts) => [...prevPosts, ...data]);
        const newCursorId = cursorById(data);
        setCursorPostId(newCursorId);
      };
      fetchMorePosts();
    }
  }, [inView, postLimit]);

  return (
    <div>
      {posts.map((post: GalleyPost) => (
        <SpHomePost key={post.id} post={post} />
      ))}
      <div className="h-[1px]" ref={ref}></div>
    </div>
  );
};

export default SpHomeLoadMore;
