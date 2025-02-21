// components/AnalyticsDashboard.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AnalyticsDashboard() {
  return (
    <div className="p-6">
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://via.placeholder.com/100" // Replace with actual profile image URL
          alt="Profile"
          className="w-16 h-16 rounded-full mb-2"
        />
        <h1 className="text-xl font-semibold">Analytics & Tools</h1>
        <p className="text-sm text-gray-500">Monday, October 28</p>
      </div>

      <Card className="bg-gray-50 dark:bg-gray-900 shadow-md rounded-lg p-4 mb-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Analytics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded-md bg-white dark:bg-stone-800 shadow">
            <h2 className="text-2xl font-bold">13</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Post impressions
            </p>
            <p className="text-xs text-red-500">▼ 59.4% past 7 days</p>
          </div>
          <div className="p-4 border rounded-md bg-white dark:bg-stone-800 shadow">
            <h2 className="text-2xl font-bold">461</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Followers
            </p>
            <p className="text-xs text-green-500">▲ 2% past 7 days</p>
          </div>
          <div className="p-4 border rounded-md bg-white dark:bg-stone-800 shadow">
            <h2 className="text-2xl font-bold">63</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Profile viewers
            </p>
            <p className="text-xs">Past 90 days</p>
          </div>
          <div className="p-4 border rounded-md bg-white dark:bg-stone-800 shadow">
            <h2 className="text-2xl font-bold">32</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Search appearances
            </p>
            <p className="text-xs">Previous week</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
