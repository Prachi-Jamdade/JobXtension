"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Edit3,
  Globe,
  LayoutDashboard,
  Menu,
  Newspaper,
  Settings,
  FileCode,
  UsersRound,
  UserRoundPen,
  PaintRoller,
  BookOpenText,
  Library,
  ListChecks,
  TvMinimalPlay,
  Videotape,
  NotebookPen,
  Headset,
  BookUser,
  BanknoteIcon,
  ChartCandlestick,
  Activity,
  MessageCircleQuestion,
  History,
  GraduationCap,
  Bookmark,
  FileDigitIcon,
  FilesIcon,
  Route,
  FileBadge2,
  TagIcon,
  BookmarkCheck,
  Group,
  Folder,
  MonitorCheckIcon,
  Bell,
  LogOutIcon,
} from "lucide-react";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
//import { getSiteFromPostId } from "@/lib/actions";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import useNetworkStatus from "@/hooks/use-network-status";
import LogoutButton from "../logout-button";

const externalLinks = [
  {
    name: "Changelogs",
    href: "https://vercel.com/blog/platforms-starter-kit",
    icon: <History width={18} />,
  },
  {
    name: "API Documentation",
    href: `${process.env.NEXT_PUBLIC_BACKEND_URL}/docs`,
    icon: <FileCode width={18} />,
  },
];

export default function Nav({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };

  const { isOnline } = useNetworkStatus();

  const [siteId, setSiteId] = useState<string | null>();

  const tabs = useMemo(() => {
    return [
      {
        name: "Back to Home",
        href: "/",
        icon: <ArrowLeft width={18} />,
      },
      {
        name: "Dashboard",
        href: `/dashboard`,
        isActive: segments.length === 2,
        icon: <Newspaper width={18} />,
      },
      {
        name: "Profiles",
        href: `/dashboard/profiles`,
        isActive: segments.includes("files"),
        icon: <Folder width={18} />,
      },
      {
        name: "Applied Jobs",
        href: `/dashboard/appliedjobs`,
        isActive: segments.includes("courses"),
        icon: <Library width={18} />,
      },
    ];
  }, [segments, id, siteId]);

  const [showSidebar, setShowSidebar] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    // hide sidebar on path change
    setShowSidebar(false);
  }, [pathname]);

  return (
    <>
      <button
        className={`fixed z-20 ${
          // left align for Editor, right align for other pages
          segments[0] === "post" && segments.length === 2 && !showSidebar
            ? "left-5 top-5"
            : "right-5 top-7"
        } sm:hidden`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu width={20} />
      </button>
      <div
        className={`transform ${
          showSidebar ? "w-full translate-x-0" : "-translate-x-full"
        } fixed z-10 flex h-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all dark:border-stone-700 dark:bg-stone-900 sm:w-60 sm:translate-x-0`}
      >
        <div className="grid gap-2">
          <div className="flex items-center justify-left space-x-2 rounded-lg px-2 py-1.5">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-1.5 hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              <svg
                width="26"
                viewBox="0 0 76 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black dark:text-white"
              >
                <path
                  d="M37.5274 0L75.0548 65H0L37.5274 0Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <p>Xtension</p>

            {/* <div className="h-6  rotate-[30deg] border-l border-stone-400 dark:border-stone-500" />
           <LogoutButton/> */}
          </div>
          <div className="grid gap-1">
            <ScrollArea className="">
              {(tabs ?? []).map(({ name, href, isActive, icon }) => (
                <Link
                  key={name}
                  href={href}
                  className={`flex items-center space-x-3 ${
                    isActive ? "bg-stone-200 text-black dark:bg-stone-700" : ""
                  } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}
                >
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
                </Link>
              ))}
            </ScrollArea>
          </div>
        </div>
        <div>
          <div className="grid gap-1">
            {externalLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
              >
                <div className="flex items-center space-x-3">
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <p>↗</p>
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 px-2 py-1.5 text-sm font-medium">
            <span className="flex items-center gap-3">
              <MonitorCheckIcon size={18} />
              System Status
            </span>
            {isOnline ? (
              <p className="ml-2 text-right text-green-700">Online</p>
            ) : (
              <p className="ml-2 text-right text-red-700">Offline</p>
            )}
          </div>
          <div className="my-2 border-t border-stone-200 dark:border-stone-700" />
          {children}
        </div>
      </div>
    </>
  );
}
