import CraneTable from "../features/crane/CraneTable";
import Operations from "../features/trucks_management/TruckManagmentOperations";
import Row from "../ui/Row";

export default function Crane() {
  return (
    <Row>
      <Operations />
      <CraneTable />
    </Row>
  );
}
