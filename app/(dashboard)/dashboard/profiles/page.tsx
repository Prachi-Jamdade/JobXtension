import { auth } from "@/lib/auth";
import { Session } from "next-auth";
import { ProfileDetails } from "@/components/jobs/profile-details";
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
    return (
      <div className="p-6 text-center text-gray-600">
        Please sign in to view your profile.
      </div>
    );
  }

  return <ProfileDetails user={session.user} session={session} />;
}
