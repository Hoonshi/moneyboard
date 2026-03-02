"use client";
import { useEffect } from "react";
import { ErrorFallbackUI } from "@/components/ui/errorFallbackUI";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("에러터졌어요", error);
  }, [error]);

  return <ErrorFallbackUI error={error} resetErrorBoundary={reset} />;
}
