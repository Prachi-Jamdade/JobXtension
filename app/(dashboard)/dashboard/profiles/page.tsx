// app/profile/page.tsx
import { UserProfile } from "@/components/profiledetails";
import { auth } from "@/lib/auth";
import { Session } from "next-auth";

// Define a type for the extended session
interface ExtendedSession extends Session {
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
}

export default async function ProfilePage() {
  const session = (await auth()) as ExtendedSession | null;

  if (!session?.user) {
    return <div>Please sign in</div>;
  }

  const user = session.user;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="space-y-2">
        <div>
          <strong>Name:</strong>{" "}
          {user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.name || "N/A"}
        </div>

        {user.headline && (
          <div>
            <strong>Headline:</strong> {user.headline}
          </div>
        )}

        <div>
          <strong>Email:</strong> {user.email || "N/A"}
        </div>

        {user.industry && (
          <div>
            <strong>Industry:</strong> {user.industry}
          </div>
        )}

        {user.countryCode && (
          <div>
            <strong>Country:</strong> {user.countryCode}
          </div>
        )}

        {user.vanityName && (
          <div>
            <strong>LinkedIn URL:</strong>{" "}
            <a
              href={`https://www.linkedin.com/in/${user.vanityName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Profile
            </a>
          </div>
        )}

        {user.image && (
          <div>
            <strong>Profile Picture:</strong>
            <img
              src={user.image}
              alt={user.name || "Profile Picture"}
              className="w-24 h-24 rounded-full mt-2"
            />
          </div>
        )}
        
      </div>


      {/* Debug section (optional) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Debug Info:</h2>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
