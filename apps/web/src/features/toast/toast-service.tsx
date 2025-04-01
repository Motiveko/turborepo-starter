import { toast } from "react-toastify";
import Toast from "@web/features/toast/toast";

const DEFAULT_DURATION = 3000;

export type AddToastOptions = {
  title?: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  position?:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
};

const addToast = ({
  title,
  message,
  type,
  action,
  duration = DEFAULT_DURATION,
  position = "top-right",
}: AddToastOptions) => {
  toast(
    ({ closeToast }) => (
      <Toast
        closeToast={closeToast}
        title={title}
        message={message}
        type={type}
        action={action}
      />
    ),
    {
      autoClose: duration || false,
      position: position,
      hideProgressBar: true,
      closeButton: true,
    }
  );
};

export { addToast };
