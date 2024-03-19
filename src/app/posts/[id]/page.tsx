import { PostModal } from "@/components/post-modal";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const page = () => {
  return (
    <Card className="max-w-5xl mx-auto my-4">
      <CardContent>
        <PostModal alt="" src="https://source.unsplash.com/random/" />
      </CardContent>
    </Card>
  );
};

export default page;
