import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

export default function OrdersTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="loaded"
        options={[
          { value: "all", label: "Alle" },
          { value: "not_loaded", label: "Nicht geladen" },
          { value: "loaded", label: "Geladen" },
        ]}
      />
    </TableOperations>
  );
}
