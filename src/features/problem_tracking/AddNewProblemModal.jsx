import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import AddProblem from "./AddProblem";

export default function AddNewProblemModal() {
  return (
    <Modal>
      <Modal.Open opens="add_problem">
        <Button>Add problem</Button>
      </Modal.Open>
      <Modal.Window name="add_problem">
        <AddProblem />
      </Modal.Window>
    </Modal>
  );
}
