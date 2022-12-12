import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "react-date-range";
import cx from "classnames";

import CalendarIcon from "~/icons/line/Calendar.svg";

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  active?: boolean;
  onChange?: (date: Date) => void;
  value: string;
  displayFormat?: string;
  placement?: "top" | "bottom";
  error?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

const InputDate: React.FC<Props> = ({
  active,
  placement = "bottom",
  displayFormat = "MMM d, yyyy",
  minDate,
  maxDate,
  onChange = () => null,
  value,
  error = false,
  ...rest
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("");

  const handleOnChange = (date: Date) => {
    if (!date) return;

    onChange(date);
    setOpen(false);
  };

  useEffect(() => {
    if (value) {
      const formatted = format(new Date(value), displayFormat);
      setLabel(formatted);
    }
  }, [value]);

  return (
    <>
      <div className="relative">
        <div
          tabIndex={0}
          className={cx(
            "flex cursor-pointer items-center rounded-md border focus:border-primary-600 outline-none overflow-hidden border-base-400",
            error && "!border-red-600",
            {
              "border-primary-600": open,
              "bg-base-200 text-base-500 pointer-events-none": rest.disabled,
            }
          )}
          onClick={() => setOpen(true)}
        >
          <button
            className="p-3 bg-base-200 block h-full text-primary-600 fill-primary-600 outline-none"
            tabIndex={-1}
          >
            <CalendarIcon height={24} width={24} />
          </button>
          <p
            className={`${
              label ? "text-base-900" : "text-base-500"
            } p-3 pl-4 border-none focus:ring-0 w-full text-sub2`}
          >
            {label || "Collection start date"}
          </p>
        </div>

        {open && (
          <div
            className={cx("absolute bottom-full left-0 z-[1] mb-2", {
              "bottom-full": placement === "top",
              "top-full": placement === "bottom",
            })}
          >
            <div
              className="fixed top-0 bottom-0 right-0 left-0 -z-10"
              onClick={() => setOpen(false)}
            />
            <div className="bg-white rounded-lg shadow border">
              <div className="p-2 text-sub2">
                <Calendar
                  date={value ? new Date(value) : undefined}
                  minDate={minDate}
                  maxDate={maxDate}
                  onChange={handleOnChange}
                  color="#00B400"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InputDate;
