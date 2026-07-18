import { notifyBus, type NotifyOption, type NotifyType } from "./notifyCore";

function push(type: NotifyType, message: string, options: NotifyOption = {}) {
  return notifyBus.emit({
    type,
    message,
    options,
  });
}

export const notify = {
  success(message: string, options?: NotifyOption) {
    return push("success", message, options);
  },
  error(message: string, options?: NotifyOption) {
    return push("error", message, options);
  },
  info(message: string, options?: NotifyOption) {
    return push("info", message, options);
  },
};
