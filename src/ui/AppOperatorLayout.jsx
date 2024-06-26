import { Outlet } from "react-router-dom";
import styled from "styled-components";

import OperatorHeader from "./OperatorHeader";

import AddNewProblemModal from "../features/problem_tracking/AddNewProblemModal";
import AddNewMaintenanceModal from "../features/maintenance/AddNewMaintenanceModal";

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
        <AddNewMaintenanceModal />
      </BottomMenu>
    </StyledAppOperatorLayout>
  );
}
