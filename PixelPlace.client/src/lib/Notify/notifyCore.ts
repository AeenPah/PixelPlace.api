export type NotifyType = "success" | "error" | "info";

export type NotifyOption = {
  duration?: number;
  actions?: { value: string; actionFn: () => void }[];
};

export type NotifyItem = {
  id: string;
  type: NotifyType;
  message: string;
  options?: NotifyOption;
};

type Listener = (toast: NotifyItem) => void;

const listeners = new Set<Listener>();

export const notifyBus = {
  subscribe(listener: Listener) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },

  emit(toast: Omit<NotifyItem, "id">) {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const fullToast: NotifyItem = { id, ...toast };

    listeners.forEach((listener) => listener(fullToast));
    return id;
  },
};
