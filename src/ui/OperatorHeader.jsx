import Clock from "./Clock";
import Heading from "./Heading";
import Logo from "./Logo";

import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";
import SpinnerMini from "./SpinnerMini";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: 1px solid var(--color-yellow-200);
`;

export default function OperatorHeader() {
  const { user, isLoading } = useUser();

  if (isLoading) return <SpinnerMini />;

  const { full_name } = user;

  return (
    <Header>
      <Logo height="4rem" />
      <Heading as="h2">{full_name}</Heading>
      <Clock />
    </Header>
  );
}
