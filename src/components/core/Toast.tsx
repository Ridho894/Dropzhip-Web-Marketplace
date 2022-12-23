import React from "react";
import toast, { ToastPosition } from "react-hot-toast";
import CheckIcon from "~/icons/line/Check.svg";
import WarningIcon from "~/icons/line/Warning.svg";
import CloseIcon from "~/icons/line/Close.svg";

type ToastType = "success" | "warning" | "error" | "loading";

type ToastProps = {
  visible: boolean;
  type: ToastType;
  message: string;
};

const colors = {
  success: "bg-green-400",
  error: "bg-red-600",
  warning: "bg-yellow-600",
  loading: "bg-green-600",
};

export const Toast: React.FC<ToastProps> = ({
  visible,
  type = "success",
  message,
}) => {
  return (
    <div
      className={`${visible ? "animate-enter" : "animate-leave"} ${
        colors[type]
      } shadow-lg rounded-lg pointer-events-auto flex text-white py-2 px-3 items-center gap-2`}
    >
      {type === "success" && <CheckIcon height={16} width={16} />}
      {type === "error" && <CloseIcon height={16} width={16} />}
      {type === "warning" && <WarningIcon height={16} width={16} />}
      <span className="text-sub2 font-medium mb-1">{message}</span>
    </div>
  );
};

type Props = {
  position?: ToastPosition;
};

const defaultAdditionalProps: Props = {
  position: "top-right",
};

export const toastSuccess = (
  message: string,
  props: Props = defaultAdditionalProps
) => {
  toast.custom(
    (t) => <Toast type="success" visible={t.visible} message={message} />,
    props
  );
};

export const toastError = (
  message: string,
  props: Props = defaultAdditionalProps
) => {
  toast.custom(
    (t) => <Toast type="error" visible={t.visible} message={message} />,
    props
  );
};

export const toastWarning = (
  message: string,
  props: Props = defaultAdditionalProps
) => {
  toast.custom(
    (t) => <Toast type="warning" visible={t.visible} message={message} />,
    props
  );
};

export const toastLoading = (message: string) => {
  return toast.custom(
    (t) => <Toast type="loading" visible={t.visible} message={message} />,
    {
      position: "top-right",
      duration: Infinity,
      className:
        "animate-enter bg-success-600 shadow-lg rounded-lg pointer-events-auto flex text-base-100 py-2 px-3 items-center gap-2",
    }
  );
};

export default Toast;
