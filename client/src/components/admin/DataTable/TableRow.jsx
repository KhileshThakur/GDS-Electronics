import { getNestedValue } from "./utils";

const TableRow = ({
    row,
    index,
    columns,
    serialNumber,
    renderActions
}) => {
    return (
        <tr className="border-b hover:bg-gray-50">
            {serialNumber && (
                <td className="px-4 py-3">
                    {index + 1}
                </td>
            )}

            {columns.map((column) => (
                <td
                    key={column.key}
                    className="px-4 py-3"
                >
                    {column.render
                        ? column.render(row)
                        : getNestedValue(
                            row,
                            column.key
                        )}
                </td>
            ))}

            {renderActions && (
                <td className="px-4 py-3">
                    {renderActions(row)}
                </td>
            )}
        </tr>
    );
};

export default TableRow;