"use client";

import { Profile } from "@/components/profile/profile";
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
    <div className="my-2">
      <Profile
        flip={flipCard.toString()}
        handleFront={handleFront}
        handleBack={handleBack}
      />
    </div>
  );
};

export default Page;
