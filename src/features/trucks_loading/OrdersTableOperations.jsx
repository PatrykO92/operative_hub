import TableOperations from "../../../unused_assets/ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

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
      <SortBy
        options={[
          { value: "project_date-asc", label: "Daten aufsteigend sortieren" },
          { value: "project_date-des", label: "Daten absteigend sortieren" },
        ]}
      />
    </TableOperations>
  );
}
