import TrucksManagementPanel from "../features/trucks_management/TrucksManagementPanel";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function TrucksManagement() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">LKW-Management</Heading>
      </Row>
      <Row>
        <TrucksManagementPanel />
      </Row>
    </>
  );
}
