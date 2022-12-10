import cx from "classnames";
import React, { Fragment, useEffect, useMemo, useState } from "react";

type Props = {
  initialPage?: number;
  dataLength: number;
  limit?: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  showHelper?: boolean;
  showNumber?: boolean;
};

const maxItemShown = 4;

const Pagination: React.FC<Props> = ({
  initialPage = 1,
  dataLength,
  limit = 10,
  onPageChange,
  disabled,
  showHelper = true,
  showNumber = true,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Get page count
  const pageCount = Math.ceil(dataLength / limit);
  // Get pages array
  const pages = [...Array(pageCount)].map((_, i) => i + 1);

  if (pageCount > maxItemShown) {
    pages.splice(-1, 1);
  }

  const itemBeforeOffset = useMemo<number>(() => {
    if (currentPage < maxItemShown) return 0;

    if (currentPage > pageCount - maxItemShown) {
      const offset = pageCount - maxItemShown - 1;
      return offset > 0 ? offset : 0;
    }

    return currentPage - 3;
  }, [currentPage]);

  const itemAfterOffset =
    currentPage < maxItemShown ? maxItemShown : currentPage + 2;

  // Max pagination page items
  const paginationItems =
    pages.length > maxItemShown
      ? pages.slice(itemBeforeOffset, itemAfterOffset)
      : pages;

  // Check has a break label
  const hasBreakLabel = pageCount - currentPage > maxItemShown;

  // start & end offset of array pagination
  const startOffset = (currentPage - 1) * limit;
  const endOffset =
    startOffset + limit > dataLength ? dataLength : startOffset + limit;

  const prevPageDisabled = currentPage === 1;
  const nextPageDisabled = currentPage >= pageCount;

  const handlePrevClick = () => {
    if (disabled) return;
    setCurrentPage(currentPage - 1);
    onPageChange(currentPage - 1);
  };

  const handlePageClick = (page: number) => {
    if (disabled) return;
    if (currentPage === page) return;

    setCurrentPage(page);
    onPageChange(page);
  };

  const handleNextClick = () => {
    if (disabled) return;
    setCurrentPage(currentPage + 1);
    onPageChange(currentPage + 1);
  };

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  return (
    <div className={`flex ${showHelper ? "justify-between" : "justify-end"}`}>
      {showHelper && (
        <div>
          <span className="text-base-700 text-sub2 font-normal">
            Showing {startOffset + 1} to {endOffset} of {dataLength} entries
          </span>
        </div>
      )}
      <div>
        <div
          className={cx(
            "flex text-sub2 bg-white rounded-md border border-[#DDDDDD] overflow-hidden",
            { "bg-base-200 text-base-500 pointer-events-none": disabled }
          )}
        >
          {!showNumber && (
            <button
              className={cx(
                "py-2 px-4 border-r disabled:text-base-700 disabled:pointer-events-none hover:bg-base-200 hover:text-base-900"
              )}
              disabled={currentPage === 1}
              onClick={() => handlePageClick(1)}
            >
              First Page
            </button>
          )}

          <button
            className="py-2 px-4 disabled:text-base-700 disabled:pointer-events-none hover:bg-base-200 hover:text-base-900"
            onClick={handlePrevClick}
            disabled={prevPageDisabled}
          >
            Previous
          </button>

          {showNumber && (
            <Fragment>
              {currentPage >= maxItemShown && pageCount > maxItemShown + 1 && (
                <button
                  className={cx(
                    "py-2 px-4 border-l  transition-colors duration-300",
                    {
                      "bg-primary-600 text-white": currentPage === 1,
                      "hover:bg-base-200 hover:text-base-900":
                        currentPage !== pageCount,
                    }
                  )}
                  onClick={() => handlePageClick(1)}
                >
                  1
                </button>
              )}

              {/* Break label  */}
              {currentPage > maxItemShown && pageCount > maxItemShown + 1 && (
                <span className="py-2 px-4 border-l">...</span>
              )}

              {paginationItems.map((page, i) => (
                <button
                  key={i}
                  className={cx(
                    "py-2 px-4 border-l transition-colors duration-300",
                    {
                      "bg-primary-600 text-white": currentPage === page,
                      "hover:bg-base-200 hover:text-base-900":
                        currentPage !== page,
                    }
                  )}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </button>
              ))}

              {/* Break label  */}
              {hasBreakLabel && <span className="py-2 px-4 border-l">...</span>}

              {/* End of page  */}
              {pageCount > maxItemShown && (
                <button
                  className={cx(
                    "py-2 px-4 border-l  transition-colors duration-300",
                    {
                      "bg-primary-600 text-white": currentPage === pageCount,
                      "hover:bg-base-200 hover:text-base-900":
                        currentPage !== pageCount,
                    }
                  )}
                  onClick={() => handlePageClick(pageCount)}
                >
                  {pageCount}
                </button>
              )}
            </Fragment>
          )}

          <button
            className="py-2 px-4 border-l disabled:text-base-700 disabled:pointer-events-none hover:bg-base-200 hover:text-base-900"
            onClick={handleNextClick}
            disabled={nextPageDisabled}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
