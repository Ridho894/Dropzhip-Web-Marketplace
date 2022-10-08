import React, { useEffect, useMemo, useState } from 'react'
import cx from 'classnames'

function Pagination({
    initialPage = 1,
    dataLength = 40,
    limit = 10,
    onPageChange,
    disabled,
    showHelper = true,
}) {
    const [currentPage, setCurrentPage] = useState(1)

    // Get page count
    const pageCount = Math.ceil(dataLength / limit)
    // Get pages array
    const pages = [...Array(pageCount)].map((_, i) => i + 1)

    pages.splice(-1, 1)

    const maxItemShown = 4

    const itemBeforeOffset = useMemo(() => {
        if (currentPage < maxItemShown) return 0

        if (currentPage > pageCount - maxItemShown) {
            const offset = pageCount - maxItemShown - 1
            return offset > 0 ? offset : 0
        }

        return currentPage - 3
    }, [currentPage])

    const itemAfterOffset =
        currentPage < maxItemShown ? maxItemShown : currentPage + 2

    // Max pagination page items
    const paginationItems =
        pages.length > maxItemShown
            ? pages.slice(itemBeforeOffset, itemAfterOffset)
            : pages

    // Check has a break label
    const hasBreakLabel = pageCount - currentPage > maxItemShown

    // start & end offset of array pagination
    const startOffset = (currentPage - 1) * limit
    const endOffset =
        startOffset + limit > dataLength ? dataLength : startOffset + limit

    const prevPageDisabled = useMemo(() => currentPage === 1, [currentPage])
    const nextPageDisabled = useMemo(() => currentPage === pageCount, [
        currentPage,
    ])

    const handlePrevClick = () => {
        setCurrentPage(currentPage - 1)
        onPageChange(currentPage - 1)
    }

    const handlePageClick = page => {
        if (currentPage === page) return

        setCurrentPage(page)
        onPageChange(page)
    }

    const handleNextClick = () => {
        setCurrentPage(currentPage + 1)
        onPageChange(currentPage + 1)
    }

    useEffect(() => {
        setCurrentPage(initialPage)
    }, [initialPage])

    return (
        <div
            className={`flex ${
                showHelper ? 'justify-between' : 'justify-end'
            }`}>
            {showHelper && (
                <div>
                    <span className="text-base-700 text-sub2 font-normal">
                        Showing {startOffset + 1} to {endOffset} of {dataLength}{' '}
                        entries
                    </span>
                </div>
            )}
            <div>
                <div
                    className={cx(
                        'flex text-sub2 bg-white rounded-md border border-[#DDDDDD] overflow-hidden',
                        {
                            'bg-base-200 text-base-500 pointer-events-none': disabled,
                        },
                    )}>
                    <button
                        className="py-2 px-4 disabled:text-base-700 disabled:pointer-events-none hover:bg-base-200 hover:text-base-900"
                        onClick={handlePrevClick}
                        disabled={prevPageDisabled}>
                        Previous
                    </button>

                    {currentPage > 4 && (
                        <button
                            className={cx(
                                'py-2 px-4 border-l  transition-colors duration-300',
                                {
                                    'bg-primary-600 text-white':
                                        currentPage === 1,
                                    'hover:bg-base-200 hover:text-base-900':
                                        currentPage !== pageCount,
                                },
                            )}
                            onClick={() => handlePageClick(1)}>
                            1
                        </button>
                    )}

                    {/* Break label  */}
                    {currentPage > 4 && (
                        <span className="py-2 px-4 border-l ">...</span>
                    )}

                    {paginationItems.map((page, i) => (
                        <button
                            key={i}
                            className={cx(
                                'py-2 px-4 border-l transition-colors duration-300',
                                {
                                    'bg-primary-600 text-white':
                                        currentPage === page,
                                    'hover:bg-base-200 hover:text-base-900':
                                        currentPage !== page,
                                },
                            )}
                            onClick={() => handlePageClick(page)}>
                            {page}
                        </button>
                    ))}

                    {/* Break label  */}
                    {hasBreakLabel && (
                        <span className="py-2 px-4 border-l ">...</span>
                    )}

                    {/* End of page  */}
                    {pageCount > 0 && (
                        <button
                            className={cx(
                                'py-2 px-4 border-l  transition-colors duration-300',
                                {
                                    'bg-primary-600 text-white':
                                        currentPage === pageCount,
                                    'hover:bg-base-200 hover:text-base-900':
                                        currentPage !== pageCount,
                                },
                            )}
                            onClick={() => handlePageClick(pageCount)}>
                            {pageCount}
                        </button>
                    )}

                    <button
                        className="py-2 px-4 border-l disabled:text-base-700 disabled:pointer-events-none hover:bg-base-200 hover:text-base-900"
                        onClick={handleNextClick}
                        disabled={nextPageDisabled}>
                        Next
                    </button>
                    {/* <button
            className="py-2 px-4 border-l disabled:text-base-700 disabled:pointer-events-none hover:bg-base-200 hover:text-base-900"
            onClick={() => setCurrentPage(pageCount)}
            disabled={currentPage === pageCount}
          >
            {">>"}
          </button> */}
                </div>
            </div>
        </div>
    )
}

Pagination.propTypes = {}

export default Pagination
