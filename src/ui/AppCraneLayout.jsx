import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Button from "./Button";
import CraneHeader from "./CraneHeader";
import Modal from "./Modal";

const StyledAppCraneLayout = styled.div`
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

export default function AppCraneLayout() {
  return (
    <StyledAppCraneLayout>
      <CraneHeader />
      <Main>
        <Outlet />
      </Main>
      <BottomMenu>
        <Modal>
          <Modal.Open opens="report_a_problem">
            <Button>Problem melden</Button>
          </Modal.Open>
          <Modal.Window name="report_a_problem">
            <div>Hello Problem</div>
          </Modal.Window>
        </Modal>
      </BottomMenu>
    </StyledAppCraneLayout>
  );
}
