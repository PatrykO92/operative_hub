import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { Link } from "react-router-dom";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 40rem;
  align-content: center;
  justify-content: center;

  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const StyledLink = styled(Link)`
  color: var(--color-brand-700);
  text-align: center;
  margin-bottom: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Anmelden bei Ihrem Konto</Heading>
      <LoginForm />
      <StyledLink to="/signup">Neuen Account erstellen</StyledLink>
    </LoginLayout>
  );
}

export default Login;
