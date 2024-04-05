import { useGetOrdersList } from "../../hooks/useGetOrdersList";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import OperatorTableRow from "./OperatorTableRow";

export default function OperatorTable() {
  const { orders, isLoadingOrders } = useGetOrdersList(true);

  if (isLoadingOrders) return <Spinner />;

  return (
    <>
      <Table
        $columns={
          "minmax(7rem, 0.4fr) minmax(6rem, 0.4fr) minmax(14rem, 1.5fr) minmax(14rem, 1.5fr) minmax(8.5rem, 0.4fr) minmax(4rem, 0.2fr) minmax(4rem, 0.1fr) minmax(3rem, 0.1fr)"
        }
      >
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
