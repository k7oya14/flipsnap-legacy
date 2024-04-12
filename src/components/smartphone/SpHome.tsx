import React from "react";
import SpHomeLoadMore from "./SpHomeLoadMore";
import { fetchLatestPostsSpComponent } from "@/lib/fetchWrapper";

type Props = {
  myId: string | undefined;
};

const SpHome = async (props: Props) => {
  const { myId } = props;
  const { component, cursorId } = await fetchLatestPostsSpComponent(12, myId);
  return (
    <div>
      {component}
      <SpHomeLoadMore cursorId={cursorId} />
    </div>
  );
};

export default SpHome;
