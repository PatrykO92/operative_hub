import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Button from "./Button";
import OperatorHeader from "./OperatorHeader";

const StyledAppOperatorLayout = styled.div`
  display: grid;
  grid-template-rows: 5rem auto 10rem;
  height: 100vh;
`;

const Main = styled.main`
  padding: 2rem;
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
        <Button>PLACEHOLDER</Button>
        <Button>PLACEHOLDER</Button>
        <Button>PLACEHOLDER</Button>
        <Button>PLACEHOLDER</Button>
      </BottomMenu>
    </StyledAppOperatorLayout>
  );
}
