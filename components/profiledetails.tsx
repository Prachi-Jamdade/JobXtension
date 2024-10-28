// components/UserProfile.tsx
import { Session } from "next-auth";

interface UserProfileProps {
  user: Session["user"];
  className?: string;
}

export function UserProfile({ user, className = "" }: UserProfileProps) {
  if (!user) return null;

  const profileFields = [
    {
      label: "Name",
      value:
        user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.name,
    },
    { label: "Email", value: user.email },
    { label: "Headline", value: user.headline },
    { label: "Industry", value: user.industry },
    { label: "Country", value: user.countryCode },
  ].filter((field) => field.value);

  return (
    <div className={`space-y-4 ${className}`}>
      {user.image && (
        <div className="flex justify-center">
          <img
            src={user.image}
            alt={user.name || "Profile Picture"}
            className="w-24 h-24 rounded-full"
          />
        </div>
      )}

      <div className="space-y-2">
        {profileFields.map(({ label, value }) => (
          <div key={label} className="flex justify-between">
            <strong>{label}:</strong>
            <span>{value}</span>
          </div>
        ))}

        {user.vanityName && (
          <div className="text-center mt-4">
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
      </div>
    </div>
  );
}
