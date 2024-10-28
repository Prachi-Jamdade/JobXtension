"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Linkedin } from "lucide-react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLinkedInLogin = async () => {
    try {
      const result = await signIn("linkedin", { callbackUrl: "/dashboard" });
      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred during sign-in.");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <div className="flex items-center justify-center  bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button onClick={handleLinkedInLogin} className="w-full" size="lg">
            <Linkedin className="mr-2 h-5 w-5" />
            Sign in with LinkedIn
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
