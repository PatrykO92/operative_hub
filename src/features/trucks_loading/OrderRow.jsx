import styled from "styled-components";

import { HiPencil, HiTrash } from "react-icons/hi2";
import CreateEditOrderForm from "./OrderForm";
import { useChangeColorStatus } from "../../hooks/useChangeColor";
import SpinnerMini from "../../ui/SpinnerMini";
import { useGetColorById } from "../../hooks/useGetColorById";
import { useDeleteOrder } from "./useDeleteOrder";
import SquareColor from "../../ui/SquareColor";
import Modal from "../../ui/Modal";
// import Button from "../../ui/Button";
// import Row from "../../ui/Row";
import ConfirmDelete from "../../ui/ConfirmDelete";

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
          <SquareColor
            $main={fetchedColor.main_color}
            $secondary={fetchedColor.secondary_color}
          />
        </Cell>
        <Cell>{truck_loaded ? "Ja" : "Nein"}</Cell>
        <div>
          <Modal>
            <Modal.Open opens="edit-window">
              <button>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="edit-window">
              <CreateEditOrderForm orderToEdit={order} />
            </Modal.Window>

            <Modal.Open opens="delete-window">
              <button>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="delete-window">
              <ConfirmDelete
                disabled={isDeletingOrder}
                resource={`${project_number}`}
                onConfirm={() => {
                  deleteOrder(order_id, {
                    onSuccess: () => {
                      changeColor({ color_id, status: true });
                    },
                  });
                }}
              />
            </Modal.Window>
          </Modal>
        </div>
      </TableRow>
    </>
  );
}

export default OrderRow;
