'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Building2, Calendar, Code2, MapPin } from 'lucide-react'

// This would typically come from an API

const appliedJobs = [
  {
    id: 1,
    company: "TechCorp",
    role: "Senior Frontend Developer",
    location: "Pune, India",
    appliedDate: "2024-02-15",
    status: "Under Review",
    description: "We are looking for a Senior Frontend Developer to join our growing team. The ideal candidate will have strong experience with modern JavaScript frameworks and a passion for building exceptional user experiences.",
    requirements: [
      "5+ years of experience with React",
      "Experience with Next.js and TypeScript",
      "Strong understanding of web performance optimization",
      "Experience with state management (Redux, Context API)",
    ],
    techStack: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"]
  },
  {
    id: 2,
    company: "DataSystems Inc",
    role: "Full Stack Engineer",
    location: "Remote",
    appliedDate: "2024-02-18",
    status: "Interview Scheduled",
    description: "We're seeking a Full Stack Engineer to help build and maintain our cloud-based data analytics platform. You'll work across the entire stack, from database design to frontend implementation.",
    requirements: [
      "3+ years of full-stack development experience",
      "Proficiency in Node.js and React",
      "Experience with SQL and NoSQL databases",
      "Understanding of cloud services (AWS/GCP)",
    ],
    techStack: ["Node.js", "React", "PostgreSQL", "AWS", "Express"]
  },
  {
    id: 3,
    company: "InnovateSoft",
    role: "Backend Developer",
    location: "Bangalore, India",
    appliedDate: "2024-02-20",
    status: "Application Sent",
    description: "Join our backend team to build scalable microservices and APIs that power our enterprise solutions. You'll be working with cutting-edge technologies and solving complex problems.",
    requirements: [
      "4+ years of backend development experience",
      "Strong knowledge of Python and Django",
      "Experience with microservices architecture",
      "Familiarity with container orchestration",
    ],
    techStack: ["Python", "Django", "Docker", "Kubernetes", "Redis"]
  }
]

export default function AppliedJobs() {
  const [selectedJob, setSelectedJob] = useState<typeof appliedJobs[0] | null>(null)

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Applied Jobs</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {appliedJobs.map((job) => (
          <Card
            key={job.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedJob(job)}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{job.role}</span>
                <Badge variant={
                  job.status === "Interview Scheduled"
                    ? "default"
                    : job.status === "Under Review"
                    ? "outline"
                    : "secondary"
                }>
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
                  <span>{new Date(job.appliedDate).toLocaleDateString()}</span>
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Dialog open={selectedJob !== null} onOpenChange={() => setSelectedJob(null)}>
        {selectedJob && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{selectedJob.role}</span>
                <Badge variant={
                  selectedJob.status === "Interview Scheduled"
                    ? "default"
                    : selectedJob.status === "Under Review"
                    ? "outline"
                    : "secondary"
                }>
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
                    <span>Applied on {new Date(selectedJob.appliedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                  <p className="text-muted-foreground">{selectedJob.description}</p>
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
                    {selectedJob.techStack.map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
