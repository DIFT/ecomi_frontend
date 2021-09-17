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
                          row
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

    return <input type="number" value={value} onChange={onChange} onBlur={onBlur} disabled={!row.isSelected} className={`${!row.isSelected ? 'bg-gray-900 text-gray-500 opacity-50' : 'bg-gray-900  text-white'} rounded-3xl p-3`} />
}

const Table = ({ columns , data, updateMyData, skipPageReset, setCollectibles, valuation, setValuation, usersCollectibles, setUsersCollectibles, selectedRows }) => {

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

    const fakeData = [
        {"collectibleId": "b94e5d49-35f0-4bdc-9e41-d5c484df5ae7", "quantity": 2},
        {"collectibleId": "1def2f37-8043-4aa8-a490-b4024db216ff", "quantity": 2},
        {"collectibleId": "ac5bc2af-f67d-46da-bac1-1b404a3dd6d1", "quantity": 2}
    ]

    const handleSelectedRows = async () => {
        let selectedObj = {}
        await data && data.map((collectibleRow, index) => {
            var check = fakeData.find(c => c.collectibleId === collectibleRow.collectibleId);
            const stringMyIndex = `${index}`
            if (check){
                selectedObj = {...selectedObj, [stringMyIndex]: true}
            }
        })
        console.log('selectedobj inside is: ', selectedObj)
        return selectedObj
    }

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
        toggleAllRowsSelected,
        state: { pageIndex, pageSize, selectedRowIds },
    } = useTable(
        {
            columns,
            data,
            autoResetPage: !skipPageReset,
            autoResetSelectedRows: false,
            updateMyData,
            initialState: { pageIndex: 0, pageSize: 200, selectedRowIds: handleSelectedRows() },
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
                    Cell: (cellProps,{row}) => EditableCell(cellProps, row)
                },
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: "",
                    Header: () => (
                        <div>
                            <button className={`border border-white text-white font-base py-2 px-4 rounded-full font-semibold text-sm`} onClick={() => {toggleAllRowsSelected()}}>Toggle all</button>
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
            <div className="flex flex-col overflow-auto customTable">
                <div className="py-2 align-middle inline-block min-w-full w-max">
                    <div className="shadow overflow-auto">
                        <table className="table-auto min-w-full divide-y divide-gray-200" {...getTableProps()}>
                            <thead className={`border border-gray-700 hidden sm:table-header-group`} style={{ background: '#1E263C' }}>

                            {headerGroups.map(headerGroup => (
                                <tr className={`bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0`} {...headerGroup.getHeaderGroupProps()}>
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
                            <tbody className="flex-1 sm:flex-none divide-y divide-gray-700" {...getTableBodyProps()} style={{ background: '#1E263C' }}>
                            {page.map((row, i) => {
                                prepareRow(row)
                                return (
                                    <tr className={`flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 border border-gray-700`} {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps()} className={`px-6 py-4 whitespace-nowrap`}>{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

const ValuationTable = ({ columns, data, setCollectibles, setValuation, valuation, setUsersCollectibles, usersCollectibles,selectedRows }) => {

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
            selectedRows={selectedRows}
        />
    )
}

export default ValuationTable