"use client";

import { GalleyPost } from "@/lib/definitions";
import { fetchMoreLatestPosts } from "@/lib/fetch";
import { useCursorById } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { SpHomePost } from "./SpHomePost";
import { BadgeCheck, Divide } from "lucide-react";
import { Card } from "../ui/card";

type Props = {
  cursorId: string;
};

const SpHomeLoadMore = (props: Props) => {
  const { cursorId } = props;
  const { cursorById } = useCursorById();
  const [posts, setPosts] = useState<GalleyPost[]>([]);
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
        const data = await fetchMoreLatestPosts(6, null, cursorPostId);
        if (data.length == 0) {
          setPostLimit(true);
          return;
        }
        setPosts((prevPosts) => [...prevPosts, ...data]);
        const newCursorId = cursorById(data);
        setCursorPostId(newCursorId);
        setLoading(false);
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
