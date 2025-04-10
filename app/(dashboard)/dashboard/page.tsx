"use server";

import { auth } from "@/lib/auth";
import { Suspense } from "react";
import ClientComponent from '@/components/loginsuccesstoast';
import { fetchAppliedJobs } from "@/app/actions/appliedjobs";
import DashboardHomeWrapper from "@/components/dashboard/DashboardHomeWrapper";

export default async function Overview() {
  const session = await auth();
  const appliedJobs = await fetchAppliedJobs();

  return (
    <div className="flex max-w-screen-xl flex-col space-y-6 p-6">
      <Suspense fallback={
        <div className="w-full h-[500px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 border-b-blue-700 border-l-blue-600 border-r-blue-400 animate-spin"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      }>
        <DashboardHomeWrapper jobs={appliedJobs} />
      </Suspense>
      
      {/* Include the client-side logic for handling toast and search params */}
      <ClientComponent />
    </div>
  );
}
