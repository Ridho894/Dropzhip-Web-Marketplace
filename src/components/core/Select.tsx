import { Fragment, useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import cx from "classnames";

import ChevronIcon from "~/icons/line/Chevron.svg";
import CheckIcon from "~/icons/line/Check.svg";

export type SelectItem = {
  id: string | number;
  name: string;
  disabled?: boolean;
  caption?: string;
  suffix?: string;
};

type SelectProps = {
  value?: string | number | SelectItem;
  data: SelectItem[];
  className?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  checkedIcon?: boolean;
  placeholder?: string;
  overflow?: "hidden" | "auto";
  onChange?: (value: SelectItem) => void;
  error?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  withSuffix?: boolean;
};

const Select: React.FC<SelectProps> = ({
  value,
  data,
  className,
  dropdownClassName,
  optionClassName,
  overflow = "hidden",
  checkedIcon = false,
  onChange = () => null,
  placeholder,
  error = false,
  disabled,
  leftIcon = null,
  withSuffix = false,
}) => {
  const [selected, setSelected] = useState<SelectItem>();

  const handleOnChange = (e: any) => {
    setSelected(e);
    onChange(e);
  };

  // update {selected} state when {value} prop is changed
  useEffect(() => {
    if (typeof value === "object") {
      const newValue = data.find((item) => item.id === value.id);
      setSelected(newValue);
    } else {
      const index = data.findIndex((item) => item.id == value);

      if (index > -1) {
        setSelected(data[index]);
      }
    }
  }, [data, value]);

  return (
    <div className="relative">
      {/* TODO: find out why onChange callback passing any */}
      <Listbox value={selected} onChange={handleOnChange}>
        {({ open }) => (
          <>
            <Listbox.Button
              className={cx(
                "relative p-3 pr-12 rounded-md border placeholder:text-base-500 w-full h-full text-sub2 text-left outline-none",
                "transition-colors duration-150",
                "focus-visible:border-primary-600",
                {
                  "!pl-12": leftIcon,
                  "border-primary-600": open,
                  "border-base-400 ": !open,
                  "!border-red-600": error,
                  "bg-base-200 pointer-events-none text-base-500": disabled,
                },
                className
              )}
              disabled={disabled}
            >
              {leftIcon && (
                <span className="absolute inset-y-0 left-3 flex items-center">
                  {leftIcon}
                </span>
              )}
              <span
                className={cx("block truncate capitalize ", {
                  // "text-base-500": !selected?.name,
                })}
              >
                {selected?.name || placeholder}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronIcon
                  height={20}
                  width={20}
                  className={cx("transition-transform duration-200", {
                    "-rotate-90": open,
                    "rotate-90": !open,
                  })}
                />
              </span>
            </Listbox.Button>
            <Listbox.Options
              className={cx(
                "bg-white rounded-md border border-base-400 mt-2 absolute top-full w-full z-[1] shadow-lg outline-none",
                dropdownClassName,
                "overflow-" + overflow
              )}
            >
              {data.map((item) => (
                <Listbox.Option
                  key={item.id}
                  value={item}
                  disabled={item.disabled}
                  as={Fragment}
                >
                  {({ selected, active }) => (
                    <li
                      className={cx(
                        optionClassName,
                        "p-4 cursor-pointer hover:bg-backgroundLight-100 text-sub2 font-normal text-base-900 capitalize",
                        {
                          "bg-backgroundLight-200": selected,
                          "bg-backgroundLight-300": active,
                        }
                      )}
                    >
                      {checkedIcon && (
                        <CheckIcon
                          height={16}
                          width={16}
                          className={cx(
                            "mr-2 inline",
                            !selected && "text-transparent"
                          )}
                        />
                      )}
                      {item.name}
                      {withSuffix && (
                        <span className="text-base-700">
                          {" - "}
                          {item.suffix}
                        </span>
                      )}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default Select;
