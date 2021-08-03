import { useState, useMemo } from 'react'
import { useTable, usePagination, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy } from 'react-table'
import CaretDown from "../Misc/Icons/CaretDown"
import {matchSorter} from 'match-sorter'
import CaretUp from "../Misc/Icons/CaretUp";

// Define a default UI for filtering
function GlobalFilter({
                          preGlobalFilteredRows,
                          globalFilter,
                          setGlobalFilter,
                      }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span className={`w-full block bg-gray-900`}>
            <input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                className={`bg-gray-900 p-3 w-full border border-gray-700 text-center focus:outline-none`}
                placeholder={`Live filter ${count} collectibles (floor prices only)`}
            />
    </span>
    )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

const DataTable = ({ columns, data }) => {

    const filterTypes = useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 15 },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
    )

    return(
        <>
            <div className="flex flex-col overflow-auto">
                <div className="py-2 align-middle inline-block min-w-full w-max">
                    <div className="shadow  overflow-auto">
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                        <table className="table-auto min-w-full divide-y divide-gray-200" {...getTableProps()}>
                            <thead className={`border border-gray-700`} style={{ background: '#1E263C' }}>

                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            className="px-6 py-5 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            {column.render('Header')}
                                            <span className={`text-white`}>
                                            {column.isSorted ? column.isSortedDesc ? <CaretDown classes={`inline-block text-pink-500`} size={`15`} />  : (<><CaretUp classes={`inline-block text-pink-500`} size={`15`} /></>) : ''}
                                          </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}

                            </thead>
                            <tbody className="divide-y divide-gray-700" {...getTableBodyProps()} style={{ background: '#1E263C' }}>
                            {page.map(row => {
                                prepareRow(row)
                                return (
                                    <tr className={`border border-gray-700`} {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className="px-6 py-4 whitespace-nowrap"
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>

                        <div className="pagination flex justify-between bg-gray-900 p-5">

                            <div>
                                <select
                                    value={pageSize}
                                    className={`bg-gray-800 p-1 text-gray-300 border border-gray-600 text-sm`}
                                    onChange={e => {
                                        setPageSize(Number(e.target.value))
                                    }}
                                >
                                    {[10, 20, 30, 40, 50].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>
                                            Show {pageSize}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={`text-gray-300`}>
                                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                                    {'<'}
                                </button>
                                <span className={`inline-block ml-2 mr-2`}>Page <strong> {pageIndex + 1} of {pageOptions.length} </strong></span>
                                <button onClick={() => nextPage()} disabled={!canNextPage}>
                                    {'>'}
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTable