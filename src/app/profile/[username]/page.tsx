import Profile from "@/components/profile/Profile";
import ProfileGallerySkeleton from "@/components/skeleton/ProfileGallerySkeleton";
import ProfileInformationSkeleton from "@/components/skeleton/ProfileInformationSkeleton";
import { Card } from "@/components/ui/card";
import React, { Suspense } from "react";

const Page = async ({ params }: { params: { username: string } }) => {
  return (
    <div className="my-1 sm:my-2 max-w-5xl mx-auto">
      <Card className="min-h-screen">
        <Suspense fallback={<><ProfileInformationSkeleton/><ProfileGallerySkeleton /></>}>
          <Profile username={params.username} />
        </Suspense>
      </Card>
    </div>
  );
};

export default Page;
