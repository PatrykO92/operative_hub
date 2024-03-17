import styled from "styled-components";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";

const StyledConfirmTruckLoaded = styled.div`
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

function ConfirmTruckLoaded({
  children,
  order,
  onConfirm,
  disabled,
  onCloseModal,
}) {
  function handleConfirmClick() {
    onConfirm();
    onCloseModal();
  }

  return (
    <StyledConfirmTruckLoaded>
      <Heading type="h3">Projekt {order.project_number}</Heading>
      <p>
        <span>{order.project_number}</span> -<span>{order.client_name}</span> -{" "}
        <span>{order.construction_site}</span>
        <span style={{ display: "block" }}>
          Sind Sie sicher, dass Sie eine Bestellung mit dieser Farbe geladen
          haben?
        </span>
      </p>
      <div>{children && children}</div>
      <div>
        <Button $variation="secondary" onClick={onCloseModal}>
          Stornieren
        </Button>
        <Button onClick={handleConfirmClick} disabled={disabled}>
          Geladen
        </Button>
      </div>
    </StyledConfirmTruckLoaded>
  );
}

export default ConfirmTruckLoaded;
