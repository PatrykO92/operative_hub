import styled from "styled-components";

const StyledInfo = styled.div`
  background-color: var(--color-grey-0);
  padding: 2rem;
  border-radius: var(--border-radius-sm);
  max-width: 80rem;
  line-height: 1.8;
`;

export default function Info() {
  const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL;

  return (
    <StyledInfo>
      <h3>Diese App befindet sich noch in der Entwicklung</h3>
      <div>
        Bitte melden Sie alle Probleme mit der Anwendung per E-Mail:{" "}
        {supportEmail}
      </div>
    </StyledInfo>
  );
}
