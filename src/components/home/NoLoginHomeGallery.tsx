"use client";

import React, { ReactNode, useEffect, useState } from "react";
import ImageFront from "./ImageFront";
import ImageBack from "./ImageBack";
import { GalleyPost } from "@/lib/definitions";
import { fetchMoreLatestPosts } from "@/lib/fetch";
import { useInView } from "react-intersection-observer";
import { useCursorById } from "@/lib/utils";

import ReactFlipCard from "reactjs-flip-card";
import { fetchMoreLatestPostsComponent } from "@/lib/fetchWrapper";

type Props = {
  firstPost: ReactNode[];
  cursorId: string;
};

const NoLoginHomeGallery = (props: Props) => {
  const { firstPost, cursorId } = props;
  //   const { cursorById } = useCursorById();
  //   const [posts, setPosts] = useState<GalleyPost[][]>([[], [], []]);
  const [posts, setPosts] = useState<ReactNode[][]>([[], [], []]);

  const [loading, setLoading] = useState(true);
  const [cursorPostId, setCursorPostId] = useState(cursorId);
  const [postLimit, setPostLimit] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: undefined,
  });

  //   useEffect(() => {
  //     setLoading(true);
  //     const newPostsArray: GalleyPost[][] = [[], [], []];
  //     firstPost.forEach((post: GalleyPost, i) => {
  //       newPostsArray[i % 3] = [...newPostsArray[i % 3], post];
  //     });
  //     setPosts(newPostsArray);
  //     setLoading(false);
  //   }, []);

  useEffect(() => {
    setLoading(true);
    const newPostsArray: ReactNode[][] = [[], [], []];
    firstPost.forEach((post, i) => {
      newPostsArray[i % 3] = [...newPostsArray[i % 3], post];
    });
    setPosts(newPostsArray);
    setLoading(false);
  }, []);

  //   useEffect(() => {
  //     if (inView && !loading && !postLimit) {
  //       const fetchMorePosts = async () => {
  //         const newPosts = await fetchMoreLatestPosts(6, null, cursorPostId);
  //         if (newPosts.length < 6) {
  //           setPostLimit(true);
  //         } else {
  //           setPosts((prevPosts) => [
  //             [...prevPosts[0], newPosts[0], newPosts[3]],
  //             [...prevPosts[1], newPosts[1], newPosts[4]],
  //             [...prevPosts[2], newPosts[2], newPosts[5]],
  //           ]);
  //           const newCursorPostId = cursorById(newPosts);
  //           setCursorPostId(newCursorPostId);
  //         }
  //       };
  //       fetchMorePosts();
  //     }
  //   }, [inView, loading]);

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
        } else {
          setPosts((prevPosts) => [
            [...prevPosts[0], component[0], component[3]],
            [...prevPosts[1], component[1], component[4]],
            [...prevPosts[2], component[2], component[5]],
          ]);
          //   const newCursorPostId = cursorById(newPosts);
          setCursorPostId(cursorId);
        }
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
              {
                colPosts
                //   .map((post: GalleyPost, index) => (
                //     <ReactFlipCard
                //       key={post.id}
                //       containerStyle={{
                //         width: "100%",
                //         height: "auto",
                //         marginBottom: "8px",
                //       }}
                //       flipTrigger={"onClick"}
                //       direction="horizontal"
                //       frontComponent={<ImageFront index={index} post={post} />}
                //       backComponent={<ImageBack post={post} />}
                //     />
                //   ))
              }
              <div ref={ref} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NoLoginHomeGallery;
