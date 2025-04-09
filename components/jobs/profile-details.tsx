"use client";

import { Session } from "next-auth";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
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
  session?: Session; // optional, only needed for debug mode
}

export function ProfileDetails({ user, session }: Props) {
  return (
    <div className=" mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>

      <Card className="flex flex-col sm:flex-row gap-6 items-start p-6">
        {user.image && (
          <img
            src={user.image}
            alt={user.name || "Profile Picture"}
            className="w-32 h-32 rounded-full object-cover border"
          />
        )}

        <CardContent className="w-full p-0 space-y-3">
          <div>
            <strong className="block text-sm text-gray-500">Name</strong>
            <span className="text-lg font-medium">
              {user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.name || "N/A"}
            </span>
          </div>

          {user.headline && (
            <div>
              <strong className="block text-sm text-gray-500">Headline</strong>
              <span className="text-base">{user.headline}</span>
            </div>
          )}

          <div>
            <strong className="block text-sm text-gray-500">Email</strong>
            <span className="text-base">{user.email || "N/A"}</span>
          </div>

          {user.industry && (
            <div>
              <strong className="block text-sm text-gray-500">Industry</strong>
              <span className="text-base">{user.industry}</span>
            </div>
          )}

          {user.countryCode && (
            <div>
              <strong className="block text-sm text-gray-500">Country</strong>
              <span className="text-base">{user.countryCode}</span>
            </div>
          )}

          {user.vanityName && (
            <div>
              <strong className="block text-sm text-gray-500">LinkedIn</strong>
              <a
                href={`https://www.linkedin.com/in/${user.vanityName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View LinkedIn Profile
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      {process.env.NODE_ENV === "development" && session && (
        <div className="mt-8 bg-gray-100 border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Debug Info</h2>
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
