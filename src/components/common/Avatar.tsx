import React from "react";

type Props = {
  name?: string;
  /**
   * CSS classname
   */
  className?: string;
  /**
   * height in pixel
   */
  height?: number;
  /**
   * width in pixel
   */
  width?: number;
};

const Avatar: React.FC<Props> = ({
  name,
  className = "",
  height = 30,
  width = 30,
}) => {
  const fontSize = Math.round((40 / 100) * height).toString();

  return (
    <div
      className={`${className} aspect-square rounded-full flex justify-center items-center bg-gray-100 text-gray-900`}
      style={{
        height: height + "px",
        width: width + "px",
      }}
    >
      <span
        style={{
          fontSize: `${fontSize}px`,
        }}
      >
        {name?.at(0)?.toUpperCase()}
      </span>
    </div>
  );
};

export default Avatar;
