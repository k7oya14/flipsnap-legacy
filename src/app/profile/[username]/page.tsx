"use client";

import ProfileInformation from "@/components/profile/ProfileInformation";
import { Profile } from "@/components/profile/profile";
import { Card } from "@/components/ui/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Page = ({ params }: { params: { username: string } }) => {
  const username = params.username;
  const searchParams = useSearchParams();
  const flipCard = Number(searchParams.get("flip"));
  const pathname = usePathname();
  const { replace } = useRouter();
  const param = new URLSearchParams(searchParams);

  const handleFront = (flipId: number) => {
    param.set("flip", flipId.toString());
    replace(`${pathname}?${param.toString()}`, { scroll: false });
  };

  const handleBack = () => {
    param.delete("flip");
    replace(`${pathname}?${param.toString()}`, { scroll: false });
  };
  return (
    <div className="my-2 max-w-5xl mx-auto">
      <Card>
        <ProfileInformation />
        <Profile
          flip={flipCard.toString()}
          handleFront={handleFront}
          handleBack={handleBack}
        />
      </Card>
    </div>
  );
};

export default Page;
