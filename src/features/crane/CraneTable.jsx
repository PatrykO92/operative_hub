import { useGetOrdersList } from "../../hooks/useGetOrdersList";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CraneTableRow from "./CraneTableRow";

export default function CraneTable() {
  const { orders, isLoadingOrders } = useGetOrdersList(true);
  if (isLoadingOrders) return <Spinner />;

  const notLoadedOrders = orders.filter((order) => {
    if (order.truck_loaded === false) return order;
  });

  return (
    <>
      <Table $columns={"0.4fr 0.4fr 1.5fr 1.5fr 0.4fr 0.4fr 0.4fr"}>
        <Table.Header>
          <div>Projekt</div>
          <div>Fuhre</div>
          <div>Klient</div>
          <div>Konstruktion</div>
          <div>Datum</div>
          <div>Farbe</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={notLoadedOrders}
          render={(order) => <CraneTableRow key={order.id} order={order} />}
        />
      </Table>
    </>
  );
}
