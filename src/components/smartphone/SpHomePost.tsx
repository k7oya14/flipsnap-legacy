import { GalleyPost, sessionUser } from "@/lib/definitions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import Image from "next/image";
import HomeFlipImage from "../home/HomeFlipImage";
import SpPostInformation from "./SpPostInformation";

type Props = {
  post: GalleyPost;
  me: sessionUser | undefined;
};

export async function SpHomePost(props: Props) {
  const { post, me } = props;
  return (
    <div className="w-full h-full flex flex-col border-b-2">
      <Link
        href={`/profile/${post.author?.username}`}
        className="pl-3 pt-3 flex items-center hover:cursor-pointer"
      >
        <Avatar>
          <AvatarImage
            className="rounded-full w-10 h-10"
            src={post.author?.image || "/placeholder.svg?height=32&width=32"}
          />
          <AvatarFallback>{post.author?.name}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="font-semibold">{post.author?.name}</p>
          <p className="ml-1 text-xs text-gray-500">{post.author?.username}</p>
        </div>
      </Link>
      <main className="flex-grow overflow-y-auto">
        <div className="flex flex-col pt-2">
          <HomeFlipImage
            post={post}
            myId={me?.id}
            containerStyle={{
              width: "100%",
              height: "auto",
            }}
            frontComponent={
              <Image
                alt=""
                src={post.imgFront}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "auto",
                }}
                width={500}
                height={500}
              />
            }
          />
          <SpPostInformation
            home={true}
            caption={post.caption}
            createdAt={post.createdAt}
            postId={post.id}
            me={me}
          />
        </div>
      </main>
    </div>
  );
}
