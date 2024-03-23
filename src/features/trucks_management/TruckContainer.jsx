import styled, { css } from "styled-components";
import { MdDelete } from "react-icons/md";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";
import Order from "./ManagmentOrder";
import { useDroppable } from "@dnd-kit/core";

const StyledDeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: 0;
  padding: 0;
  transition: all 0.5s;

  &:hover {
    color: var(--color-red-700);
  }
`;

const StyledTruckContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-yellow-200);
  border-radius: var(--border-radius-sm);

  ${(props) =>
    props.$mainOrderList &&
    css`
      max-width: 200rem;
      height: 24rem;
      position: fixed;
      bottom: 1rem;
      right: 2rem;
      left: 28rem;
      z-index: 2;
    `}
`;

const StyledTruckLabel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-brand-700);
  color: var(--color-grey-50);
  font-weight: 500;
  font-size: 1.8rem;
  padding: 0.2rem 0.8rem;
  border-radius: var(--border-radius-sm) var(--border-radius-sm) 0 0;
`;

const StyledTruckBox = styled.div`
  height: 100%;
  min-height: 4rem;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background-color: var(--color-grey-200);
  gap: 0.4rem;
  padding: 0.5rem 0.8rem;
  border-radius: var(--border-radius-sm);
`;

export default function TruckContainer({
  truck,
  deleteTruck,
  isDeletingTruck,
  orders,
}) {
  const ordersIds = useMemo(() => {
    return orders.map((order) => order.id);
  }, [orders]);

  const { setNodeRef } = useDroppable({
    id: truck.id,
    data: { type: "truck", truck },
  });

  const checkedIfOrders = orders.length === 0;

  return (
    <StyledTruckContainer ref={setNodeRef} $mainOrderList={truck.label === "0"}>
      <StyledTruckLabel>
        {truck.label === "0" && "Verfügbare Bestellungen"}

        {truck.label !== "0" && (
          <>
            <div>
              <span>Ladedatum: </span>
              {truck.load_date}
            </div>
            <div>
              <span>Priority: </span>
              {truck.priority_number}
            </div>
            <div>
              <span>Fahrer: </span>
              {truck.label}
            </div>
          </>
        )}

        {truck.label !== "0" && (
          <StyledDeleteButton
            onClick={() => deleteTruck(truck.id)}
            disabled={isDeletingTruck}
          >
            <MdDelete />
          </StyledDeleteButton>
        )}
      </StyledTruckLabel>
      <StyledTruckBox>
        <SortableContext items={ordersIds}>
          {checkedIfOrders && "Bestellungen hier aufgeben"}
          {!checkedIfOrders &&
            orders.map((order) => <Order key={order.id} order={order} />)}
        </SortableContext>
      </StyledTruckBox>
    </StyledTruckContainer>
  );
}
