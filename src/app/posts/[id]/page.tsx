import { PostModal } from "@/components/post-modal";
import { Card, CardContent } from "@/components/ui/card";
import { fetchLatestPosts } from "@/lib/fetch";
import { useCursorId } from "@/lib/utils";
import React from "react";

const Page = async () => {
  const data = await fetchLatestPosts({ take: 2, myId: null });
  console.log(data);

  return (
    <Card className="max-w-5xl mx-auto my-4">
      <CardContent>
        <div className="max-w-5xl mx-auto relative">
          <PostModal alt="" src="https://source.unsplash.com/random/" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
