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

export default function ContactWithAdmin() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Kontaktieren Sie den Administrator</Heading>
      <p>Das Konto muss vom Administrator aktiviert werden.</p>
      <StyledLink to="/login">Anmeldung</StyledLink>
    </LoginLayout>
  );
}
