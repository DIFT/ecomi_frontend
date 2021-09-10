import { useEffect, useState, useMemo, useRef } from 'react'
import { useTable, usePagination, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy } from 'react-table'
import CaretDown from "../Misc/Icons/CaretDown"
import {matchSorter} from 'match-sorter'
import CaretUp from "../Misc/Icons/CaretUp"



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
        <span className={`w-auto block bg-gray-900`}>
            <input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                className={`bg-gray-900 p-3 w-screen border border-gray-700 text-center focus:outline-none`}
                placeholder={`Search... (${count} collectibles)`}
                autoFocus={true}
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

    const ref = useRef();

    let fifthteen = 15

    const observer = useRef(new IntersectionObserver((entries) => {
        const first = entries[0]
        if(first.isIntersecting){
            fifthteen = fifthteen + 15
            setPageSize(state.pageSize + fifthteen)
        }
    },{ rootMargin: '500px' }))

    const [element, setElement] = useState(null)

    useEffect(() => {
        const currentElement = element
        const currentObserver = observer.current

        if (currentElement){
            currentObserver.observe(currentElement)
        }

        return () => {
            if (currentElement){
                currentObserver.unobserve(currentElement)
            }
        }
    }, [element])

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
        rows,
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

    console.log('page count is: ', pageCount)
    console.log('page size is: ', pageSize)
    console.log('table state is: ', state)

    return(
        <>
            <div className="flex flex-col overflow-auto customTable">
                <div className="py-2 align-middle inline-block min-w-full w-max">
                    <div className="shadow  overflow-auto">
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                            <table className="table-auto min-w-full divide-y divide-gray-200" {...getTableProps()}>
                                <thead className={`border border-gray-700 hidden sm:table-header-group`} style={{ background: '#1E263C' }}>
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()} className={`bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0`}>
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
                                <tbody className="flex-1 sm:flex-none divide-y divide-gray-700" {...getTableBodyProps()} style={{ background: '#1E263C' }}>
                                {page.map(row => {
                                    prepareRow(row)
                                    return (
                                        <tr className={`flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 border border-gray-700`} {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                return (
                                                    <td
                                                        {...cell.getCellProps()}
                                                        className="px-6 py-4 whitespace-nowrap"
                                                    >
                                                        <span className={`block sm:hidden text-xs font-medium text-gray-300 uppercase tracking-wider mb-2`}>{cell.column.Header}</span>
                                                        {console.log('getll props is: ', cell)}
                                                        {cell.render('Cell')}
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>

                        <div ref={setElement}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTable