import ErrorCard from "@/components/ErrorCard";
import React from "react";

const ProfileError = () => {
  return (
    <ErrorCard
      heading="ログインが必要です"
      message="You need to be logged in to access this page."
      button="Login"
      link="/api/auth/signin"
    />
  );
};

export default ProfileError;
