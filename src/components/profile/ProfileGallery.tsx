"use client";

import { Post, UserInfo } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { useCursorById } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { fetchMoreUserPostsById } from "@/lib/fetch";
import Loading from "../Loading";
import ProfileImageFront from "./ProfileImageFront";
import ProfileImageBack from "./ProfileImageBack";
import ReactFlipCard from "reactjs-flip-card";

type Props = {
  firstPosts: Post[];
  userInfo: UserInfo;
  myId: string | undefined;
};

export function ProfileGallery(props: Props) {
  const { firstPosts, userInfo, myId } = props;
  const { cursorById } = useCursorById();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postLimit, setPostLimit] = useState(false);
  const [cursorPostId, setCursorPostId] = useState("");

  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: undefined,
  });

  useEffect(() => {
    setPosts(firstPosts);
    if (firstPosts.length == 0) {
      setPostLimit(true);
    } else {
      setCursorPostId(cursorById(firstPosts));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (inView && !loading && !postLimit) {
      const fetchMorePosts = async () => {
        const data = await fetchMoreUserPostsById(
          userInfo.id!,
          6,
          cursorPostId
        );
        if (data.length == 0) {
          setPostLimit(true);
          return;
        }
        setPosts((prevPosts) => [...prevPosts, ...data]);
        const newCursorId = cursorById(data);
        setCursorPostId(newCursorId);
      };
      fetchMorePosts();
    }
  }, [inView, loading, postLimit]);

  return (
    <div className="grid sm:grid-cols-3 grid-cols-2 px-1 gap-1 sm:gap-4 sm:mt-8">
      {loading && <Loading />}
      {posts.map((post, index) => (
        <ReactFlipCard
          key={post.id}
          containerStyle={{
            width: "100%",
            height: "auto",
            //   marginBottom: "8px",
          }}
          flipTrigger={"onClick"}
          direction="horizontal"
          frontComponent={
            <ProfileImageFront
              index={index}
              src={post.imgFront}
              postId={post.id}
            />
          }
          backComponent={
            <ProfileImageBack
              src={post.imgBack}
              userId={post.authorId}
              myId={myId}
              relationship={userInfo.relationship!}
            />
          }
        />
      ))}
      <div ref={ref}></div>
    </div>
  );
}
