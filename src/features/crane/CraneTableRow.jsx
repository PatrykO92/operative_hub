import styled from "styled-components";

import SpinnerMini from "../../ui/SpinnerMini";
import { useGetColorById } from "../../hooks/useGetColorById";
import { useEditOrder } from "../../hooks/useEditOrder";
import SquareColor from "../../ui/SquareColor";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import ConfirmTruckLoaded from "./ConfirmTruckLoaded";

const Cell = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  padding: 0.5rem 0;
`;

function CraneTableRow({ order }) {
  const {
    id: editId,
    client_name,
    color: color_id,
    construction_site,
    project_date,
    project_number,
    truck_side_nr,
  } = order;
  const { isLoadingColor, fetchedColor } = useGetColorById(color_id);

  const { editOrder, isEditing } = useEditOrder();

  if (isLoadingColor) return <SpinnerMini />;

  return (
    <>
      <Table.Row>
        <Cell>{project_number}</Cell>
        <Cell>{truck_side_nr}</Cell>
        <Cell>{client_name}</Cell>
        <Cell>{construction_site}</Cell>
        <Cell>{project_date}</Cell>
        <Cell>
          <SquareColor
            $main={fetchedColor.main_color}
            $secondary={fetchedColor.secondary_color}
          />
        </Cell>
        <Cell>
          <Modal>
            <Modal.Open opens="change-to-loaded">
              <Button>Geladen</Button>
            </Modal.Open>
            <Modal.Window name="change-to-loaded">
              <ConfirmTruckLoaded
                disabled={isEditing}
                order={order}
                onConfirm={() => {
                  editOrder({ formData: { truck_loaded: true }, editId });
                }}
              >
                <SquareColor
                  $main={fetchedColor.main_color}
                  $secondary={fetchedColor.secondary_color}
                />
              </ConfirmTruckLoaded>
            </Modal.Window>
          </Modal>
        </Cell>
      </Table.Row>
    </>
  );
}

export default CraneTableRow;
