"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchMoreLatestPostsComponent } from "@/lib/fetchWrapper";

type Props = {
  firstPost: ReactNode[];
  cursorId: string;
};

const NoLoginHomeGallery = (props: Props) => {
  const { firstPost, cursorId } = props;
  const [posts, setPosts] = useState<ReactNode[][]>([[], [], []]);

  const [loading, setLoading] = useState(true);
  const [cursorPostId, setCursorPostId] = useState(cursorId);
  const [postLimit, setPostLimit] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: undefined,
  });

  useEffect(() => {
    setLoading(true);
    const newPostsArray: ReactNode[][] = [[], [], []];
    firstPost.forEach((post, i) => {
      newPostsArray[i % 3] = [...newPostsArray[i % 3], post];
    });
    setPosts(newPostsArray);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (inView && !loading && !postLimit) {
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
  }, [inView, loading]);
  return (
    <>
      {loading ? (
        <div className="h-screen"></div>
      ) : (
        <div className="lg:px-40 px-5 flex">
          {posts.map((colPosts, col) => (
            <div key={col} className="w-1/3 p-1 lg:p-2">
              {colPosts}
              <div ref={ref} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NoLoginHomeGallery;
