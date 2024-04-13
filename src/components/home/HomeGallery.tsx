"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchMoreLatestPostsComponent } from "@/lib/fetchWrapper";

type Props = {
  firstPosts: ReactNode[][];
  cursorId: string;
};

const HomeGallery = (props: Props) => {
  const { firstPosts, cursorId } = props;
  const [posts, setPosts] = useState<ReactNode[][]>(firstPosts);

  const [cursorPostId, setCursorPostId] = useState(cursorId);
  const [postLimit, setPostLimit] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: undefined,
  });

  useEffect(() => {
    if (inView && !postLimit) {
      const fetchMorePosts = async () => {
        const { component, cursorId } = await fetchMoreLatestPostsComponent(
          6,
          null,
          cursorPostId
        );
        if (component.length < 6) {
          setPostLimit(true);
        }
        const newPostsArray: ReactNode[][] = [[], [], []];
        component.forEach((post, i) => {
          newPostsArray[i % 3] = [...newPostsArray[i % 3], post];
        });

        setPosts((prevPosts) => [
          [...prevPosts[0], newPostsArray[0]],
          [...prevPosts[1], newPostsArray[1]],
          [...prevPosts[2], newPostsArray[2]],
        ]);
        setCursorPostId(cursorId);
      };
      fetchMorePosts();
    }
  }, [inView]);
  return (
    <div className="lg:px-40 px-5 flex">
      {posts.map((colPosts, col) => (
        <div key={col} className="relative w-1/3 p-1 lg:p-2">
          {colPosts}
          <div ref={ref} className="absolute bottom-[500px] h-[1px]" />
        </div>
      ))}
    </div>
  );
};

export default HomeGallery;
