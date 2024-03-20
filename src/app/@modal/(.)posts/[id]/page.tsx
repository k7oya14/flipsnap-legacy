import { PostModal } from "@/components/detail/post-modal";
import InterceptedDialogContent from "@/components/ui/InterceptedDialogContent";
import { Dialog } from "@/components/ui/dialog";

export default function DetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <Dialog open>
      <InterceptedDialogContent className="rounded-lg">
        <div className="max-w-5xl mx-auto h-4/5 w-4/5 relative">
          <PostModal alt="" src="https://source.unsplash.com/random/" />
        </div>
      </InterceptedDialogContent>
    </Dialog>
  );
}
