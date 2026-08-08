const TableHead = ({
    columns,
    hasActions,
    serialNumber
}) => {
    return (
        <thead className="bg-gray-100">
            <tr>
                {serialNumber && (
                    <th className="px-4 py-3 border-b">
                        #
                    </th>
                )}

                {columns.map((column) => (
                    <th
                        key={column.key}
                        className="px-4 py-3 text-left border-b"
                    >
                        {column.label}
                    </th>
                ))}

                {hasActions && (
                    <th className="px-4 py-3 border-b">
                        Actions
                    </th>
                )}
            </tr>
        </thead>
    );
};

export default TableHead;