import { PostModal } from "@/components/post-modal";
import InterceptedDialogContent from "@/components/ui/InterceptedDialogContent";
import { Dialog } from "@/components/ui/dialog";

export default function DetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <Dialog open>
      <InterceptedDialogContent className="rounded-lg">
        <div className="max-w-5xl mx-auto h-5/6 w-5/6 relative">
          <PostModal alt="" src="https://source.unsplash.com/random/" />
        </div>
      </InterceptedDialogContent>
    </Dialog>
  );
}
