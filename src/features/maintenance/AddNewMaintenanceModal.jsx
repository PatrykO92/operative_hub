import Button from "../../ui/Button";

import Modal from "../../ui/Modal";
import Maintenance from "./MachineMaintenance";

export default function AddNewMaintenanceModal() {
  return (
    <Modal>
      <Modal.Open opens="maintenance_schedule">
        <Button $size="smaller">Wartungsplan</Button>
      </Modal.Open>
      <Modal.Window name="maintenance_schedule">
        <Maintenance />
      </Modal.Window>
    </Modal>
  );
}
