import React, { Suspense } from "react";

import HomeLoading from "@/components/skeleton/HomeLoading";
import Home from "@/components/home/Home";

export default async function Page() {
  return (
    <Suspense fallback={<HomeLoading />}>
      <Home />
    </Suspense>
  );
}
