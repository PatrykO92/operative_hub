import styled from "styled-components";

import { HiPencil, HiTrash } from "react-icons/hi2";
import CreateEditOrderForm from "./OrderForm";
import { useChangeColorStatus } from "../../hooks/useChangeColor";
import SpinnerMini from "../../ui/SpinnerMini";
import { useGetColorById } from "../../hooks/useGetColorById";
import useArchiveOrder from "../../hooks/useArchiveOrder";
import SquareColor from "../../ui/SquareColor";
import Modal from "../../ui/Modal";
import ButtonIcon from "../../ui/ButtonIcon";
import Table from "../../ui/Table";
import ConfirmArchive from "../../ui/ConfirmArchive";

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
  const { isArchivingOrder, archiveOrder } = useArchiveOrder();

  if (isLoadingColor) return <SpinnerMini />;

  return (
    <>
      <Table.Row>
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
            $label={fetchedColor.label}
            $labelColor={fetchedColor.label_color}
          />
        </Cell>
        <Cell>{truck_loaded ? "Ja" : "Nein"}</Cell>
        <div>
          <Modal>
            <Modal.Open opens="edit-window">
              <ButtonIcon>
                <HiPencil />
              </ButtonIcon>
            </Modal.Open>
            <Modal.Window name="edit-window">
              <CreateEditOrderForm orderToEdit={order} />
            </Modal.Window>

            <Modal.Open opens="archive-window">
              <ButtonIcon>
                <HiTrash />
              </ButtonIcon>
            </Modal.Open>
            <Modal.Window name="archive-window">
              <ConfirmArchive
                disabled={isArchivingOrder}
                resource={`${project_number}`}
                onConfirm={() => {
                  changeColor(
                    { color_id, status: true },
                    {
                      onSuccess: () => {
                        archiveOrder(order_id);
                      },
                    }
                  );
                }}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default OrderRow;
