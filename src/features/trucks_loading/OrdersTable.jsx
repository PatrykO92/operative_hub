import Spinner from "../../ui/Spinner";
import OrderRow from "./OrderRow";
import { useGetOrdersList } from "../../hooks/useGetOrdersList";
import { useSearchParams } from "react-router-dom";
import Table from "../../ui/Table";

export default function OrdersTable() {
  const { isLoadingOrders, orders } = useGetOrdersList();
  const [searchParams] = useSearchParams();

  if (isLoadingOrders) return <Spinner />;

  // FILTERING

  const filterValue = searchParams.get("loaded") || "all";

  let filteredOrders;
  if (filterValue === "all") filteredOrders = orders;
  if (filterValue === "not_loaded")
    filteredOrders = orders?.filter((item) => item.truck_loaded === false);
  if (filterValue === "loaded")
    filteredOrders = orders?.filter((item) => item.truck_loaded === true);

  // SORTING
  const sortBy = searchParams.get("sortBy") || "project_date-asc";
  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  let sortedOrders;
  if (field === "project_date") {
    sortedOrders = filteredOrders.sort(
      (a, b) => (new Date(a[field]) - new Date(b[field])) * modifier
    );
  } else {
    sortedOrders = filteredOrders.sort(
      (a, b) => (a[field] - b[field]) * modifier
    );
  }

  return (
    <Table $columns="0.4fr 0.4fr 1.5fr 1.5fr 0.4fr 0.4fr 0.4fr 0.4fr 0.1fr">
      <Table.Header>
        <div>Projekt</div>
        <div>Fuhre</div>
        <div>Klient</div>
        <div>Konstruktion</div>
        <div>Datum</div>
        <div>Extra</div>
        <div>Farbe</div>
        <div>Geladen</div>
      </Table.Header>
      <Table.Body
        data={sortedOrders}
        render={(order) => <OrderRow order={order} key={order.id} />}
      />
    </Table>
  );
}
