"use client";

import { useEffect, useState } from "react";
import { notifyBus, type NotifyItem } from "./notifyCore";
import NotifyItemView from "./NotifyItemView";

import "./notify.css";

type NotifyProviderProps = {
  defaultDuration?: number;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
};

export function NotifyProvider({
  defaultDuration = 3000,
  position = "top-center",
}: NotifyProviderProps) {
  const [toasts, setToasts] = useState<NotifyItem[]>([]);

  useEffect(() => {
    const unsubscribe = notifyBus.subscribe((toast) => {
      setToasts((prev) => [...prev, toast]);

      const duration = toast.options?.duration ?? defaultDuration;
      if (duration > 0) {
        setTimeout(() => {
          setToasts((current) => current.filter((t) => t.id !== toast.id));
        }, duration);
      }
    });

    return unsubscribe;
  }, [defaultDuration]);

  function removeToast(id: string) {
    setToasts((current) => current.filter((t) => t.id !== id));
  }

  if (toasts.length === 0) return null;

  const positionClass = `notify-container ${position}`;

  return (
    <div className={positionClass}>
      {toasts.map((toast) => (
        <NotifyItemView key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>
  );
}
