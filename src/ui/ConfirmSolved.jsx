import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmSolved = styled.div`
  width: 30rem;
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

export default function ConfirmSolved({
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
    <StyledConfirmSolved>
      <Heading type="h3">Benachrichtigung &quot;{resource}&quot;</Heading>
      <p>Problem &quot;{resource}&quot; ist gelöst?</p>
      <div>
        <Button $variation="secondary" onClick={onCloseModal}>
          Stornieren
        </Button>
        <Button
          $variation="green"
          onClick={handleConfirmClick}
          disabled={disabled}
        >
          Gelöst
        </Button>
      </div>
    </StyledConfirmSolved>
  );
}
