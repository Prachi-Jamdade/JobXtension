"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { 
  BarChart3, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  PieChart, 
  Plus, 
  Search, 
  TrendingUp, 
  UserRound,
  Building2,
  MapPin,
  ArrowUpRight,
  ArrowRight,
  Sparkles
} from "lucide-react";

// Dynamically import components to avoid SSR issues
const ApplicationsChart = dynamic(() => import('./ApplicationsChart'), { ssr: false });
const AnimatedCounter = dynamic(() => import('./AnimatedCounter'), { ssr: false });
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

// Types
type JobApplication = {
  id: number;
  company: string;
  role: string;
  location: string;
  applied_date: string;
  status: string;
  tech_stack?: string[];
};

type JobStats = {
  total: number;
  pending: number;
  interviews: number;
  rejected: number;
  accepted: number;
};

// Mock data for initial rendering
const initialStats: JobStats = {
  total: 0,
  pending: 0,
  interviews: 0,
  rejected: 0,
  accepted: 0
};

const statusColors = {
  "Application Sent": "bg-blue-100 text-blue-800",
  "Under Review": "bg-yellow-100 text-yellow-800",
  "Interview Scheduled": "bg-green-100 text-green-800",
  "Rejected": "bg-red-100 text-red-800",
  "Offer Received": "bg-purple-100 text-purple-800",
};

export default function DashboardHome({ jobs = [] }: { jobs: JobApplication[] }) {
  const { data: session } = useSession();
  const [stats, setStats] = useState<JobStats>(initialStats);
  const [recentJobs, setRecentJobs] = useState<JobApplication[]>([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Animation states
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setAnimate(true), 100);

    if (jobs.length > 0) {
      // Calculate stats
      const newStats = {
        total: jobs.length,
        pending: jobs.filter(job => job.status === "Application Sent" || job.status === "Under Review").length,
        interviews: jobs.filter(job => job.status === "Interview Scheduled").length,
        rejected: jobs.filter(job => job.status === "Rejected").length,
        accepted: jobs.filter(job => job.status === "Offer Received").length
      };
      
      setStats(newStats);
      
      // Get recent applications (sorted by date)
      const sortedJobs = [...jobs].sort((a, b) => 
        new Date(b.applied_date).getTime() - new Date(a.applied_date).getTime()
      );
      
      setRecentJobs(sortedJobs.slice(0, 5));
      
      // Get upcoming interviews
      const interviews = jobs.filter(job => job.status === "Interview Scheduled");
      setUpcomingInterviews(interviews.slice(0, 3));
      
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [jobs]);

  const userName = session?.user?.name || "there";
  const firstName = userName.split(" ")[0];

  return (
    <div className={`transition-all duration-500 ease-in-out ${animate ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {firstName}! <span className="animate-pulse">👋</span>
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your job applications today.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search applications..."
                className="w-[200px] pl-8 rounded-lg bg-background"
              />
            </div>
            <Link href="/dashboard/appliedjobs">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New Application
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8 transition-all duration-500 ease-in-out ${animate ? 'opacity-100' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
        <Card className="overflow-hidden">
          <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <AnimatedCounter value={stats.total} />
            <div className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 5) + 1} this week
            </div>
            <div className="mt-3 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-1 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <AnimatedCounter value={stats.pending} />
            <div className="text-xs text-muted-foreground">
              {stats.pending > 0 ? `${Math.round((stats.pending / stats.total) * 100)}% of applications` : 'No pending applications'}
            </div>
            <div className="mt-3 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-yellow-500 h-1 rounded-full" style={{ width: `${(stats.pending / stats.total) * 100}%` }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <AnimatedCounter value={stats.interviews} />
            <div className="text-xs text-muted-foreground">
              {stats.interviews > 0 ? `${Math.round((stats.interviews / stats.total) * 100)}% success rate` : 'No interviews yet'}
            </div>
            <div className="mt-3 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-green-500 h-1 rounded-full" style={{ width: `${(stats.interviews / stats.total) * 100}%` }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Offers</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <AnimatedCounter value={stats.accepted} />
            <div className="text-xs text-muted-foreground">
              {stats.accepted > 0 ? `${Math.round((stats.accepted / stats.total) * 100)}% conversion rate` : 'No offers yet'}
            </div>
            <div className="mt-3 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-1 rounded-full" style={{ width: `${(stats.accepted / stats.total) * 100}%` }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Applications */}
        <Card className={`col-span-full lg:col-span-4 transition-all duration-500 ease-in-out ${animate ? 'opacity-100' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>
                Your latest job applications and their status
              </CardDescription>
            </div>
            <Link href="/dashboard/appliedjobs">
              <Button variant="outline" size="sm" className="ml-auto">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pb-1">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center p-3 rounded-lg bg-muted/40 animate-pulse h-20"></div>
                ))}
              </div>
            ) : recentJobs.length > 0 ? (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {recentJobs.map((job, index) => (
                    <Link 
                      key={job.id}
                      href={`/dashboard/appliedjobs?id=${job.id}`}
                      className={`group flex flex-col p-4 rounded-lg border hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer block ${
                        animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${300 + index * 100}ms` }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                            {job.company.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-medium group-hover:text-blue-600 transition-colors">{job.role}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Building2 className="mr-1 h-3 w-3" />
                              {job.company}
                              <span className="mx-1">•</span>
                              <MapPin className="mr-1 h-3 w-3" />
                              {job.location}
                            </div>
                          </div>
                        </div>
                        <div>
                          <Badge className={`${
                            job.status === "Interview Scheduled" ? "bg-green-100 text-green-800" :
                            job.status === "Under Review" ? "bg-yellow-100 text-yellow-800" :
                            job.status === "Application Sent" ? "bg-blue-100 text-blue-800" :
                            job.status === "Rejected" ? "bg-red-100 text-red-800" :
                            "bg-purple-100 text-purple-800"
                          }`}>
                            {job.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-sm">
                        <div className="text-muted-foreground">
                          Applied {new Date(job.applied_date).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                          {job.tech_stack && job.tech_stack.slice(0, 3).map((tech, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {job.tech_stack && job.tech_stack.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.tech_stack.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center h-[320px] text-center p-4 border border-dashed rounded-lg">
                <FileText className="h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-1">No applications yet</h3>
                <p className="text-muted-foreground mb-4">Start tracking your job applications</p>
                <Link href="/dashboard/appliedjobs">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Your First Application
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="col-span-full lg:col-span-3 space-y-5">
          {/* Upcoming Interviews */}
          <Card className={`transition-all duration-500 ease-in-out ${animate ? 'opacity-100' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Upcoming Interviews</CardTitle>
                  <CardDescription>
                    Your scheduled interviews
                  </CardDescription>
                </div>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center p-3 rounded-lg bg-muted/40 animate-pulse h-16"></div>
                  ))}
                </div>
              ) : upcomingInterviews.length > 0 ? (
                <div className="space-y-3">
                  {upcomingInterviews.map((interview, index) => (
                    <Link 
                      key={interview.id}
                      href={`/dashboard/appliedjobs?id=${interview.id}`}
                      className={`block p-3 rounded-lg border hover:border-green-200 hover:bg-green-50 dark:hover:bg-green-900/10 transition-all duration-300 ${
                        animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${400 + index * 100}ms` }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{interview.role}</h3>
                          <p className="text-sm text-muted-foreground">{interview.company}</p>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          <Calendar className="mr-1 h-3 w-3" />
                          Today
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[150px] text-center p-4 border border-dashed rounded-lg">
                  <Calendar className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium mb-1">No upcoming interviews</h3>
                  <p className="text-sm text-muted-foreground">
                    When you schedule interviews, they'll appear here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className={`transition-all duration-500 ease-in-out ${animate ? 'opacity-100' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
            <CardHeader className="pb-3">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Link href="/dashboard/appliedjobs" className="w-full">
                <Button variant="outline" className="justify-start h-auto py-3 w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span>Add New Application</span>
                    <span className="text-xs text-muted-foreground">Track a new job application</span>
                  </div>
                </Button>
              </Link>
              
              <Link href="/dashboard/appliedjobs" className="w-full">
                <Button variant="outline" className="justify-start h-auto py-3 w-full">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span>View Applications</span>
                    <span className="text-xs text-muted-foreground">See all your job applications</span>
                  </div>
                </Button>
              </Link>
              
              <Link href="/dashboard/profiles" className="w-full">
                <Button variant="outline" className="justify-start h-auto py-3 w-full">
                  <UserRound className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span>Update Profile</span>
                    <span className="text-xs text-muted-foreground">Edit your profile information</span>
                  </div>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Application Status Chart */}
          <Card className={`transition-all duration-500 ease-in-out ${animate ? 'opacity-100' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '500ms' }}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Application Status</CardTitle>
                  <CardDescription>
                    Distribution of your job applications
                  </CardDescription>
                </div>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              {stats.total > 0 ? (
                <ApplicationsChart 
                  data={{
                    labels: ['Pending', 'Interviews', 'Rejected', 'Offers'],
                    values: [stats.pending, stats.interviews, stats.rejected, stats.accepted],
                    colors: ['#EAB308', '#22C55E', '#EF4444', '#8B5CF6']
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-[150px] text-center">
                  <PieChart className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Add applications to see statistics</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* AI Assistant */}
          <Card className={`bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-100 dark:border-blue-900 transition-all duration-500 ease-in-out ${animate ? 'opacity-100' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-blue-500" />
                AI Job Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Get personalized help with your job search and applications
              </p>
              <div className="space-y-2">
                <Link href="/dashboard/ai-tools/resume-review" className="block">
                  <Button variant="outline" className="w-full justify-between bg-white dark:bg-blue-950/50">
                    Resume Review
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
                
                <Link href="/dashboard/ai-tools/interview-prep" className="block">
                  <Button variant="outline" className="w-full justify-between bg-white dark:bg-blue-950/50">
                    Interview Preparation
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
                
                <Link href="/dashboard/ai-tools/job-match" className="block">
                  <Button variant="outline" className="w-full justify-between bg-white dark:bg-blue-950/50">
                    Job Match Analysis
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}