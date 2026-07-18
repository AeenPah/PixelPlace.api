import type { NotifyItem } from "./notifyCore";

type NotifyItemViewProps = {
  toast: NotifyItem;
  onClose: (id: string) => void;
};

function NotifyItemView({ toast, onClose }: NotifyItemViewProps) {
  const { id, type, message, options } = toast;

  return (
    <div className={`notify-item notify-${type}`}>
      <div className="notify-content">
        <div className="notify-message">{message}</div>
        <button className="notify-close" onClick={() => onClose(id)}>
          ×
        </button>
      </div>

      {options && options.actions && (
        <div className="notify-actions">
          {options.actions.map(({ actionFn, value }, index) => (
            <button key={`${value}-${index}`} onClick={actionFn}>
              {value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotifyItemView;
