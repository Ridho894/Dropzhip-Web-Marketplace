import React from "react";
import cx from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "xl" | "l" | "m" | "s" | "xs";
  full?: Boolean;
  leftIcon?: String | React.ReactNode;
  rightIcon?: String | React.ReactNode;
}

const sizes = {
  xl: "text-h6 px-6 py-4",
  l: "text-sub1 px-4 py-3",
  m: "text-sub2 px-[14px] py-[11px]",
  s: "text-sub3 px-3 py-2",
  xs: "text-sub4 px-2 py-1",
};

const Button: React.FC<ButtonProps> = ({
  variant,
  color,
  full,
  size = "l",
  leftIcon,
  rightIcon,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={cx(
        "transition-colors duration-200 rounded-md font-bold",
        "focus:outline-[1px] focus:outline-primary-700",
        sizes[size],
        {
          "w-full": full,
          // variant primary
          "bg-primary-600 hover:bg-primary-700 active:bg-primary-800 disabled:bg-base-500 text-white":
            variant === "primary",
          // variant secondary
          "border border-primary-600 text-primary-600 hover:bg-white hover:border-primary-700 hover:text-primary-700 active:text-primary-800 disabled:border-base-500 disabled:text-base-500":
            variant === "secondary",
        },
        className
      )}
    >
      {leftIcon && <i className="pr-4">{leftIcon}</i>}
      {rest.children}
      {rightIcon && <i className="pl-4">{rightIcon}</i>}
    </button>
  );
};

Button.defaultProps = {
  variant: "primary",
  size: "l",
  full: false,
};

export default Button;
