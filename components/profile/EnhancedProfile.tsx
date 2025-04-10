"use client";

import { useState, useEffect } from "react";
import { Session } from "next-auth";
import { 
  User, 
  Mail, 
  Briefcase, 
  MapPin, 
  Globe, 
  Linkedin, 
  Edit, 
  CheckCircle, 
  Award,
  GraduationCap,
  Calendar,
  FileText,
  Download,
  Share2,
  Settings,
  PlusCircle
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileProps {
  user: {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
    firstName?: string;
    lastName?: string;
    headline?: string;
    countryCode?: string;
    industry?: string;
    vanityName?: string;
  };
  session?: Session;
}

export default function EnhancedProfile({ user, session }: ProfileProps) {
  const [animate, setAnimate] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [profileCompletion, setProfileCompletion] = useState(0);

  // Calculate profile completion percentage
  useEffect(() => {
    let completedFields = 0;
    const totalFields = 8; // Total number of possible profile fields
    
    if (user.name || (user.firstName && user.lastName)) completedFields++;
    if (user.email) completedFields++;
    if (user.image) completedFields++;
    if (user.headline) completedFields++;
    if (user.industry) completedFields++;
    if (user.countryCode) completedFields++;
    if (user.vanityName) completedFields++;
    
    // Add one more field for skills (mock data)
    completedFields++;
    
    const percentage = Math.round((completedFields / totalFields) * 100);
    
    // Animate the progress bar
    const timer = setTimeout(() => {
      setProfileCompletion(percentage);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [user]);

  // Trigger animations after component mounts
  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  // Mock data for skills and education
  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "TypeScript", level: 75 },
    { name: "Node.js", level: 80 },
    { name: "CSS/SCSS", level: 85 }
  ];

  const education = [
    {
      degree: "Master of Computer Science",
      school: "Stanford University",
      year: "2018 - 2020"
    },
    {
      degree: "Bachelor of Engineering",
      school: "MIT",
      year: "2014 - 2018"
    }
  ];

  const experience = [
    {
      title: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      period: "2020 - Present",
      description: "Leading frontend development team, implementing new features and optimizing performance."
    },
    {
      title: "Software Developer",
      company: "Digital Innovations",
      period: "2018 - 2020",
      description: "Developed responsive web applications using React and Node.js."
    }
  ];

  const fullName = user.firstName && user.lastName
    ? `${user.firstName} ${user.lastName}`
    : user.name || "Anonymous User";

  const initials = fullName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className={`space-y-6 transition-all duration-500 ease-in-out ${animate ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
      {/* Profile Header */}
      <div className="relative">
        {/* Cover Photo */}
        <div className="h-48 w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20"></div>
        </div>
        
        {/* Profile Info Card */}
        <Card className="relative mx-auto -mt-24 max-w-4xl shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                  <AvatarImage src={user.image || ""} alt={fullName} />
                  <AvatarFallback className="text-3xl bg-blue-100 text-blue-800">{initials}</AvatarFallback>
                </Avatar>
                
                <div className="mt-4 flex flex-col items-center">
                  <div className="text-sm text-muted-foreground">Profile Completion</div>
                  <Progress value={profileCompletion} className="h-2 w-32 mt-1" />
                  <div className="text-xs mt-1">{profileCompletion}%</div>
                </div>
              </div>
              
              {/* Profile Details */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h1 className="text-2xl font-bold">{fullName}</h1>
                    {user.headline && (
                      <p className="text-muted-foreground">{user.headline}</p>
                    )}
                  </div>
                  
                  <Button className="self-start" size="sm">
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user.email || "No email provided"}</span>
                    </div>
                    
                    {user.industry && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span>{user.industry}</span>
                      </div>
                    )}
                    
                    {user.countryCode && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{user.countryCode}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {user.vanityName && (
                      <div className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`https://www.linkedin.com/in/${user.vanityName}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span>English, Spanish</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Member since {new Date().getFullYear()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">UI/UX</Badge>
                  <Badge variant="secondary">+3 more</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Profile Content */}
      <Tabs defaultValue="overview" className="max-w-4xl mx-auto" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {user.headline || "No bio provided. Add a professional summary to help employers learn more about you."}
              </p>
              
              {!user.headline && (
                <Button variant="outline" className="mt-4" size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Bio
                </Button>
              )}
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {experience.length > 0 ? (
                  <div className="space-y-4">
                    {experience.slice(0, 1).map((exp, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{exp.title}</h3>
                          <span className="text-sm text-muted-foreground">{exp.period}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                        <p className="text-sm">{exp.description}</p>
                      </div>
                    ))}
                    
                    {experience.length > 1 && (
                      <Button variant="link" className="px-0" onClick={() => setActiveTab("experience")}>
                        View all experience
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-2">No experience added yet</p>
                    <Button variant="outline" size="sm">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {education.length > 0 ? (
                  <div className="space-y-4">
                    {education.slice(0, 1).map((edu, index) => (
                      <div key={index} className="space-y-1">
                        <h3 className="font-medium">{edu.degree}</h3>
                        <p className="text-sm">{edu.school}</p>
                        <p className="text-sm text-muted-foreground">{edu.year}</p>
                      </div>
                    ))}
                    
                    {education.length > 1 && (
                      <Button variant="link" className="px-0" onClick={() => setActiveTab("education")}>
                        View all education
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-2">No education added yet</p>
                    <Button variant="outline" size="sm">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Education
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.slice(0, 4).map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
              
              {skills.length > 4 && (
                <Button variant="link" className="mt-4" onClick={() => setActiveTab("skills")}>
                  View all skills
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="experience" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Work Experience</CardTitle>
              <Button size="sm">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div key={index} className="relative pl-6 pb-6 border-l border-muted last:border-0 last:pb-0">
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500"></div>
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <h3 className="font-semibold text-lg">{exp.title}</h3>
                        <Badge variant="outline" className="sm:ml-2 self-start sm:self-auto mt-1 sm:mt-0">
                          {exp.period}
                        </Badge>
                      </div>
                      <p className="font-medium text-muted-foreground">{exp.company}</p>
                      <p>{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Certifications</CardTitle>
              <Button size="sm">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Certification
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Award className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No certifications yet</h3>
                <p className="text-muted-foreground max-w-md">
                  Add your professional certifications to showcase your specialized knowledge and skills.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="education" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Education</CardTitle>
              <Button size="sm">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Education
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-6 pb-6 border-l border-muted last:border-0 last:pb-0">
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500"></div>
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <h3 className="font-semibold text-lg">{edu.degree}</h3>
                        <Badge variant="outline" className="sm:ml-2 self-start sm:self-auto mt-1 sm:mt-0">
                          {edu.year}
                        </Badge>
                      </div>
                      <p className="font-medium text-muted-foreground">{edu.school}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Courses</CardTitle>
              <Button size="sm">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Course
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No courses yet</h3>
                <p className="text-muted-foreground max-w-md">
                  Add relevant courses you've completed to highlight your continuous learning.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Technical Skills</CardTitle>
              <Button size="sm">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Soft Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge className="px-3 py-1">Communication</Badge>
                <Badge className="px-3 py-1">Problem Solving</Badge>
                <Badge className="px-3 py-1">Teamwork</Badge>
                <Badge className="px-3 py-1">Leadership</Badge>
                <Badge className="px-3 py-1">Time Management</Badge>
                <Badge className="px-3 py-1">Adaptability</Badge>
                <Badge className="px-3 py-1">Critical Thinking</Badge>
                <Badge className="px-3 py-1">Creativity</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">English</h3>
                    <p className="text-sm text-muted-foreground">Professional working proficiency</p>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div 
                        key={i} 
                        className={`w-3 h-3 rounded-full mx-0.5 ${
                          i <= 4 ? "bg-blue-500" : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Spanish</h3>
                    <p className="text-sm text-muted-foreground">Elementary proficiency</p>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div 
                        key={i} 
                        className={`w-3 h-3 rounded-full mx-0.5 ${
                          i <= 2 ? "bg-blue-500" : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Action Buttons */}
      <div className="flex justify-center gap-4 max-w-4xl mx-auto">
        <Button variant="outline" className="flex-1 sm:flex-none">
          <Download className="mr-2 h-4 w-4" /> Download Resume
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-none">
          <Share2 className="mr-2 h-4 w-4" /> Share Profile
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-none">
          <Settings className="mr-2 h-4 w-4" /> Account Settings
        </Button>
      </div>
      
      {/* Debug Info */}
      {process.env.NODE_ENV === "development" && session && (
        <div className="mt-8 bg-gray-100 border rounded-lg p-4 max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold mb-2">Debug Info</h2>
          <pre className="text-sm whitespace-pre-wrap overflow-auto max-h-96">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}