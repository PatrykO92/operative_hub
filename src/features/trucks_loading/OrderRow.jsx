import styled from "styled-components";

import { HiPencil, HiTrash } from "react-icons/hi2";
import CircleColor from "../../ui/CircleColor";
import { useState } from "react";
import CreateEditOrderForm from "./OrderForm";
import { useChangeColorStatus } from "../../hooks/useChangeColor";
import SpinnerMini from "../../ui/SpinnerMini";
import { useGetColorById } from "../../hooks/useGetColorById";
import { useDeleteOrder } from "./useDeleteOrder";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 0.4fr 1.5fr 1.5fr 0.4fr 0.4fr 0.4fr 0.4fr 0.1fr;
  column-gap: 0.4rem;
  align-items: center;
  padding: 0.5rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Cell = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

function OrderRow({ order }) {
  const {
    id: order_id,
    client_name,
    color: color_id,
    construction_site,
    packed_extra,
    project_date,
    project_number,
    truck_loaded,
    truck_side_nr,
  } = order;

  const [showForm, setShowForm] = useState(false);

  const { changeColor } = useChangeColorStatus();
  const { isLoadingColor, fetchedColor } = useGetColorById(color_id);
  const { isDeletingOrder, deleteOrder } = useDeleteOrder();

  if (isLoadingColor) return <SpinnerMini />;

  return (
    <>
      <TableRow role="row">
        <Cell>{project_number}</Cell>
        <Cell>{truck_side_nr}</Cell>
        <Cell>{client_name}</Cell>
        <Cell>{construction_site}</Cell>
        <Cell>{project_date}</Cell>
        <Cell>{packed_extra ? "Ja" : "Nein"}</Cell>
        <Cell>
          <CircleColor
            $main={fetchedColor.main_color}
            $secondary={fetchedColor.secondary_color}
          />
        </Cell>
        <Cell>{truck_loaded ? "Ja" : "Nein"}</Cell>
        <div>
          <button onClick={() => setShowForm((oldVal) => !oldVal)}>
            <HiPencil />
          </button>
          <button
            onClick={() => {
              deleteOrder(order_id, {
                onSuccess: () => {
                  changeColor({ color_id, status: true });
                },
              });
            }}
            disabled={isDeletingOrder}
          >
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && <CreateEditOrderForm orderToEdit={order} />}
    </>
  );
}

export default OrderRow;
