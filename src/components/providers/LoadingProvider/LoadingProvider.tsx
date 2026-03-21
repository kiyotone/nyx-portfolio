"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/organisms/LoadingScreen";

interface LoadingContextType {
  isLoading: boolean;
  progress: number;
  message: string;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
  setProgress: (progress: number) => void;
  setMessage: (message: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true); // true on first mount for boot sequence
  const [progress, setProgressState] = useState(0);
  const [message, setMessageState] = useState("INITIALIZING SYSTEM");

  const startLoading = useCallback((msg = "Loading...") => {
    setIsLoading(true);
    setMessageState(msg);
    setProgressState(0);
  }, []);

  // Single source of truth — both the context consumer and
  // LoadingScreen's own onComplete both call this to dismiss.
  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setProgressState(0);
  }, []);

  const setProgress = useCallback((prog: number) => {
    setProgressState(Math.min(100, Math.max(0, prog)));
  }, []);

  const setMessage = useCallback((msg: string) => {
    setMessageState(msg);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        progress,
        message,
        startLoading,
        stopLoading,
        setProgress,
        setMessage,
      }}
    >
      {/* Render children immediately so they hydrate behind the overlay */}
      {children}

      {/* AnimatePresence lets LoadingScreen fade out on exit */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen key="loading-screen" message={message} onComplete={stopLoading} />
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}
