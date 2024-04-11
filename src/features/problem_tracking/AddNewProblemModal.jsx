import Row from "../../ui/Row";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import AddProblemForm from "./AddProblemForm";

export default function AddNewProblemModal() {
  return (
    <Row type="start">
      <Modal>
        <Modal.Open opens="add_problem">
          <Button>Add problem</Button>
        </Modal.Open>
        <Modal.Window name="add_problem">
          <AddProblemForm />
        </Modal.Window>
      </Modal>
    </Row>
  );
}
