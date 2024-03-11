import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateEditOrderForm from "./OrderForm";

export default function AddOrder() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="order-form">
          <Button>Neue Bestellung hinzufügen</Button>
        </Modal.Open>
        <Modal.Window name="order-form">
          <CreateEditOrderForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
