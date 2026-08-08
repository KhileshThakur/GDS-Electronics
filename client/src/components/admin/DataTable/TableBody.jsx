import TableRow from "./TableRow";

const TableBody = ({
    data,
    columns,
    serialNumber,
    renderActions
}) => {
    return (
        <tbody>
            {data.map((row, index) => (
                <TableRow
                    key={row._id}
                    row={row}
                    index={index}
                    columns={columns}
                    serialNumber={serialNumber}
                    renderActions={renderActions}
                />
            ))}
        </tbody>
    );
};

export default TableBody;