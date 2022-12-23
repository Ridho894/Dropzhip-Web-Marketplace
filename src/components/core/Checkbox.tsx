import React from "react";
import cx from "classnames";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox: React.FC<CheckboxProps> = ({ className, ...rest }) => {
  return (
    <input
      {...rest}
      type="checkbox"
      className={cx(
        `border-base-500 ${
          rest.disabled
            ? "text-gray-600"
            : "text-dropzhip_blue-light cursor-pointer"
        }  focus:outline-2 focus:outline-droptext-dropzhip_blue-light ring-0 focus:ring-0 focus:ring-offset-0 mr-2 rounded-md outline-none h-5 w-5 disabled:bg-base-400`,
        className
      )}
    />
  );
};

export default Checkbox;
