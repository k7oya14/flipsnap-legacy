"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import { OnePost } from "@/lib/definitions";
import { useRouter } from "next/navigation";
import DetailImageFront from "./DetailImageFront";
import DetailImageBack from "./DetaiImagelBack";

type Props = {
  post: OnePost;
  myId: string | undefined;
};

export function PostDetail(props: Props) {
  const { post, myId } = props;
  const [isFlipped, setIsFlipped] = useState(false);

  const router = useRouter();

  const handleClick = () => setIsFlipped((isFlipped) => !isFlipped);

  return (
    <div className="flex">
      <div className="w-3/5 flex justify-center relative top-3 -left-3">
        <ReactCardFlip
          isFlipped={isFlipped}
          flipDirection="horizontal"
          flipSpeedBackToFront={0.6}
          flipSpeedFrontToBack={0.6}
          infinite={true}
        >
          <DetailImageFront src={post.imgFront!} handleClick={handleClick} />
          <DetailImageBack
            src={post.imgBack!}
            myId={myId}
            userId={post.authorId!}
            relationship={post.author?.relationship!}
            handleClick={handleClick}
          />
        </ReactCardFlip>
      </div>
      <div className="w-2/5 flex flex-col">
        <div className="flex items-center p-4 border-b">
          <div
            onClick={() => {
              router.push(`/profile/${post.author?.username}`);
              router.refresh();
            }}
            className="flex items-center hover:cursor-pointer"
          >
            <Avatar>
              <AvatarImage
                alt="User avatar"
                src={
                  post.author?.image || "/placeholder.svg?height=32&width=32"
                }
              />
              <AvatarFallback>{post.author?.name}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="font-semibold">{post.author?.name}</p>
              <p className="text-xs text-gray-500">{post.author?.username}</p>
            </div>
          </div>
          <MoreHorizontalIcon className="ml-auto text-gray-600" />
        </div>
        <p className="m-4">{post.caption}</p>
        {/* <div className="flex-grow overflow-y-auto">
          <div className="flex items-start space-x-3 p-4">
            <Avatar>
              <AvatarImage
                alt="User avatar"
                src="/placeholder.svg?height=32&width=32"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">
                username <span className="font-normal">comment text</span>
              </p>
              <p className="text-xs text-gray-500">2d</p>
            </div>
          </div>
        </div> */}
        {/* <div className="flex items-center justify-between p-4 border-t">
          <div className="flex space-x-4">
            <HeartIcon className="text-gray-600" />
            <ReplyIcon className="text-gray-600" />
            <SendIcon className="text-gray-600" />
          </div>
          <BookmarkIcon className="text-gray-600" />
        </div>
        <div className="px-4 pb-4">
          <p className="font-semibold">1,234 likes</p>
          <p className="text-xs text-gray-500">2 days ago</p>
        </div>
        <div className="px-4 pb-4">
          <Input placeholder="Add a comment..." type="text" />
        </div> */}
      </div>
    </div>
  );
}

function MoreHorizontalIcon(props: any) {
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
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
