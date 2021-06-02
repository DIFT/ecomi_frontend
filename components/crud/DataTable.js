import React from 'react'
import { useTable } from 'react-table'

const DataTable = ({ columns, data }) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    return(
        <>
            <div className="flex flex-col">
                <div className="py-2 align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden">
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
                            {rows.map(row => {
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