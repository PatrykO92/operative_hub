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
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    } else if (!isLoading) {
      if (!user?.app_role) navigate("successfully_registered");
      if (user?.app_role === "not_assigned") navigate("contact_admin");
      if (user?.app_role === "operator") navigate("/operator");
      if (user?.app_role === "crane") navigate("/crane");
      if (user?.app_role === "information_board")
        navigate("/information_board");
    }
  }, [user, isLoading, navigate]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  const isAllowAdminDashboard =
    user?.app_role === "admin" ||
    user?.app_role === "supervisor" ||
    user?.app_role === "mechanic" ||
    user?.app_role === "foreman";

  if (isAllowAdminDashboard) return children;
}
