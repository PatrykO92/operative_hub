import CraneTable from "../features/crane/CraneTable";
import Operations from "../features/trucks_management/TruckManagmentOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function Crane() {
  return (
    <Row>
      <Row type="horizontal">
        <Heading as="h2">Crane</Heading>
        <Operations />
      </Row>
      <Row>
        <CraneTable />
      </Row>
    </Row>
  );
}
