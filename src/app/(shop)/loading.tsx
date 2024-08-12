"use client";

import { Loader } from "@/components";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen">
      <div className="fixed top-0 left-0 bg-white w-screen h-screen" />
      <Loader />
    </div>
  );
}