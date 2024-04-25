import { GalleyPost, sessionUser } from "@/lib/definitions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import Image from "next/image";
import HomeFlipImage from "../home/HomeFlipImage";
import SpPostInformation from "./SpPostInformation";
import { fetchComments } from "@/lib/fetch";

type Props = {
  post: GalleyPost;
  me: sessionUser | undefined;
};

export async function SpHomePost(props: Props) {
  const { post, me } = props;
  return (
    <div className="w-full h-full flex flex-col min-w-[360px] max-w-[960px] border-b-2">
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
        <div className="flex flex-col gap-4 pt-2 pb-4">
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

function SendIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function ReplyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  );
}

function BookmarkIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}
