"use client";

import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import ImageFront from "./ImageFront";
import ImageBack from "./ImageBack";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Post, sessionUser } from "@/lib/definitions";
import { fetchMoreLatestPosts } from "@/lib/fetch";
import { useInView } from "react-intersection-observer";
import { useCursorById } from "@/lib/utils";

type Props = {
  flipCard: string;
  user: sessionUser | undefined;
  firstPost: any;
};

const HomeGallery = (props: Props) => {
  const { flipCard, user, firstPost } = props;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();
  const { cursorById } = useCursorById();
  const [posts, setPosts] = useState<Post[][]>([[], [], []]);
  const [loading, setLoading] = useState(true);
  const [cursorPostId, setCursorPostId] = useState(cursorById(firstPost));
  const [postLimit, setPostLimit] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: undefined,
  });

  useEffect(() => {
    const fetchMorePosts = async () => {
      const data = await fetchMoreLatestPosts(2, user?.id, cursorPostId);
      setPosts((prevPost) => [[...prevPost[0]], [data[0]], [data[1]]]);
      const newCursorId = cursorById(data);
      setCursorPostId(newCursorId);
    };
    setLoading(true);
    const newPostsArray = [[firstPost[0]], [], []];
    setPosts(newPostsArray);
    setLoading(false);
    fetchMorePosts();
  }, []);

  useEffect(() => {
    if (inView && !loading && !postLimit) {
      const fetchMorePosts = async () => {
        if (posts[1].length === 0) {
          const data = await fetchMoreLatestPosts(1, user?.id, cursorPostId);
          setPosts((prevPost) => [[...prevPost[0]], [data[0]], [data[1]]]);
          const newCursorId = cursorById(data);
          setCursorPostId(newCursorId);
          return;
        }
        const data1 = await fetchMoreLatestPosts(1, user?.id, cursorPostId);
        if (data1.length === 0) {
          setPostLimit(true);
          alert("No more posts to show");
          return;
        }
        setPosts((prevPosts) => [
          [...prevPosts[0], data1[0]],
          [...prevPosts[1]],
          [...prevPosts[2]],
        ]);
        const newCursorId1 = cursorById(data1);
        setCursorPostId(newCursorId1);

        const data2 = await fetchMoreLatestPosts(1, user?.id, newCursorId1);
        if (data2.length === 0) {
          setPostLimit(true);
          alert("No more posts to show");
          return;
        }
        setPosts((prevPosts) => [
          [...prevPosts[0]],
          [...prevPosts[1], data2[0]],
          [...prevPosts[2]],
        ]);
        const newCursorId2 = cursorById(data2);
        setCursorPostId(newCursorId2);

        const data3 = await fetchMoreLatestPosts(1, user?.id, newCursorId2);
        if (data3.length === 0) {
          setPostLimit(true);
          alert("No more posts to show");
          return;
        }
        setPosts((prevPosts) => [
          [...prevPosts[0]],
          [...prevPosts[1]],
          [...prevPosts[2], data3[0]],
        ]);
        const newCursorId3 = cursorById(data3);
        setCursorPostId(newCursorId3);
      };
      fetchMorePosts();
    }
  }, [inView, loading]);

  const handleFront = (flipId: string) => {
    params.set("flip", flipId.toString());
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleBack = () => {
    params.delete("flip");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {loading ? (
        <>
          <div className="h-screen"></div>
        </>
      ) : (
        <div className="lg:px-40 px-5 flex">
          {posts.map((colPosts: Post[], col) => (
            <>
              <div key={col} className="w-1/3 p-2">
                {colPosts.map((post: Post, index) => (
                  <ReactCardFlip
                    key={post.id}
                    isFlipped={flipCard === post.id}
                    flipDirection="horizontal"
                    flipSpeedBackToFront={0.8}
                    flipSpeedFrontToBack={0.48}
                    infinite={true}
                  >
                    <ImageFront
                      index={index}
                      handleClick={handleFront}
                      post={post}
                    />
                    <ImageBack
                      post={post}
                      myId={user?.id}
                      handleClick={handleBack}
                    />
                  </ReactCardFlip>
                ))}
                <div ref={ref} />
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default HomeGallery;
