import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "@/components/logout-button";
import { auth } from "@/lib/auth"; // Ensure this is your authentication method

export default async function ProfileImage() {
  const session = await auth(); // Fetch the session from your auth method
  if (!session?.user) {
    redirect("/login"); // Redirect to login if no user session is found
  }

  return (
    <div className="flex w-full items-center justify-between">

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


    </div>
  );
}
