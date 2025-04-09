"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building2, Calendar, Code2, MapPin } from "lucide-react";
import { updateInterviewDetails } from "@/app/actions/appliedjobs";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AppliedJob = {
  id: number;
  company: string;
  role: string;
  location: string;
  applied_date: string;
  status: string;
  description: string;
  requirements: string[];
  tech_stack: string[];
  interview_date?: string;
  notes?: string;
  documents?: string[];
};

export function AppliedJobsPage({ jobs }: { jobs: AppliedJob[] }) {
  const [selectedJob, setSelectedJob] = useState<AppliedJob | null>(null);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Applied Jobs</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedJob(job)}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{job.role}</span>
                <Badge
                  variant={
                    job.status === "Interview Scheduled"
                      ? "default"
                      : job.status === "Under Review"
                      ? "outline"
                      : "secondary"
                  }
                >
                  {job.status}
                </Badge>
              </CardTitle>
              <CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Building2 className="h-4 w-4" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(job.applied_date).toLocaleDateString() || ""}
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Dialog
        open={selectedJob !== null}
        onOpenChange={() => setSelectedJob(null)}
      >
        {selectedJob && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{selectedJob.role}</span>
                <Badge
                  variant={
                    selectedJob.status === "Interview Scheduled"
                      ? "default"
                      : selectedJob.status === "Under Review"
                      ? "outline"
                      : "secondary"
                  }
                >
                  {selectedJob.status}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-6 p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium">{selectedJob.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Applied on{" "}
                      {new Date(
                        selectedJob.applied_date
                      ).toLocaleDateString() || ""}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Job Description
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedJob.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Code2 className="h-5 w-5" />
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.tech_stack.map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {(selectedJob as any).interview_date ||
                  (selectedJob as any).notes ? (
                    <div className="space-y-2 mb-4 border border-muted rounded-md p-4 bg-muted/30">
                      <h4 className="text-sm font-semibold">
                        Interview Details
                      </h4>
                      {selectedJob.interview_date && (
                        <p>
                          <span className="font-medium">Date:</span>{" "}
                          {new Date(
                            selectedJob.interview_date
                          ).toLocaleString()}
                        </p>
                      )}
                      {selectedJob.notes && (
                        <p>
                          <span className="font-medium">Notes:</span>{" "}
                          {selectedJob.notes}
                        </p>
                      )}
                    </div>
                  ) : null}
                </div>
                <div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Update an interview or add notes.
                    </p>
                    <form
                      className="space-y-4"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.currentTarget;
                        const formData = new FormData(form);
                        const response = await updateInterviewDetails(
                          selectedJob.id,
                          formData.get("interview_date") as string,
                          formData.get("notes") as string,
                          []
                        );
                        if (response.success) {
                          setSelectedJob(response.data);
                          window.location.reload();
                        }
                        console.log(response);

                        form.reset();
                        setSelectedJob(null);
                      }}
                    >
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Status
                        </label>
                        <Select
                          name="status"
                          defaultValue={selectedJob.status}
                          onValueChange={(value: any) => {
                            const hiddenInput =
                              document.querySelector<HTMLInputElement>(
                                'input[name="status"]'
                              );
                            if (hiddenInput) hiddenInput.value = value;
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Application Sent">
                              Application Sent
                            </SelectItem>
                            <SelectItem value="Under Review">
                              Under Review
                            </SelectItem>
                            <SelectItem value="Interview Scheduled">
                              Interview Scheduled
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <input
                          type="hidden"
                          name="status"
                          value={selectedJob.status}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">
                          Interview Date
                        </label>
                        <Input
                          type="datetime-local"
                          name="interview_date"
                          defaultValue=""
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Notes</label>
                        <Textarea name="notes" rows={4} className="mt-1" />
                      </div>
                      <Button type="submit">Save</Button>
                    </form>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
