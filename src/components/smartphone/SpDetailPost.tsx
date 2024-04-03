import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { OnePost, UserRelationship } from "@/lib/definitions";
import SpDetailFlipImage from "./SpDetailFlipImage";

type Props = {
  post: OnePost;
  myId: string;
};

export function SpDetailPost(props: Props) {
  const { post, myId } = props;
  const hidden =
    post.author.relationship === UserRelationship.Mutual ||
    post.author.relationship === UserRelationship.Me;
  return (
    <div className="w-full h-full flex flex-col">
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
          <SpDetailFlipImage post={post} myId={myId} hidden={hidden} />
          <div className="px-4 gap-2 flex flex-col">
            <div className="flex items-center gap-2">
              <button className="focus:outline-none">
                <HeartIcon className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer" />
              </button>
              <button className="focus:outline-none">
                <ReplyIcon className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer" />
              </button>
              <button className="focus:outline-none">
                <SendIcon className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer" />
              </button>
              <button className="focus:outline-none ml-auto">
                <BookmarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer" />
              </button>
            </div>
            <p className="">{post.caption}</p>
            <p className="text-sm text-gray-500">
              Liked by
              <strong className="font-medium text-gray-600">
                user
              </strong> and{" "}
              <strong className="font-medium text-gray-600">others</strong>
            </p>
            <div className="flex items-center gap-2">
              <strong className="font-medium text-gray-600">user</strong>
              <p className="text-sm text-gray-500">Great post!</p>
            </div>
            <p className="text-xs text-gray-400">
              {formatDistance(new Date(), Date.parse(String(post.createdAt)))}{" "}
              ago
            </p>
          </div>
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
