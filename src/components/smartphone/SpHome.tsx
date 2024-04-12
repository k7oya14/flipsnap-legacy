import React from "react";
import SpHomeLoadMore from "./SpHomeLoadMore";
import { auth } from "@/lib/auth";
import { fetchLatestPostsSpComponent } from "@/lib/fetchWrapper";

const SpHome = async () => {
  const session = await auth();
  const { component, cursorId } = await fetchLatestPostsSpComponent(
    12,
    session?.user.id
  );
  return (
    <div>
      {component}
      <SpHomeLoadMore cursorId={cursorId} />
    </div>
  );
};

export default SpHome;
