import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "@/components/logout-button";
import { auth } from "@/lib/auth"; // Ensure this is your authentication method

export default async function Profile() {
  const session = await auth(); // Fetch the session from your auth method
  if (!session?.user) {
    redirect("/login"); // Redirect to login if no user session is found
  }

  return (
    <div className="flex w-full items-center justify-between">
      <Link
        href="/settings"
        className="flex w-full flex-1 items-center space-x-3 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
      >
        <Image
          src={
            session.user.image ??
            `https://avatar.vercel.sh/${session.user.email}` // Use the image from session or fallback
          }
          width={40}
          height={40}
          alt={session.user.name ?? "User avatar"} // Fallback alt text
          className="h-10 w-10 rounded-full" // Adjust size for visibility
        />
        <span className="truncate text-sm font-medium">
          {session.user.name} // Display user's name
        </span>
      </Link>
      <LogoutButton /> // Button to log out the user
    </div>
  );
}
