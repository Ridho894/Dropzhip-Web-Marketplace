import React from "react";
import cx from "classnames";

const position = {
  top: {
    wrapper: "bottom-full -translate-x-1/2 left-1/2 mb-3",
    arrow: "-translate-x-1/2 left-1/2 -bottom-8",
  },
  bottom: {
    wrapper: "top-full -translate-x-1/2 left-1/2 mt-3",
    arrow: "-translate-x-1/2 left-1/2 -top-8",
  },
  left: {
    wrapper: "right-full -translate-y-1/2 top-1/2 mr-3",
    arrow: "-translate-y-1/2 top-1/2 -right-7",
  },
  right: {
    wrapper: "left-full -translate-y-1/2 top-1/2 ml-3",
    arrow: "-translate-y-1/2 top-1/2 -left-7",
  },
};

type TooltipProps = {
  children: React.ReactNode;
  className?: string;
  classPolygon?: string;
  placement?: "top" | "bottom" | "left" | "right";
  content: React.ReactNode | string;
  disabled?: boolean;
};

const Tooltip: React.FC<TooltipProps> = ({
  children,
  className,
  classPolygon,
  placement = "bottom",
  content,
  disabled = false,
}) => {
  if (disabled) return <>{children}</>;

  return (
    <div className="relative group inline-block">
      {children}
      <div
        className={cx(
          position[placement].wrapper,
          "px-5 py-6 absolute invisible opacity-0 group-hover:opacity-100 delay-300 transition-opacity duration-200 group-hover:visible bg-backgroundDark-200 text-base-100 rounded-xl z-[1]",
          className
        )}
      >
        <div className="relative bg-inherit">
          <span
            className={cx(
              position[placement].arrow,
              "absolute h-[24px] aspect-square block bg-inherit rotate-45",
              classPolygon
            )}
          />
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
