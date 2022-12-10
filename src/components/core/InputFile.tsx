import React, { useRef, useState } from "react";
import cx from "classnames";

interface InputFileProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (file: File) => void;
  error?: boolean;
}

const InputFile: React.FC<InputFileProps> = ({
  className,
  placeholder,
  onChange = () => null,
  error = false,
  ...rest
}) => {
  const [filename, setFilename] = useState<string | null>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];

    if (file) {
      setFilename(file.name);
      onChange(file);
    } else {
      setFilename(null);
    }
  };

  return (
    <div
      className={cx(
        "rounded-lg border border-base-400 flex text-sub2 font-normal overflow-hidden cursor-pointer w-full hover:border-primary-600",
        error && "!border-red-600",
        rest.disabled && "disabled:bg-base-200 disabled:text-base-500"
      )}
      onClick={() => {
        inputRef.current?.click();
      }}
    >
      <input
        {...rest}
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={onInputChange}
      />
      <div className="flex-auto py-2 px-4 whitespace-nowrap text-ellipsis overflow-hidden">
        {!filename && (
          <span className="text-base-500">{placeholder || "Choose File"}</span>
        )}
        {filename && <span>{filename}</span>}
      </div>
      <div className="border-l">
        <button className="text-primary-600 h-full outline-none font-bold px-2 hover:text-base-100 hover:bg-primary-600">
          Browse
        </button>
      </div>
    </div>
  );
};

export default InputFile;
