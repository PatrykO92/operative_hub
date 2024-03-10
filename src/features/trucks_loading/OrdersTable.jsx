import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import OrderRow from "./OrderRow";
import { useGetOrdersList } from "./useGetOrdersList";
import ErrorFallback from "../../ui/ErrorFallback";

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
  const { isLoadingOrders, orders, orderListError } = useGetOrdersList();

  if (isLoadingOrders) return <Spinner />;

  if (orderListError) return <ErrorFallback>Problem jakiś!</ErrorFallback>;

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
      {orders.map((order) => (
        <OrderRow order={order} key={order.id} />
      ))}
    </Table>
  );
}
