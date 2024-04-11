import styled from "styled-components";

import { StyledLink } from "./StyledLink";

const StyledInfo = styled.div``;

export default function Info() {
  const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL;

  return (
    <StyledInfo>
      <div>
        - Um eine neue Bestellung hinzuzufügen, gehen Sie zu{" "}
        <StyledLink to="/trucks_loading">LKWs Laden</StyledLink>.
      </div>
      <div>
        - Hinzugefügte Aufträge können Sie im Panel{" "}
        <StyledLink to="/trucks_loading">LKWs-Verwaltung</StyledLink> verwalten.
      </div>
      <div>
        - Bitte melden Sie alle Probleme mit der Anwendung per E-Mail:{" "}
        {supportEmail}
      </div>
    </StyledInfo>
  );
}
