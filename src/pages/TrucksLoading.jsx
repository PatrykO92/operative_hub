import OrdersTable from "../features/trucks_loading/OrdersTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function TrucksLoading() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">LKWs laden</Heading>
        <p>Filtern / Sortieren</p>
      </Row>
      <Row>
        <OrdersTable />
      </Row>
    </>
  );
}
