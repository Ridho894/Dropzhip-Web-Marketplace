import React from "react";
import cx from "classnames";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({ error, ...rest }) => {
  return (
    <textarea
      {...rest}
      className={cx(
        "p-3 pr-12 rounded-md border border-base-400 placeholder:text-base-500 focus:border-primary-600 outline-none focus:ring-0 w-full text-sub2 ",
        "disabled:bg-base-200 disabled:text-base-500",
        error && "!border-red-600",
        rest.className
      )}
    />
  );
};

export default Textarea;
