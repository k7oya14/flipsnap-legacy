import { UserInfo } from "@/lib/definitions";
import { useCursorById } from "@/lib/utils";
import { fetchUserPostsById } from "@/lib/fetch";
import ProfileImageFront from "./ProfileImageFront";
import ProfileImageBack from "./ProfileImageBack";
import FlipImage from "../FlipImage";

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
        <FlipImage
          containerStyle={{
            width: "100%",
            height: "auto",
          }}
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
    </div>
  );
}
