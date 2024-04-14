import { styled } from "styled-components";
import { FaEdit } from "react-icons/fa";

import SpinnerMini from "../../ui/SpinnerMini";
import ConfirmSolved from "../../ui/ConfirmSolved";
import Table from "../../ui/Table";
import ButtonIcon from "../../ui/ButtonIcon";
import Modal from "../../ui/Modal";

import useGetUserById from "../authentication/useGetUserById";
import useEditProblem from "./useEditProblem";

const Cell = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

export default function ProblemRow({ problem }) {
  const { id, created_at, title, description, who_reported, solved } = problem;

  const { isUpdating, editProblem } = useEditProblem();
  const { user, isUserLoading } = useGetUserById(who_reported);

  return (
    <Table.Row>
      <Cell>{new Date(created_at).toLocaleString()}</Cell>
      <Cell>{isUserLoading ? <SpinnerMini /> : user?.full_name}</Cell>
      <Cell>{title}</Cell>
      <Cell>{description}</Cell>
      <Cell>{solved ? "Ja" : "Nein"}</Cell>
      <Modal>
        <Modal.Open opens="update-window">
          <ButtonIcon disabled={isUpdating || isUserLoading}>
            <FaEdit />
          </ButtonIcon>
        </Modal.Open>
        <Modal.Window name="update-window">
          <ConfirmSolved
            resource={title}
            onConfirm={() => {
              editProblem({ id, value: { solved: true } });
            }}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}
