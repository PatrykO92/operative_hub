import { useGetOrdersList } from "../../hooks/useGetOrdersList";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import OperatorTableRow from "./OperatorTableRow";

export default function OperatorTable() {
  const { orders, isLoadingOrders } = useGetOrdersList(true);

  if (isLoadingOrders) return <Spinner />;

  return (
    <>
      <Table $columns={"0.4fr 0.4fr 1.5fr 1.5fr 0.4fr 0.4fr 0.4fr"}>
        <Table.Header>
          <div>Projekt</div>
          <div>Fuhre</div>
          <div>Klient</div>
          <div>Konstruktion</div>
          <div>Datum</div>
          <div>Extra</div>
          <div>Farbe</div>
        </Table.Header>
        <Table.Body
          data={orders}
          render={(order) => <OperatorTableRow key={order.id} order={order} />}
        />
      </Table>
    </>
  );
}
