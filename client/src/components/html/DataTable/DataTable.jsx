import EmptyState from "../EmptyState";
import LoadingState from "../LoadingState";

import TableHead from "./TableHead";
import TableBody from "./TableBody";

const DataTable = ({
    columns,
    data = [],
    loading = false,
    serialNumber = true,
    emptyTitle = "No Data Found",
    renderActions
}) => {

    if (loading) {
        return (
            <LoadingState />
        );
    }

    if (!data.length) {
        return (
            <EmptyState
                title={emptyTitle}
            />
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full">

                <TableHead
                    columns={columns}
                    serialNumber={serialNumber}
                    hasActions={!!renderActions}
                />

                <TableBody
                    data={data}
                    columns={columns}
                    serialNumber={serialNumber}
                    renderActions={renderActions}
                />
            </table>
        </div>
    );
};

export default DataTable;