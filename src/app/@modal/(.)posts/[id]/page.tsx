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
    <>
      <Dialog open>
        <DialogOverlay>
          <InterceptedDialogContent className="sm:rounded-lg outline-none focus:ring-0 max-h-full sm:w-[95vw] md:w-[70vw] overflow-hidden">
            <div className="hidden sm:block relative">
              <Suspense fallback={<p>loading</p>}>
                <PostDetail postId={params.id} />
              </Suspense>
            </div>
            <div className="sm:hidden flex flex-col dialog-scroll w-full overflow-y-scroll">
              <Suspense fallback={<SpOnePostSkeleton />}>
                <SpDetailPost postId={params.id} />
              </Suspense>
            </div>
          </InterceptedDialogContent>
        </DialogOverlay>
      </Dialog>
    </>
  );
}
