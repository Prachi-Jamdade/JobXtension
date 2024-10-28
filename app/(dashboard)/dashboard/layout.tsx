import "@/styles/dashboard.css";
import { ReactNode, Suspense } from "react";
import Profile from "@/components/profile";
import Nav from "@/components/navigation/nav";
import { Providers } from "@/app/provider";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  
  return (
    <div>
      <Nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      </Nav>
      <div className="min-h-screen sm:pl-60 dark:bg-black">
        <Providers>{children}</Providers>
        <Toaster />
      </div>
    </div>
  );
}
