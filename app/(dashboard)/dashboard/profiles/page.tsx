import { auth } from "@/lib/auth";
import { Session } from "next-auth";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Import the enhanced profile component with dynamic loading to avoid hydration issues
const EnhancedProfile = dynamic(() => import("@/components/profile/EnhancedProfile"), {
  ssr: false,
  loading: () => <ProfileLoading />
});

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

// Loading component for the profile
function ProfileLoading() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 border-b-blue-700 border-l-blue-600 border-r-blue-400 animate-spin"></div>
        <p className="text-muted-foreground">Loading your profile...</p>
      </div>
    </div>
  );
}

export default async function ProfilePage() {
  const session = (await auth()) as ExtendedSession | null;

  if (!session?.user) {
    return (
      <div className="p-6 text-center text-gray-600 min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
          <p>Please sign in to view and manage your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <Suspense fallback={<ProfileLoading />}>
        <EnhancedProfile user={session.user} session={session} />
      </Suspense>
    </div>
  );
}
