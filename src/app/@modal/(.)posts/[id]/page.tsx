import InterceptedDialogContent from "@/components/ui/InterceptedDialogContent";
import { Dialog, DialogOverlay } from "@/components/ui/dialog";
import { Suspense } from "react";
import DetailLoading from "@/components/skeleton/DetailLoading";
import DetailPostModal from "@/components/detail/DetailPostModal";

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
            <Suspense fallback={<DetailLoading />}>
              <DetailPostModal postId={params.id} />
            </Suspense>
          </InterceptedDialogContent>
        </DialogOverlay>
      </Dialog>
    </>
  );
}
