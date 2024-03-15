import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Clock from "./Clock";
import Heading from "./Heading";
import Logo from "./Logo";
import Button from "./Button";

const StyledAppOperatorLayout = styled.div`
  display: grid;
  grid-template-rows: 5rem auto 10rem;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: 1px solid var(--color-yellow-200);
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
      <Header>
        <Logo height="4rem" />
        <Heading as="h2">PBX Polyben PB12</Heading>
        <Clock />
      </Header>
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
