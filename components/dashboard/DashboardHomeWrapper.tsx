"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the dashboard component to avoid hydration issues
const DashboardHome = dynamic(() => import('./DashboardHome'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[70vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 border-b-blue-700 border-l-blue-600 border-r-blue-400 animate-spin"></div>
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    </div>
  ),
});

export default function DashboardHomeWrapper({ jobs }: { jobs: any[] }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardHome jobs={jobs} />
    </Suspense>
  );
}