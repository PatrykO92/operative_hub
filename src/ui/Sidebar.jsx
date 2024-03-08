import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}
