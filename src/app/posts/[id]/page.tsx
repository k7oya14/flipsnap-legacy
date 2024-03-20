import { PostModal } from "@/components/detail/post-modal";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const Page = async () => {
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
