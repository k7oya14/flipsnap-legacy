import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const SignIn = () => {
  return (
    <div className="m-4 flex items-center justify-center">
      <div className="w-96">
        <div className="rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200 dark:border-gray-700">
          <div className="space-y-2 text-center flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">FlipSnap</h1>
            <Image
              src="/logo.png"
              alt="FlipSnap"
              width={100}
              height={100}
              className="sm:w-[75px] sm:h-[75px]"
            />
          </div>
          <div className="space-y-4">
            <Button className="group w-full bg-neutral-50 hover:bg-neutral-100 ring-1 ring-neutral-500 text-black">
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              <div className="flex items-center justify-center mx-2">
                Login with Google
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
