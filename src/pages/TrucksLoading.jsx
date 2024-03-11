import AddOrder from "../features/trucks_loading/AddOrder";
import OrdersTable from "../features/trucks_loading/OrdersTable";
import OrdersTableOperations from "../features/trucks_loading/OrdersTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function TrucksLoading() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">LKWs laden</Heading>
        <OrdersTableOperations />
      </Row>
      <Row>
        <OrdersTable />
        <AddOrder />
      </Row>
    </>
  );
}
