import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { StyledLink } from "../ui/StyledLink";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 40rem;
  align-content: center;
  justify-content: center;

  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

export default function SuccessfullyRegistered() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Erfolgreich registriert</Heading>
      <p>
        Die Registrierung war erfolgreich, überprüfen Sie Ihre E-Mail, um Ihr
        Konto zu aktivieren. Das Konto muss auch vom Administrator aktiviert
        werden.
      </p>
      <StyledLink to="/login">Anmeldung</StyledLink>
    </LoginLayout>
  );
}
