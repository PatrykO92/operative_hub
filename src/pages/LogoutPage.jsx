import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { useLogout } from "../features/authentication/useLogout";
import Button from "../ui/Button";

const LogoutPageLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 40rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function LogoutPage() {
  const { logout } = useLogout();

  return (
    <LogoutPageLayout>
      <Logo />
      <Heading as="h4">Melden Sie sich von Ihrem Konto ab</Heading>
      <Button onClick={logout}>Ausloggen</Button>
    </LogoutPageLayout>
  );
}

export default LogoutPage;
