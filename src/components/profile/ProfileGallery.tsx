import { UserInfo } from "@/lib/definitions";
import { useCursorById } from "@/lib/utils";
import { fetchUserPostsById } from "@/lib/fetch";
import ProfileLoadMore from "./ProfileLoadMore";
import ProfilePost from "./ProfilePost";
import { Instagram } from "lucide-react";

type Props = {
  userInfo: UserInfo;
  myId: string | undefined;
};

export async function ProfileGallery(props: Props) {
  const { userInfo, myId } = props;
  const firstPosts = await fetchUserPostsById(userInfo.id!, 6);
  const { cursorById } = useCursorById();

  return (
    <div
      className={`${
        firstPosts.length === 0 ||
        "grid sm:grid-cols-3 grid-cols-2 px-1 sm:px-2 gap-1 sm:gap-2 sm:mt-4"
      }`}
    >
      {firstPosts.map((post, index) => (
        <ProfilePost
          key={post.id}
          post={post}
          index={index}
          myId={myId}
          userInfo={userInfo}
        />
      ))}
      {firstPosts.length === 0 ? (
        <div className="pt-6 pb-10 flex flex-col sm:flex-row items-center justify-center">
          <Instagram className="size-16 lg:size-20 mb-2 sm:mr-4" />
          <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            No posts yet
          </p>
        </div>
      ) : (
        <ProfileLoadMore
          myId={myId}
          userInfo={userInfo}
          cursorId={cursorById(firstPosts)}
        />
      )}
    </div>
  );
}
