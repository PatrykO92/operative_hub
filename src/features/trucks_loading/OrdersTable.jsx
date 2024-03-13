import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import OrderRow from "./OrderRow";
import { useGetOrdersList } from "./useGetOrdersList";
import { useSearchParams } from "react-router-dom";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.6rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.4fr 0.4fr 1.5fr 1.5fr 0.4fr 0.4fr 0.4fr 0.4fr 0.1fr;
  column-gap: 0.4rem;
  align-items: center;

  background-color: var(--color-grey-200);
  border-bottom: 1px solid var(--color-grey-300);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 0.5rem;
`;

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
    <Table role="table">
      <TableHeader role="row">
        <div>Projekt</div>
        <div>Fuhre</div>
        <div>Klient</div>
        <div>Konstruktion</div>
        <div>Datum</div>
        <div>Extra</div>
        <div>Farbe</div>
        <div>Geladen</div>
      </TableHeader>
      {sortedOrders?.map((order) => (
        <OrderRow order={order} key={order.id} />
      ))}
    </Table>
  );
}
