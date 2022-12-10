import React, { HTMLInputTypeAttribute } from "react";
import cx from "classnames";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.LegacyRef<HTMLInputElement>;
  type?: HTMLInputTypeAttribute;
  leftIcon?: React.ReactNode;
  leftIconClick?: () => void;
  rightIcon?: React.ReactNode;
  rightIconClick?: () => void;
  error?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  leftIcon,
  leftIconClick,
  rightIcon,
  rightIconClick,
  className,
  error = false,
  ...rest
}) => {
  if (rightIcon) {
    return (
      <div className="relative">
        <input
          {...rest}
          type={type}
          className={cx(
            "p-3 pr-12 rounded-md border border-base-400 placeholder:text-base-500 focus:ring-0 focus:outline-none focus:border-primary-600 w-full text-sub2 disabled:bg-base-200 disabled:text-base-500",
            error && "!border-red-600",
            className
          )}
        />
        {rightIconClick ? (
          <span
            className="absolute h-full top-0 right-0 p-4 cursor-pointer"
            onClick={rightIconClick}
          >
            {rightIcon}
          </span>
        ) : (
          <span className="absolute h-full top-0 right-0 px-4 flex items-center">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }

  if (leftIcon) {
    return (
      <div className="relative">
        <input
          {...rest}
          type={type}
          className={cx(
            "p-3 pl-12 rounded-md border border-base-400 placeholder:text-base-500 focus:ring-0 focus:outline-none focus:border-primary-600 w-full text-sub2",
            error && "!border-red-600",
            className
          )}
        />
        {leftIconClick ? (
          <span
            className="absolute h-full top-0 left-0 p-2 bg-base-200 cursor-pointer"
            onClick={leftIconClick}
          >
            {leftIcon}
          </span>
        ) : (
          <span className="absolute h-full top-0 left-0 px-4 flex items-center">
            {leftIcon}
          </span>
        )}
      </div>
    );
  }

  return (
    <input
      {...rest}
      type={type}
      className={cx(
        "p-3 rounded-md border border-base-400 placeholder:text-base-500 focus:ring-0 focus:outline-none focus:border-primary-600 w-full text-sub2",
        error && "!border-red-600",
        className
      )}
    />
  );
};

Input.defaultProps = {
  type: "text",
};

export default Input;
