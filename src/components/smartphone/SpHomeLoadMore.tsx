"use client";

import { useCursorById } from "@/lib/utils";
import React, { ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { BadgeCheck } from "lucide-react";
import { Card } from "../ui/card";
import { fetchMoreLatestPostsSpComponent } from "@/lib/fetchWrapper";

type Props = {
  cursorId: string;
};

const SpHomeLoadMore = (props: Props) => {
  const { cursorId } = props;
  const [posts, setPosts] = useState<ReactNode[]>([]);
  const [postLimit, setPostLimit] = useState(false);
  const [cursorPostId, setCursorPostId] = useState(cursorId);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: undefined,
  });

  useEffect(() => {
    if (inView && !postLimit) {
      const fetchMorePosts = async () => {
        setLoading(true);
        const { component, cursorId } = await fetchMoreLatestPostsSpComponent(
          6,
          null,
          cursorPostId
        );
        if (component.length < 6) {
          setPostLimit(true);
        }
        setPosts((prevPosts) => [...prevPosts, ...component]);
        setCursorPostId(cursorId);
        setLoading(false);
      };
      fetchMorePosts();
    }
  }, [inView, postLimit]);

  return (
    <div>
      {posts}
      <div className="h-[1px]" ref={ref}></div>
      {loading && !postLimit && (
        <div className="mx-auto m-4 animate-spin size-10 border-4 border-slate-200 rounded-full border-t-transparent"></div>
      )}
      {postLimit && (
        <Card className="flex flex-col items-center p-4 m-4 mx-auto w-96 max-w-[80vw]">
          <BadgeCheck className="size-20 mb-2" />
          <p>You&apos;re all caught up</p>
        </Card>
      )}
    </div>
  );
};

export default SpHomeLoadMore;
