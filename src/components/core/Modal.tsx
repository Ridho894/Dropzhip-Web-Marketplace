import React, { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import cx from "classnames";

import CloseIcon from "~/icons/line/Close.svg";

type Props = {
  open?: boolean;
  onClose?: () => void;
  /**
   * - xsmall : 320px
   * - small  : 400px
   * - medium : 640px
   * - large  : 800px
   * - xlarge : 1140px
   *
   * @default medium
   */
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  children: ReactNode;
  /**
   * Class name to apply to the modal dialog.
   */
  className?: string;
  /**
   * Show close button on top right
   */
  closeButton?: boolean;
};

const modalSize = {
  xsmall: "max-w-[320px]",
  small: "max-w-[400px]",
  medium: "max-w-[640px]",
  large: "max-w-[800px]",
  xlarge: "max-w-[1140px]",
};

const Modal: React.FC<Props> = ({
  open = false,
  onClose = () => null,
  size = "medium",
  children,
  className,
  closeButton = false,
}) => {
  const width = modalSize[size];

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[70]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cx(
                  "relative w-full p-5 rounded-xl transform bg-white shadow-lg transition-all",
                  width,
                  className
                )}
              >
                {closeButton && (
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 aspect-square block-inline  hover:bg-base-200 rounded-full p-[2px]"
                  >
                    <CloseIcon height={24} />
                  </button>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
