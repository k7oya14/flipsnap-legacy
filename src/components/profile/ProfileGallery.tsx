import { UserInfo } from "@/lib/definitions";
import { useCursorById } from "@/lib/utils";
import { fetchUserPostsById } from "@/lib/fetch";
import ProfileLoadMore from "./ProfileLoadMore";
import ProfilePost from "./ProfilePost";

type Props = {
  userInfo: UserInfo;
  myId: string | undefined;
};

export async function ProfileGallery(props: Props) {
  const { userInfo, myId } = props;
  const firstPosts = await fetchUserPostsById(userInfo.id!, 6);
  const { cursorById } = useCursorById();

  return (
    <div className="grid sm:grid-cols-3 grid-cols-2 px-1 gap-1 sm:gap-4 sm:mt-8">
      {firstPosts.map((post, index) => (
        <ProfilePost
		  key={post.id}
          post={post}
          index={index}
          myId={myId}
          userInfo={userInfo}
        />
      ))}
      <ProfileLoadMore
        myId={myId}
        userInfo={userInfo}
        cursorId={cursorById(firstPosts)}
      />
    </div>
  );
}
