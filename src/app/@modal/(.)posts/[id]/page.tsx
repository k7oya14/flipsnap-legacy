import { PostDetail } from "@/components/detail/PostDetail";
import InterceptedDialogContent from "@/components/ui/InterceptedDialogContent";
import { Dialog, DialogOverlay } from "@/components/ui/dialog";
import { SpDetailPost } from "@/components/smartphone/SpDetailPost";
import { Suspense } from "react";
import SpOnePostSkeleton from "@/components/skeleton/SpOnePostSkeleton";

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Dialog open>
      <DialogOverlay>
        <InterceptedDialogContent className="sm:rounded-lg w-full outline-none focus:ring-0 max-h-full sm:w-[90%] sm:max-h-[95%] overflow-hidden">
          {/* <div className="hidden sm:block max-w-5xl mx-auto w-[90%] relative">
            <PostDetail postId={postId} />
          </div> */}
          <div className="sm:hidden flex flex-col dialog-scroll overflow-y-scroll">
            <Suspense fallback={<SpOnePostSkeleton />}>
              <SpDetailPost postId={params.id} />
            </Suspense>
          </div>
        </InterceptedDialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
