"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function ClientComponent() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    // Get the loginSuccess query parameter
    const loginSuccess = searchParams.get("loginSuccess");

    // Show toast if login was successful
    if (loginSuccess === "true") {
      toast({
        title: "Success",
        description: "Login Successful! Welcome!",
      });
    }
  }, [searchParams]);

  return null; // No UI needed, just toast logic
}
