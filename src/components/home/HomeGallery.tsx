"use client";

import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import ImageFront from "../ImageFront";
import ImageBack from "../ImageBack";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Post, sessionUser } from "@/lib/definitions";
import { fetchLatestPosts, fetchMoreLatestPosts } from "@/lib/fetch";
import { useInView } from "react-intersection-observer";
import { useCursorById } from "@/lib/utils";
import { set } from "zod";
import { Divide } from "lucide-react";

type Props = {
  flipCard: string;
  user: sessionUser;
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
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: undefined, // 初期状態を undefined に設定
  });

  let cursorPostId = useCursorById(firstPost);

  //   const data = await fetchLatestPosts(2, user.id);

  // let cursorPostId = useCursorById(data);
  // const data2 = await fetchMoreLatestPosts(12, session?.user.id, cursorPostId);

  useEffect(() => {
    setLoading(true);
    const newPostsArray = [
      [firstPost[0], firstPost[1]],
      [firstPost[2], firstPost[3]],
      [firstPost[4], firstPost[5]],
    ];
    setPosts(newPostsArray);
    cursorPostId = useCursorById(firstPost);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (inView && !loading) {
      const fetchMorePosts = async () => {
        const data = await fetchMoreLatestPosts(6, user.id, cursorPostId);
        cursorPostId = useCursorById(data);
        setPosts((prevPosts) => [
          [...prevPosts[0], data[0], data[1]],
          [...prevPosts[1], data[2], data[3]],
          [...prevPosts[2], data[4], data[5]],
        ]);
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
                {colPosts.map((post: Post) => (
                  <ReactCardFlip
                    key={post.id}
                    isFlipped={flipCard === post.id}
                    flipDirection="horizontal"
                    flipSpeedBackToFront={0.8}
                    flipSpeedFrontToBack={0.48}
                    infinite={true}
                  >
                    <ImageFront handleClick={handleFront} post={post} />
                    <ImageBack post={post} handleClick={handleBack} />
                  </ReactCardFlip>
                ))}
                <p className="bg-red-500 h-4" ref={ref} />
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default HomeGallery;
