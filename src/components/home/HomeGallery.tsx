"use client";

import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import ImageFront from "./ImageFront";
import ImageBack from "./ImageBack";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GalleyPost } from "@/lib/definitions";
import { fetchMoreLatestPosts } from "@/lib/fetch";
import { useInView } from "react-intersection-observer";
import { useCursorById } from "@/lib/utils";

type Props = {
  flipCard: string;
  firstPost: GalleyPost[];
};

const HomeGallery = (props: Props) => {
  const { flipCard, firstPost } = props;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();
  const { cursorById } = useCursorById();
  const [posts, setPosts] = useState<GalleyPost[][]>([[], [], []]);
  const [loading, setLoading] = useState(true);
  const [cursorPostId, setCursorPostId] = useState(cursorById(firstPost));
  const [postLimit, setPostLimit] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: undefined,
  });

  useEffect(() => {
    setLoading(true);
    const newPostsArray: GalleyPost[][] = [[], [], []];
    firstPost.forEach((post: GalleyPost, i) => {
      newPostsArray[i % 3] = [...newPostsArray[i % 3], post];
    });
    setPosts(newPostsArray);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (inView && !loading && !postLimit) {
      const fetchMorePosts = async () => {
        const newPosts = await fetchMoreLatestPosts(6, null, cursorPostId);
        if (newPosts.length < 6) {
          setPostLimit(true);
        } else {
          setPosts((prevPosts) => [
            [...prevPosts[0], newPosts[0], newPosts[3]],
            [...prevPosts[1], newPosts[1], newPosts[4]],
            [...prevPosts[2], newPosts[2], newPosts[5]],
          ]);
          const newCursorPostId = cursorById(newPosts);
          setCursorPostId(newCursorPostId);
        }
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
          {posts.map((colPosts: GalleyPost[], col) => (
            <>
              <div key={col} className="w-1/3 p-2">
                {colPosts.map((post: GalleyPost, index) => (
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
