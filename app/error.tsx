"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "../components/button";
import { Text } from "../components/text";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-50">
      <h1 className="mb-4 text-3xl font-bold text-red-600">
        Something went wrong!
      </h1>
      <Text className="mb-4 text-red-800">{error.message}</Text>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
