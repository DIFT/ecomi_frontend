import React, { useEffect, useState, useMemo, useRef } from 'react'
import { useTable, usePagination, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, useRowSelect } from 'react-table'
import {matchSorter} from 'match-sorter'

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

// Create an editable cell renderer
const EditableCell = ({
                          value: initialValue = 1,
                          row: { index },
                          column: { id },
                          updateMyData, // This is a custom function that we supplied to our table instance
                      }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return <input value={value} onChange={onChange} onBlur={onBlur} className={`bg-gray-900 text-white rounded-lg p-3`} />
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell,
}


const Table = ({ columns , data, updateMyData, skipPageReset, setCollectibles, valuation, setValuation, usersCollectibles, setUsersCollectibles }) => {

    const handleCalcValuation = (selectedFlatRows) => {
        let vaultValuation = []
        const selectedItems = []
        let newUserCollectible = {}

        selectedFlatRows.map((collectible) => {
            const collectibleId = collectible.original.collectibleId
            let quantity
            collectible.original.quantity ? quantity = collectible.original.quantity : quantity = 1
            newUserCollectible = { "collectibleId": collectibleId, "quantity": Number(quantity) }
            selectedItems.push(newUserCollectible)
        })

        setUsersCollectibles([...selectedItems])

    }

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
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        selectedFlatRows,
        state: { pageIndex, pageSize, selectedRowIds },
    } = useTable(
        {
            columns,
            data,
            // defaultColumn,
            autoResetPage: !skipPageReset,
            autoResetSelectedRows: false,
            updateMyData,
            initialState: { pageIndex: 0, pageSize: 15 },
        },
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                ...columns,
                // Let's make a column for selection
                {
                    id: 'quantity',
                    Header: "Quantity",
                    Cell: EditableCell
                },
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: "",
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <div>
                            <button className={`border border-white text-white font-base py-2 px-4 rounded-full font-semibold text-sm`}{...getToggleAllPageRowsSelectedProps()}> Select all</button>
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <button className={`border w-20 border-white text-white font-base py-2 px-4 rounded-full font-semibold text-sm ${row.isSelected ? 'bg-pink-500 border-pink-500' : 'bg-transparent'}`} {...row.getRowProps()} onClick={() => {
                                row.toggleRowSelected()
                            }}>
                                {row.isSelected ? 'Remove' : 'Add' }
                            </button>
                        </div>
                    ),
                },

            ])
        }
    )

    useEffect(() => {
        handleCalcValuation(selectedFlatRows)
    }, [selectedFlatRows])

    return(
        <>
            <div className="flex flex-col">
                <div className="py-2 align-middle inline-block w-full">
                    <div className="shadow ">
                        {/*<GlobalFilter*/}
                        {/*    preGlobalFilteredRows={preGlobalFilteredRows}*/}
                        {/*    globalFilter={state.globalFilter}*/}
                        {/*    setGlobalFilter={setGlobalFilter}*/}
                        {/*/>*/}
                        <table className="table-auto min-w-full divide-y divide-gray-200" {...getTableProps()}>
                            <thead className={`border border-gray-700`} style={{ background: '#1E263C' }}>

                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th
                                            className="px-6 py-5 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            {column.render('Header')}
                                            <span className={`text-white`}>
                                            {/*{column.isSorted ? column.isSortedDesc ? <CaretDown classes={`inline-block text-pink-500`} size={`15`} />  : (<><CaretUp classes={`inline-block text-pink-500`} size={`15`} /></>) : ''}*/}
                                          </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}

                            </thead>
                            <tbody className="divide-y divide-gray-700" {...getTableBodyProps()} style={{ background: '#1E263C' }}>
                            {page.map((row, i) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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

const ValuationTable = ({ columns, data, setCollectibles, setValuation, valuation, setUsersCollectibles, usersCollectibles }) => {

    const [skipPageReset, setSkipPageReset] = React.useState(false)

    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        setCollectibles(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    }
                }

                return row
            })
        )
    }

    useEffect(() => {
        setSkipPageReset(false)
    }, [data])

    return (
        <Table
            columns={columns}
            data={data}
            updateMyData={updateMyData}
            skipPageReset={skipPageReset}
            setValuation={setValuation}
            valuation={valuation}
            usersCollectibles={usersCollectibles}
            setUsersCollectibles={setUsersCollectibles}
        />
    )
}

export default ValuationTable