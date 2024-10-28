"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden  items-center justify-center p-6 gap-8 bg-gray-900 text-white relative">
      <div className="z-10 max-w-5xl w-full flex-col space-y-8 items-center justify-center font-mono text-sm lg:flex">
        <h1 className="text-3xl mx-auto text-center">Welcome to our</h1>

        <div className="relative flex items-center justify-center">
          <h1 className="text-5xl uppercase text-white font-bold">
            Job Xtension
          </h1>
          <div className="absolute inset-0 -z-10 before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-400 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]" />
        </div>

        <Button asChild className="bg-white text-black   hover:text-white mt-8">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
}
