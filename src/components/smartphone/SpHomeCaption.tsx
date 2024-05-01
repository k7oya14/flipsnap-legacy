"use client";

import React, { useState } from "react";

const SpHomeCaption = ({ caption }: { caption: string }) => {
  const [fullCaption, setFullCaption] = useState(false);
  return (
    <p
      className={`${fullCaption ? "" : "truncate"} hover:cursor-pointer`}
      onClick={() => setFullCaption(true)}
    >
      {caption}
    </p>
  );
};

export default SpHomeCaption;
