"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function usePageLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Use startTransition to avoid cascading renders warning
    const timer = setTimeout(() => {
      startTransition(() => {
        setIsLoading(true);
      });
    }, 0);

    const hideTimer = setTimeout(() => {
      startTransition(() => {
        setIsLoading(false);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [pathname, searchParams]);

  return isLoading || isPending;
}
