import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const ProfileError = () => {
  return (
    <Card className="m-4 p-4 w-96 mx-auto shadow-lg">
      <CardContent className="flex flex-col items-center justify-center mt-6">
        <ExclamationTriangleIcon className="text-yellow-300 w-12 h-12 mb-4" />
        <h1 className="text-center text-2xl font-bold">ログインが必要です</h1>
        <h1 className="text-center my-4">
          You need to be logged in to access this page.
        </h1>
        <Link href="/api/auth/signin">
          <Button className="text-white rounded-lg">Login</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProfileError;
