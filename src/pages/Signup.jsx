import styled from "styled-components";
import SignupForm from "../features/authentication/SignupForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Neuen Account erstellen</Heading>
      <SignupForm />
    </LoginLayout>
  );
}

export default Login;
