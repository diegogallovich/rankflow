import { Text } from "../components/text";
import { Button } from "../components/button";
import Image from "next/image";
import {
  LockClosedIcon,
  FolderIcon,
  ChartBarIcon,
} from "@heroicons/react/20/solid";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="mb-6 text-6xl font-bold leading-tight text-zinc-900 dark:text-white">
        Welcome to RankFlow.
        <br />
        Your AI Copilot for Webflow.
      </h1>
      <Text className="mb-8 max-w-md text-xl text-zinc-700 dark:text-zinc-300">
        RankFlow connects with your Webflow CMS to give you AI superpowers that
        will help your content rank higher in search engine results.
      </Text>
      <div className="mb-8 w-full max-w-3xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <LockClosedIcon className="mb-4 h-8 w-8 text-blue-500" />
            <Text className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
              Step 1:
            </Text>
            <Text className="text-sm">
              Log in with Webflow & Connect your site
            </Text>
          </div>
          <div className="flex flex-col items-center text-center">
            <FolderIcon className="mb-4 h-8 w-8 text-blue-500" />
            <Text className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
              Step 2:
            </Text>
            <Text className="text-sm">Choose a collection to sync</Text>
          </div>
          <div className="flex flex-col items-center text-center">
            <ChartBarIcon className="mb-4 h-8 w-8 text-blue-500" />
            <Text className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
              Step 3:
            </Text>
            <Text className="text-sm">
              Create or edit enhanced content & start ranking higher
            </Text>
          </div>
        </div>
      </div>
      <Button
        href="/api/auth/webflow"
        className="flex items-center gap-2 px-6 py-3 text-lg font-semibold transition-colors duration-200"
        color="blue"
      >
        <Image
          src="/icons/icon-webflow.svg"
          alt="Webflow logo"
          width={20}
          height={12}
        />
        Connect your first collection for free
      </Button>
    </div>
  );
}
