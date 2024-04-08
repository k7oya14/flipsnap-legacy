"use client";

import { GalleyPost } from "@/lib/definitions";
import { fetchMoreLatestPosts } from "@/lib/fetch";
import { useCursorById } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  firstPost: GalleyPost[];
};

const LoginHomeGallery = (props: Props) => {
  const { firstPost } = props;
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

  const handleIconClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <>
      {loading ? (
        <>
          <div className="h-screen"></div>
        </>
      ) : (
        <div className="lg:px-40 px-5 flex">
          {posts.map((colPosts: GalleyPost[]) => (
            <div key={colPosts[0].id} className="w-1/3 p-1 lg:p-2">
              {colPosts.map((post: GalleyPost, index) => (
                <motion.div
                  key={post.id}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: index * 0.5 }}
                  className="my-2 relative group"
                >
                  <Link
                    href={`/posts/${post.id}`}
                    scroll={false}
                    className="rounded-md my-2 overflow-hidden hover:cursor-pointer before:absolute before:inset-0"
                  >
                    <div className="absolute inset-0 rounded-md group-hover:bg-black opacity-30 duration-300"></div>
                    <Image
                      width={500}
                      height={500}
                      priority={index === 0}
                      className="rounded-md w-full h-auto"
                      alt=""
                      src={post.imgFront}
                    />
                  </Link>
                  <div className="absolute inset-x-0 bottom-0 h-full w-full">
                    <Link
                      href={`/profile/${post.author?.username}`}
                      onClick={(e) => handleIconClick(e)}
                      className="absolute bottom-2 left-2 invisible group-hover:visible flex items-center space-x-2 text-slate-200"
                    >
                      <Avatar>
                        <AvatarImage src={post.author?.image!} />
                        <AvatarFallback>{post.author?.name}</AvatarFallback>
                      </Avatar>
                      <p className="text-lg">{post.author?.name}</p>
                    </Link>
                  </div>
                </motion.div>
              ))}
              <div ref={ref} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default LoginHomeGallery;
