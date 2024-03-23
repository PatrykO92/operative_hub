import styled from "styled-components";
import Button from "./Button";

const ErrorComponentWrapper = styled.div`
  margin: auto auto;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  background-color: var(--color-red-100);
  border: 1px solid var(--color-red-700);
  border-radius: 4px;
  padding: 20px;
  box-shadow: var(--shadow-sm);
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
  color: var(--color-grey-900);
`;

const Message = styled.p`
  font-size: 1.6rem;
`;

const ErrorComponent = () => {
  function refreshPage() {
    window.location.reload();
  }

  return (
    <ErrorComponentWrapper>
      <Title>Etwas läuft schief</Title>
      <Message>Bitte aktualisieren Sie die Seite</Message>
      <Button $size="large" onClick={() => refreshPage()}>
        Aktualisierung
      </Button>
    </ErrorComponentWrapper>
  );
};

export default ErrorComponent;
