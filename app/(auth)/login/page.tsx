"use client";

import LoginForm from "@/components/loginform";
import { fontMapper } from "@/styles/fonts";

export default function LoginPage() {
  const calFont = fontMapper["font-cal"];

  return (
    <div className=" flex items-center overflow-hidden justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white dark:bg-stone-900 px-6 py-8 shadow sm:rounded-lg sm:px-10 border border-stone-200 dark:border-stone-700">
          <h1
            className={`${calFont} text-center text-3xl font-semibold mb-6 dark:text-white`}
          >
            Login
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
