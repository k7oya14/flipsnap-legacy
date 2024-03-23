import React from "react";

const Loading = () => {
  return (
    <div
      className="min-h-screen items-center flex justify-center"
      aria-label="Loading..."
    >
      <div className="animate-spin h-16 w-16 border-4 border-slate-200 rounded-full border-t-transparent"></div>
    </div>
  );
};

export default Loading;
