"use client";

import React, { use, useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import ImageFront from "../ImageFront";
import ImageBack from "../ImageBack";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Post, sessionUser } from "@/lib/definitions";
import { fetchLatestPosts } from "@/lib/fetch";

type Props = {
  flipCard: number;
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

  //   const data = await fetchLatestPosts(2, user.id);

  useEffect(() => {
    const newPostsArray = [
      [firstPost[0], firstPost[1]],
      [firstPost[2], firstPost[3]],
      [firstPost[4], firstPost[5]],
    ];
    setPosts(newPostsArray);
  }, []);

  //   useEffect(() => {
  //     console.log(firstPost.id);
  //   }, []);
  const handleFront = (flipId: number) => {
    params.set("flip", flipId.toString());
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleBack = () => {
    params.delete("flip");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="lg:px-40 px-5 flex ">
      {posts.map((colPosts: Post[], col) => (
        <div key={col} className="w-1/3 p-2">
          {colPosts.map((post: Post, row: number) => (
            <ReactCardFlip
              key={row}
              isFlipped={flipCard === col * 4 + row}
              flipDirection="horizontal"
              flipSpeedBackToFront={0.8}
              flipSpeedFrontToBack={0.48}
              infinite={true}
              //   cardZIndex={`${index / 3}`}
            >
              <ImageFront
                col={col}
                row={row}
                handleClick={handleFront}
                src={post.imgFront}
              />
              <ImageBack src={post.imgBack} handleClick={handleBack} />
            </ReactCardFlip>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HomeGallery;
