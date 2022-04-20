import { FC } from 'react'
import { ICustomTableProps } from '../../utils'
import DeleteIcon from '../UI/delete-icon'
import EditIcon from '../UI/edit-icon'

const CustomTable: FC<ICustomTableProps> = ({ tableData, headers, onDelete, onEdit }) => {
    let dataToShow = [...tableData]

    // remove id from table so that it won't be shown
    dataToShow = dataToShow.map(({ id, ...otherProps }) => (otherProps))
    return (
        <div className="flex flex-col items-center mt-10">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg">
                        {tableData &&
                            (<table className="text-center">
                                <thead className="border-b bg-blue">
                                    <tr>
                                        {headers.map((header, index) =>
                                            <th key={`${header}-${index}`} scope="col" className="text-base font-medium text-white px-6 py-4">{header}</th>
                                        )}
                                        <th scope="col" className="text-base font-medium text-white px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataToShow.map((tableDataRow, index) => (
                                        <tr key={`row-${index}`} className="bg-white border-b">
                                            {Object.values(tableDataRow).map((rowData, index) => (
                                                <td key={`${rowData}-${index}`} className="text-sm text-gray-700 font-normal px-6 py-4 whitespace-nowrap">{rowData}</td>
                                            ))}
                                            <td className="flex flex-row px-6 py-4 whitespace-nowrap">
                                                <span className="basis-1/2">
                                                    <button onClick={() => onEdit?.(tableData[index].id!)}>
                                                        <EditIcon />
                                                    </button>
                                                </span>
                                                <span className="basis-1/2">
                                                    <button onClick={() => onDelete?.(tableData[index].id!)}>
                                                        <DeleteIcon />
                                                    </button>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomTable