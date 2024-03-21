import TableOperations from "../../ui/TableOperations";
import DatePicker from "./DatePicker";

export default function TruckManagmentOperations() {
  return (
    <TableOperations>
      <DatePicker filterField="date" />
    </TableOperations>
  );
}
