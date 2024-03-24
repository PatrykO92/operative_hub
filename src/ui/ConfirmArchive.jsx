import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmArchive = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }
  & div {
    display: flex;
    justify-content: center;
    gap: 1.2rem;
  }

  & div:last-child {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmArchive({
  children,
  resource,
  onConfirm,
  disabled,
  onCloseModal,
}) {
  function handleConfirmClick() {
    onConfirm();
    onCloseModal();
  }

  return (
    <StyledConfirmArchive>
      <Heading type="h3">Archive [{resource}]</Heading>
      <p>
        Sind Sie sicher, dass Sie die Projektnummer [{resource}] archivieren
        möchten?
      </p>
      <div>{children && children}</div>
      <div>
        <Button $variation="secondary" onClick={onCloseModal}>
          Stornieren
        </Button>
        <Button
          $variation="danger"
          onClick={handleConfirmClick}
          disabled={disabled}
        >
          Archiv
        </Button>
      </div>
    </StyledConfirmArchive>
  );
}

export default ConfirmArchive;
