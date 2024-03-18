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
  const { isLoading, isAuth, appRole } = useUser();

  const isAllowAdminDashboard =
    appRole === "admin" ||
    appRole === "supervisor" ||
    appRole === "mechanic" ||
    appRole === "foreman";

  useEffect(() => {
    if (!isAuth && !isLoading) navigate("/login");
    if (appRole === "operator") navigate("/operator");
    if (appRole === "crane") navigate("/crane");
    if (appRole === "information_screen") navigate("/information_board");
  }, [isAuth, appRole, isLoading, navigate]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuth && isAllowAdminDashboard) return children;
}
