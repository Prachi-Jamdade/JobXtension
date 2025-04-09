"use server";

import { auth } from "@/lib/auth";
import jwt from "jsonwebtoken";
import { Suspense } from "react";
import ClientComponent from '@/components/loginsuccesstoast'; // Import the client-side component

export default async function Overview() {
  const session = await auth();
  const token = jwt.sign(
    session?.user as any,
    process.env.AUTH_SECRET as string
  );
  console.log(token);

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      {/* <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Overview
        </h1>
        <ul>
          <li>[ ] Total Courses</li>
          <li>[ ] Total Visitors</li>
          <li>[ ] Total Payment Pages</li>
          <li>[ ] Total Users</li>
        </ul>
      </div> */}

      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
          Overview
          </h1>
          <Suspense fallback={null}>
            {/* <OverviewSitesCTA /> */}
          </Suspense>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* {Array.from({ length: 4 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))} */}
              xcxxz
            </div>
          }
        >
          {/* <LMSGrid data={sites} /> */}
        </Suspense>
      </div>

      {/* Include the client-side logic for handling toast and search params */}
      <ClientComponent />
    </div>
  );
}
