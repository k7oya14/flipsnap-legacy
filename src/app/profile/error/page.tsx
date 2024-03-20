import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const ProfileError = () => {
  return (
    <Card className="m-4 shadow">
      <CardContent className="flex flex-col items-center justify-center m-6">
        <ExclamationTriangleIcon className="text-yellow-300 w-12 h-12 mb-4" />
        <h1 className="text-center text-2xl font-bold mb-4">
          関連付けられたメールアドレスでログインしてください
        </h1>
        <h1 className="text-center mb-4">
          You need to be logged in the account associated with Email to access
          this page
        </h1>
        <Link href="/api/auth/signin">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            Sign in
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProfileError;
