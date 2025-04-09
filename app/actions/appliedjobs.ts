"use server";

import { pool } from "@/lib/db";

export async function fetchAppliedJobs() {
  const { rows } = await pool.query("SELECT * FROM applied_jobs");
  return rows;
}

export async function updateInterviewDetails(
  id: number,
  interviewDate: string,
  notes?: string,
  documents?: string[],
  status?: string
) {
  const { rows } = await pool.query(
    `UPDATE applied_jobs
     SET interview_date = $1, notes = $2, documents = $3,
   status = $4
     WHERE id = $5
     RETURNING *`,
    [
      interviewDate,
      notes ?? null,
      documents ?? null,
      status ?? "Application Sent",
      id,
    ]
  );

  return { success: true, data: rows[0] };
}
