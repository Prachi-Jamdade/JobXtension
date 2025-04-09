require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const appliedJobs = [
  {
    company: "TechCorp",
    role: "Senior Frontend Developer",
    location: "Pune, India",
    appliedDate: "2024-02-15",
    status: "Under Review",
    description:
      "We are looking for a Senior Frontend Developer to join our growing team...",
    requirements: [
      "5+ years of experience with React",
      "Experience with Next.js and TypeScript",
      "Strong understanding of web performance optimization",
      "Experience with state management (Redux, Context API)",
    ],
    techStack: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
  },
  {
    company: "DataSystems Inc",
    role: "Full Stack Engineer",
    location: "Remote",
    appliedDate: "2024-02-18",
    status: "Interview Scheduled",
    description:
      "We're seeking a Full Stack Engineer to help build and maintain our cloud-based data analytics platform. You'll work across the entire stack, from database design to frontend implementation.",
    requirements: [
      "3+ years of full-stack development experience",
      "Proficiency in Node.js and React",
      "Experience with SQL and NoSQL databases",
      "Understanding of cloud services (AWS/GCP)",
    ],
    techStack: ["Node.js", "React", "PostgreSQL", "AWS", "Express"],
  },
  {
    company: "InnovateSoft",
    role: "Backend Developer",
    location: "Bangalore, India",
    appliedDate: "2024-02-20",
    status: "Application Sent",
    description:
      "Join our backend team to build scalable microservices and APIs that power our enterprise solutions. You'll be working with cutting-edge technologies and solving complex problems.",
    requirements: [
      "4+ years of backend development experience",
      "Strong knowledge of Python and Django",
      "Experience with microservices architecture",
      "Familiarity with container orchestration",
    ],
    techStack: ["Python", "Django", "Docker", "Kubernetes", "Redis"],
  },
];

async function seed() {
  for (const job of appliedJobs) {
    await pool.query(
      `INSERT INTO applied_jobs (company, role, location, applied_date, status, description, requirements, tech_stack)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        job.company,
        job.role,
        job.location,
        job.appliedDate,
        job.status,
        job.description,
        job.requirements,
        job.techStack,
      ]
    );
  }

  console.log("✅ Seeded jobs into DB");
  pool.end();
}

seed().catch((err) => {
  console.error(err);
  pool.end();
});
