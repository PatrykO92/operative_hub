import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Button from "./Button";
import OperatorHeader from "./OperatorHeader";
import Modal from "./Modal";
import Maintenance from "../features/maintenance/MachineMaintenance";
import AddNewProblemModal from "../features/problem_tracking/AddNewProblemModal";

const StyledAppOperatorLayout = styled.div`
  display: grid;
  grid-template-rows: 5rem auto 8rem;
  height: 100vh;
`;

const Main = styled.main`
  padding: 1rem;
  overflow-y: scroll;
  background-color: var(--color-grey-200);
`;

const BottomMenu = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--color-yellow-200);
`;

export default function AppOperatorLayout() {
  return (
    <StyledAppOperatorLayout>
      <OperatorHeader />
      <Main>
        <Outlet />
      </Main>
      <BottomMenu>
        <AddNewProblemModal />
        <Modal>
          <Modal.Open opens="maintenance_schedule">
            <Button>Wartungsplan</Button>
          </Modal.Open>
          <Modal.Window name="maintenance_schedule">
            <Maintenance />
          </Modal.Window>
        </Modal>
      </BottomMenu>
    </StyledAppOperatorLayout>
  );
}
