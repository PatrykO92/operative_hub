import { useState } from "react";
import OrdersTable from "../features/trucks_loading/OrdersTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import CreateOrderForm from "../features/trucks_loading/OrderForm";

export default function TrucksLoading() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">LKWs laden</Heading>
        <p>Filtern / Sortieren</p>
      </Row>
      <Row>
        <OrdersTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Neue Bestellung hinzufügen
        </Button>
        {showForm && <CreateOrderForm />}
      </Row>
    </>
  );
}
