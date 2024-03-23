import SpinnerMini from "../../ui/SpinnerMini";
import { useGetColorById } from "../../hooks/useGetColorById";
import { useEditOrder } from "../../hooks/useEditOrder";
import SquareColor from "../../ui/SquareColor";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import ConfirmTruckLoaded from "./ConfirmTruckLoaded";
import { CraneCell, CraneCommonRow } from "../../ui/CraneTable";

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
      <CraneCommonRow>
        <CraneCell>{project_number}</CraneCell>
        <CraneCell>{truck_side_nr}</CraneCell>
        <CraneCell>{client_name}</CraneCell>
        <CraneCell>{construction_site}</CraneCell>
        <CraneCell>{project_date}</CraneCell>
        <CraneCell>
          <SquareColor
            $main={fetchedColor.main_color}
            $secondary={fetchedColor.secondary_color}
            $label={fetchedColor.label}
            $labelColor={fetchedColor.label_color}
          />
        </CraneCell>

        <CraneCell>
          <Modal>
            <Modal.Open opens="change-to-loaded">
              <Button $size="small">Geladen</Button>
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
                  $label={fetchedColor.label}
                  $labelColor={fetchedColor.label_color}
                />
              </ConfirmTruckLoaded>
            </Modal.Window>
          </Modal>
        </CraneCell>
      </CraneCommonRow>
    </>
  );
}

export default CraneTableRow;
