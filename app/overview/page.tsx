"use client";

import { useEffect, useState } from "react";
import { account } from "@/app/appwrite";
import { Text } from "@/components/text";

export default function Overview() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await account.get();
        setUserName(user.name);
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };
    fetchUserName();
  }, []);

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="mb-6 text-4xl font-bold leading-tight text-zinc-900 dark:text-white">
        Welcome, {userName}!
      </h1>
      <Text className="mb-8 max-w-md text-xl text-zinc-700 dark:text-zinc-300">
        This is your overview page. You can start using RankFlow&apos;s features
        now.
      </Text>
    </div>
  );
}
