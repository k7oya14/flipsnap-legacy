import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import DetailImageBack from "./DetaiImagelBack";
import FlipImage from "../FlipImage";
import ModalLink from "./ModalLink";
import Image from "next/image";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { OnePost } from "@/lib/definitions";
import { HeartIcon } from "lucide-react";
import { fetchComments } from "@/lib/fetch";
import { formatDistance } from "date-fns";
import OneComment from "./OneComment";
import CommentLoadMore from "./CommentLoadMore";
import { useCursorById } from "@/lib/utils";

type Props = {
  post: OnePost;
  myId: string | null | undefined;
};

export async function PostDetail(props: Props) {
  const { post, myId } = props;
  const comments = await fetchComments(post.id!, 3);
  const { cursorById } = useCursorById();

  return (
    <div className="flex h-[83vh] max-h-[600px]">
      <div className="w-[55%] rounded-l-lg bg-neutral-900 border-r border-gray-200 flex justify-center">
        <FlipImage
          containerStyle={{
            width: "100%",
            height: "100%",
            cursor: "pointer",
            margin: "auto",
          }}
          frontComponent={
            <Image
              alt=""
              width={500}
              height={500}
              style={{
                objectFit: "contain",
                height: "100%",
                width: "auto",
                margin: "auto",
              }}
              src={post.imgFront!}
            />
          }
          backComponent={
            <Suspense
              fallback={
                <Skeleton className="w-full h-[83vh] max-h-[600px] rounded-r-none" />
              }
            >
              <DetailImageBack
                src={post.imgBack!}
                myId={myId}
                userId={post.authorId!}
              />
            </Suspense>
          }
        />
      </div>
      <div className="relative w-[45%] flex flex-col border rounded-r-lg border-gray-200">
        <div className="overflow-y-scroll dialog-scroll">
          <div className="flex items-center p-2 md:p-4 border-b">
            <ModalLink
              href={`/profile/${post.author?.username}`}
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
            </ModalLink>
          </div>
          <p className="m-2 md:m-4 text-sm md:text-base">{post.caption}</p>
          <div className="flex-grow">
            {comments.map((comment) => (
              <OneComment key={comment.id} comment={comment} />
            ))}
            <CommentLoadMore
              postId={post.id}
              commentId={cursorById(comments)}
            />
          </div>
        </div>
        <div className="relative bottom-0 w-full">
          <div className="flex items-center justify-between p-2 border-t">
            <div className="flex items-center">
              <HeartIcon className="text-gray-600" />
              <p className="font-semibold ml-[6px]">
                {post._count.likes.toLocaleString()}
              </p>
            </div>

            <p className="text-xs text-gray-500">
              {formatDistance(new Date(), Date.parse(String(post.createdAt)))}{" "}
              ago
            </p>
          </div>
          <Input
            className="w-full"
            placeholder="Add a comment..."
            type="text"
          />
        </div>
      </div>
    </div>
  );
}
