import React from 'react'
import { useTable, usePagination, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'

import {matchSorter} from 'match-sorter'

// Define a default UI for filtering
function GlobalFilter({
                          preGlobalFilteredRows,
                          globalFilter,
                          setGlobalFilter,
                      }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
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
                placeholder={`Live filter ${count} floor priced collectibles`}
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

    const filterTypes = React.useMemo(
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
        usePagination,
)

    return(
        <>
            <div className="flex flex-col">
                <div className="py-2 align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden">
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                        <table className="min-w-full divide-y divide-gray-200" {...getTableProps()}>
                            <thead className={`border border-gray-700`} style={{ background: '#1E263C' }}>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th
                                            {...column.getHeaderProps()}
                                            className="px-6 py-5 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            {column.render('Header')}
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


                        {/*<table className="min-w-full divide-y divide-gray-200">*/}
                        {/*    <tbody >*/}
                        {/*    <tr>*/}
                        {/*        <td >*/}
                        {/*            <div className="flex items-center">*/}
                        {/*                <div className="flex-shrink-0 h-10 w-10">*/}
                        {/*                    <img className="h-10 w-10 rounded-full"*/}
                        {/*                         src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"*/}
                        {/*                         alt="" />*/}
                        {/*                </div>*/}
                        {/*                <div className="ml-4">*/}
                        {/*                    <div className="text-sm font-medium text-gray-900">*/}
                        {/*                        Jane Cooper*/}
                        {/*                    </div>*/}
                        {/*                    <div className="text-sm text-gray-500">*/}
                        {/*                        jane.cooper@example.com*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </td>*/}
                        {/*        <td className="px-6 py-4 whitespace-nowrap">*/}
                        {/*            <div className="text-sm text-gray-900">Regional Paradigm Technician</div>*/}
                        {/*            <div className="text-sm text-gray-500">Optimization</div>*/}
                        {/*        </td>*/}
                        {/*        <td className="px-6 py-4 whitespace-nowrap">*/}
                        {/*            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>*/}
                        {/*        </td>*/}
                        {/*        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">*/}
                        {/*            Admin*/}
                        {/*        </td>*/}
                        {/*        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">*/}
                        {/*            <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>*/}
                        {/*        </td>*/}
                        {/*    </tr>*/}
                        {/*    </tbody>*/}
                        {/*</table>*/}
        </>
    )
}

export default DataTable