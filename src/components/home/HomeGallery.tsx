"use client";

import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import ImageFront from "../ImageFront";
import ImageBack from "../ImageBack";
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
  const [posts, setPosts] = useState<Post[][]>([[], [], []]);
  const [loading, setLoading] = useState(true);
  const [cursorPostId, setCursorPostId] = useState(useCursorById(firstPost));
  const [postLimit, setPostLimit] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: undefined,
  });

  useEffect(() => {
    setLoading(true);
    const newPostsArray = [
      [firstPost[0], firstPost[1]],
      [firstPost[2], firstPost[3]],
      [firstPost[4], firstPost[5]],
    ];
    setPosts(newPostsArray);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (inView && !loading && !postLimit) {
      const fetchMorePosts = async () => {
        const data = await fetchMoreLatestPosts(6, user?.id, cursorPostId);
        if (data.length < 6) {
          setPostLimit(true);
          return;
        }
        setPosts((prevPosts) => [
          [...prevPosts[0], data[0], data[1]],
          [...prevPosts[1], data[2], data[3]],
          [...prevPosts[2], data[4], data[5]],
        ]);
        const newCursorId = await useCursorById(data);
        setCursorPostId(newCursorId);
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
      {/* <div className="h-96 bg-slate-800"></div>
      <div className="h-96 bg-slate-800"></div>
      <div className="h-96 bg-slate-800"></div> */}
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
                    <ImageBack post={post} handleClick={handleBack} />
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
