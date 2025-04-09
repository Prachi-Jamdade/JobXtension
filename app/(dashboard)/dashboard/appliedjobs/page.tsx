import { Suspense } from "react";
import { AppliedJobsPage } from "@/components/jobs/applied-jobs";
import { fetchAppliedJobs } from "@/app/actions/appliedjobs";

export default async function AppliedJobs() {
  const appliedJobs = await fetchAppliedJobs();

  return (
    <Suspense fallback={<div>Loading Applied Jobs...</div>}>
      <AppliedJobsPage  jobs={appliedJobs} />
    </Suspense>
  );
}
