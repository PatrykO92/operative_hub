import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ColorPickerForm from "./ColorPickerForm";

const ColorPicker = () => {
  return (
    <Modal>
      <Modal.Open opens="color-picker">
        <Button $size="smaller">Neue Farbe</Button>
      </Modal.Open>
      <Modal.Window name="color-picker">
        <ColorPickerForm />
      </Modal.Window>
    </Modal>
  );
};

export default ColorPicker;
