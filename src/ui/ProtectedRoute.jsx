import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-100);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuth } = useUser();

  useEffect(() => {
    if (!isAuth && !isLoading) navigate("login");
  }, [isAuth, isLoading, navigate]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuth) return children;
}
