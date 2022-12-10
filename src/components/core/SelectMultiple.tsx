import { Listbox } from "@headlessui/react";
import cx from "classnames";
import React, { Fragment, useEffect, useRef, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { ReactSVG } from "react-svg";
import VirtualList from "react-tiny-virtual-list";

import ChevronIcon from "~/icons/line/Chevron.svg";
import CloseIcon from "~/icons/line/Close.svg";
import Checkbox from "./Checkbox";

import { escapeRegex } from "@/utils/regex";

export type SelectItem = {
  // Default
  id: string | number;
  name: string;
  icon?: string;
  disabled?: boolean;
  // caption below of name
  caption?: string;
  value?: string;
  suffix?: string;
  chipSuffix?: string;
};

type SelectMultipleProps = {
  data: SelectItem[];
  value?: SelectItem[];
  placeholder?: string;
  className?: string;
  position?: "top" | "bottom";
  checkboxPosition?: "left" | "right";
  withSelectAll?: boolean;
  withCaption?: boolean;
  onChange?: (value: SelectItem[]) => void;
  onRemove?: (value: SelectItem[]) => void;
  leftIcon?: React.ReactNode;
  withChipRemove?: boolean;
  arrow?: boolean;
  chipClassName?: string;
  scrollable?: boolean;
  scrollbarHeight?: string;
  searchable?: boolean;
  searchUsingApi?: boolean;
  searchApiUrl?: string;
  searchApiMethod?: "GET" | "POST";
  error?: boolean;
  disabled?: boolean;
  optionClassName?: string;
  withShowSelected?: boolean;
  limitShowChip?: number;
  withSuffix?: boolean;
  placeholderBold?: boolean;
};

const positions = {
  top: "bottom-full mb-2",
  bottom: "top-full mt-2",
};

const SelectMultiple: React.FC<SelectMultipleProps> = ({
  data,
  value,
  onChange = () => null,
  onRemove = () => null,
  placeholder,
  position = "bottom",
  className,
  checkboxPosition = "right",
  leftIcon = null,
  withSelectAll = true,
  withCaption = false,
  withChipRemove = true,
  arrow = true,
  chipClassName = null,
  scrollable = false,
  scrollbarHeight = "270px",
  searchable = false,
  searchUsingApi = false,
  searchApiUrl = null,
  searchApiMethod = null,
  error = false,
  disabled,
  optionClassName = "",
  withShowSelected = false,
  limitShowChip = null,
  withSuffix = false,
  placeholderBold = false,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<SelectItem[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  const [filteredIds, setFilteredIds] = useState<(string | number)[]>([]);
  const [activeId, setActiveId] = useState<string | number>();

  const inputRef = useRef<HTMLInputElement>(null);
  const listsRef = useRef<
    {
      id: string | number;
      node: HTMLLIElement | null;
    }[]
  >([]);

  const refOutsideClick = useOnclickOutside(
    (e) => {
      // prevent close dropdown on click the inputWrapper
      if (inputRef.current?.contains(e.target as Node)) return;

      inputRef.current?.blur();
      setOpen(false);
    },
    {
      // Only active when dropdown is open
      disabled: !open,
    }
  );

  const handleOnChange = (e: SelectItem[]) => {
    setSelected(e);
    onChange(e);
    setKeyword("");
    setFilteredIds(data.map((item) => item.id));

    inputRef.current?.focus();
  };

  const handleRemove = (index: number) => {
    const filtered = selected.filter((_, i) => i !== index);
    const channelRemoved = selected.filter((_, i) => i == index);

    setSelected(filtered);
    onChange(filtered);
    onRemove(channelRemoved);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyword(value);
    const filteredIds = data
      .filter((item) => {
        const lowercaseName = item.name.toLowerCase();
        const lowercaseValue = value.toLowerCase();

        return new RegExp(`${escapeRegex(lowercaseValue)}`, "i").test(
          lowercaseName
        );
      })
      .map((item) => item.id);

    setFilteredIds(filteredIds);
    setActiveId(filteredIds[0]);
  };

  /**
   * On keyword field keydown
   */
  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && filteredIds.length > 0) {
      e.preventDefault();
      const currentIndex = filteredIds.findIndex((id) => activeId == id);

      let previousId: string | number;
      if (currentIndex === 0) {
        // set to last
        previousId = filteredIds[filteredIds.length - 1];
      } else {
        previousId = filteredIds[currentIndex - 1];
      }

      const prevElement = listsRef.current.find(
        (item) => item.id === previousId
      );

      if (prevElement) {
        prevElement.node?.focus();
        inputRef.current?.focus();
      }

      setActiveId(previousId);
    }

    if (e.key === "ArrowDown" && filteredIds.length > 0) {
      e.preventDefault();
      const currentIndex = filteredIds.findIndex((id) => activeId == id);

      let nextId: string | number;
      if (currentIndex === filteredIds.length - 1) {
        // set to first
        nextId = filteredIds[0];
      } else {
        nextId = filteredIds[currentIndex + 1];
      }

      const nextElement = listsRef.current.find((item) => item.id === nextId);

      if (nextElement) {
        nextElement.node?.focus();
        inputRef.current?.focus();
      }

      setActiveId(nextId);
    }

    if (e.key === "Enter") {
      e.preventDefault();

      // avoid selected item duplication
      const isSelected = selected.find((item) => item.id === activeId);
      if (isSelected) return;

      if (activeId) {
        const firstFilteredItem = data.find((item) => {
          return item.id === activeId;
        });

        if (firstFilteredItem) {
          setSelected([...selected, firstFilteredItem]);
          onChange([...selected, firstFilteredItem]);
          setFilteredIds(data.map((item) => item.id));
          setKeyword("");
        }
      }
    }
  };

  const toggleSelectAll = () => {
    if (selected.length === data.length) {
      setSelected([]);
      onChange([]);
    } else {
      setSelected(data);
      onChange(data);
    }
  };

  const handleButtonClick = () => {
    if (searchable) {
      inputRef.current?.focus();
      return;
    }

    setOpen(!open);
  };

  const handleReset = () => {
    setSelected([]);
    onChange([]);
  };

  // set selected based on value prop
  useEffect(() => {
    if (!value) return;

    const filtered =
      data?.filter((item) => value.find((item2) => item.id === item2.id)) || [];
    setSelected(filtered);
  }, [value, data]);

  // every data source changed, then setFilteredIds to all
  useEffect(() => {
    setFilteredIds(data?.map((item) => item.id));
  }, [data]);

  const closeDropdown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      inputRef.current?.blur();
      setOpen(false);
    }
  };

  // on mount on ESC press will close dropdown
  // and on unmount will remove event listener
  // note: maybe will make performance leaks cause this will execute every SelectMultiple component rendered
  useEffect(() => {
    document.addEventListener("keydown", closeDropdown);
    return () => {
      document.removeEventListener("keydown", closeDropdown);
    };
  }, []);

  const searchedItems = data?.filter((item) =>
    new RegExp(`${escapeRegex(keyword)}`, "i").test(item.name)
  );

  return (
    <div className="relative w-full">
      <Listbox value={selected} onChange={handleOnChange} multiple>
        <button
          className={cx(
            "relative p-3 pr-12 rounded-md border focus:border-primary-600 placeholder:text-base-500 w-full text-sub2 text-left outline-none",
            {
              "!pl-12": leftIcon,
              "border-primary-600": open,
              "border-base-400 ": !open,
              "!border-red-600": error,
              "bg-base-200 text-base-500 pointer-events-none": disabled,
            },
            className
          )}
          onClick={handleButtonClick}
        >
          {leftIcon && (
            <span className="absolute inset-y-0 left-3 flex items-center">
              {leftIcon}
            </span>
          )}
          <div className="flex gap-2 flex-wrap">
            {selected
              .slice(0, limitShowChip || selected.length)
              .map((item, i) => (
                <span
                  key={i}
                  className={
                    chipClassName ||
                    `py-1 px-3 rounded-full flex items-center ${
                      disabled
                        ? "text-white bg-base-600"
                        : "text-secondary-600 bg-softColors-2"
                    } font-medium  text-sub3 cursor-default`
                  }
                >
                  {item.icon && (
                    <ReactSVG
                      src={item.icon}
                      height={22}
                      width={22}
                      wrapper="svg"
                      className="mr-2"
                    />
                  )}
                  {item.name}

                  {item.chipSuffix}
                  {withChipRemove && (
                    <span
                      className="ml-2 cursor-pointer rounded-full hover:bg-secondary-200 p-[2px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(i);
                      }}
                    >
                      <CloseIcon height={14} />
                    </span>
                  )}
                </span>
              ))}
            {limitShowChip && selected.length > limitShowChip && (
              <span
                className={
                  chipClassName ||
                  "py-1 px-3 bg-primary-600 text-base-100 rounded-full font-medium text-sub3 transition-colors duration-200 flex items-center"
                }
              >
                {selected.slice(limitShowChip).length}+
              </span>
            )}
            {searchable && (
              <input
                ref={inputRef}
                type="text"
                value={keyword}
                onKeyDown={handleKeywordKeyDown}
                className={`${
                  disabled ? "bg-base-200" : ""
                } outline-none focus:outline-none focus:ring-0 border-0 text-sub2 placeholder:text-base-500 flex-auto ring-0 p-0`}
                placeholder={!selected.length ? placeholder : ""}
                onChange={handleKeywordChange}
                onFocus={() => setOpen(true)}
              />
            )}
          </div>
          {!searchable && (
            <span
              className={cx(
                "block truncate",
                {
                  "text-base-500": !selected.length && !placeholderBold,
                },
                {
                  "text-base-900": placeholderBold,
                }
              )}
            >
              {!selected.length && placeholder}
            </span>
          )}
          {arrow && (
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
          )}
        </button>
        {open && (
          <Listbox.Options
            ref={refOutsideClick}
            static
            as="div"
            className={cx(
              `bg-white rounded-md border overflow-hidden border-base-400 mt-2 absolute w-full z-[1] outline-none shadow-lg`,
              optionClassName,
              scrollable
                ? `max-h-[${scrollbarHeight}] scrollbar-thixn scrollbar-thumb-base-400 scrollbar-track-base-100`
                : "h-max",
              positions[position]
            )}
          >
            <ul
              className={cx({
                hidden: searchedItems.length === 0,
              })}
            >
              {searchedItems.length > 0 && (
                <Fragment>
                  {withSelectAll && (
                    <li
                      className={cx(
                        "p-4 sticky top-0 bg-white cursor-pointer hover:bg-backgroundLight-200 text-sub2 font-normal text-base-900 flex gap-3 border-b border-base-400",
                        { "justify-between": checkboxPosition === "right" }
                      )}
                      onClick={toggleSelectAll}
                    >
                      {checkboxPosition === "left" && (
                        <Checkbox
                          className="mr-0 rounded-[4px]"
                          checked={selected.length === data.length}
                          readOnly
                        />
                      )}
                      {selected.length === data.length
                        ? "Unselect all"
                        : "Select all"}
                      {checkboxPosition === "right" && (
                        <Checkbox
                          className="mr-0 rounded-[4px]"
                          checked={selected.length === data.length}
                          readOnly
                        />
                      )}
                    </li>
                  )}
                </Fragment>
              )}

              {withShowSelected && (
                <div className="p-2 px-4 text-sub3 space-y-2 border-b border-base-300">
                  <div className="flex justify-between">
                    <label htmlFor="" className="text-base-700 font-medium">
                      Your Selected
                    </label>
                    <button
                      className="text-secondary-600 font-medium text-sub3"
                      onClick={handleReset}
                    >
                      Reset
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selected.map((item, i) => (
                      <span
                        key={i}
                        className={`py-1 px-3 rounded-full flex items-center  font-medium ${
                          disabled
                            ? "bg-base-600 text-white"
                            : "bg-softColors-2 text-secondary-600"
                        } text-sub3 cursor-default`}
                      >
                        {item.name}
                        <i
                          className="ml-2 cursor-pointer rounded-full hover:bg-secondary-200 p-[2px]"
                          onClick={() => handleRemove(i)}
                        >
                          <CloseIcon height={14} />
                        </i>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <VirtualList
                height={searchedItems.length > 5 ? 270 : "100%"}
                itemCount={searchedItems.length}
                itemSize={withCaption ? 75 : 53}
                renderItem={({ index: i, style }) => {
                  const item = searchedItems[i];

                  return (
                    <Listbox.Option
                      ref={(e: any) =>
                        (listsRef.current[i] = {
                          id: item.id,
                          node: e,
                        })
                      }
                      key={item.id}
                      value={item}
                      disabled={item.disabled}
                      as="li"
                      className="outline-none border-b border-base-400 last:border-0"
                      style={style}
                    >
                      {({ selected, active }) => (
                        <div
                          className={cx(
                            "p-4 cursor-pointer items-center hover:bg-backgroundLight-200 text-sub2 font-normal text-base-900 flex gap-3",
                            {
                              "bg-backgroundLight-200": selected || active,
                              "justify-between": checkboxPosition === "right",
                              hidden:
                                searchable &&
                                keyword &&
                                !filteredIds.includes(item.id),
                              "!bg-backgroundLight-300": activeId === item.id,
                            }
                          )}
                        >
                          {checkboxPosition === "left" && (
                            <Checkbox
                              className="mr-0 rounded-[4px]"
                              checked={selected}
                              readOnly
                            />
                          )}
                          <div className="flex">
                            {item.icon && (
                              <ReactSVG
                                src={item.icon}
                                height={22}
                                width={22}
                                wrapper="svg"
                                className="mr-2 text-secondary-600"
                              />
                            )}
                            <div>
                              <p
                                className={`${
                                  withCaption && "font-medium text-base-900"
                                }`}
                              >
                                {item.name}
                                {withSuffix && (
                                  <span className="text-base-700">
                                    {" - "}
                                    {item.suffix}
                                  </span>
                                )}
                              </p>
                              {withCaption && <p>{item.caption}</p>}
                            </div>
                          </div>
                          {checkboxPosition === "right" && (
                            <Checkbox
                              className="mr-0 rounded-[4px]"
                              checked={selected}
                              readOnly
                            />
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  );
                }}
              />
            </ul>

            {/* If searchable and no one matches with keyword  */}
            {searchable && searchedItems.length === 0 && (
              <div className="p-4 text-left">
                <span className="text-sub2 text-base-900 italic">
                  No data available
                </span>
              </div>
            )}
          </Listbox.Options>
        )}
      </Listbox>
    </div>
  );
};

export default SelectMultiple;
