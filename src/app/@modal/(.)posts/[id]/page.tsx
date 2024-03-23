import { PostDetail } from "@/components/detail/PostDetail";
import InterceptedDialogContent from "@/components/ui/InterceptedDialogContent";
import { Dialog } from "@/components/ui/dialog";
import { auth } from "@/lib/auth";
import { fetchPost } from "@/lib/fetch";

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const postId = params.id;
  const postData = await fetchPost(postId, session?.user.id);
  return (
    <Dialog open>
      <InterceptedDialogContent className="rounded-lg">
        <div className="max-w-5xl mx-auto h-4/5 w-4/5 relative">
          <PostDetail post={postData} myId={session?.user.id} />
        </div>
      </InterceptedDialogContent>
    </Dialog>
  );
}
