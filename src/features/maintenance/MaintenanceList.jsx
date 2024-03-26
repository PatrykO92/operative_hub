import useGetMaintenanceList from "./useGetMaintenanceList";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import MaintenanceRow from "./MaintenanceRow";

export default function MaintenanceList({ fullList = false }) {
  const { maintenance_list, maintenanceLoading } = useGetMaintenanceList();

  if (maintenanceLoading) return <Spinner />;

  let columns = ["1fr", "1fr", "1fr"]; // Default columns

  if (fullList) {
    columns.push("1fr"); // Add an extra column for ID
  }

  const sortedMaintenanceList = maintenance_list.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <Table $columns={columns.join(" ")}>
      <Table.Header>
        <div>Datum</div>
        <div>Was</div>
        <div>Wer</div>
        {fullList && <div>Maschine</div>}
      </Table.Header>
      <Table.Body
        data={sortedMaintenanceList}
        render={(entry) => (
          <MaintenanceRow entry={entry} key={entry.id} fullList={fullList} />
        )}
      />
    </Table>
  );
}
