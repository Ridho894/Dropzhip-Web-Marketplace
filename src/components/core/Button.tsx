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
        "transition-colors duration-200 rounded-md font-bold disabled:cursor-not-allowed",
        "focus:outline-[1px] focus:outline-primary-700",
        sizes[size],
        {
          "w-full": full,
          // variant primary
          "bg-dropzhip_blue hover:bg-dropzhip_blue-light active:bg-dropzhip_blue-light disabled:bg-gray-500 text-white":
            variant === "primary",
          // variant secondary
          "border border-dropzhip_blue text-gray-600 hover:bg-white hover:border-gray-700 hover:text-gray-700 active:text-gray-800 disabled:border-gray-500 disabled:text-gray-500":
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
