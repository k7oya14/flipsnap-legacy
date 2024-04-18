import DetailPost from "@/components/detail/DetailPost";
import DetailLoading from "@/components/skeleton/DetailLoading";
import React, { Suspense } from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<DetailLoading />}>
      <DetailPost postId={params.id} />
    </Suspense>
  );
};

export default Page;
