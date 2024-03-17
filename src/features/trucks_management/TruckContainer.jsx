import styled, { css } from "styled-components";
import { MdDelete } from "react-icons/md";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import Order from "./Order";

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

const Input = styled.input`
  background-color: var(--color-brand-200);
  color: var(--color-brand-900);
  font-weight: 500;
  font-size: 1.8rem;
  padding: 0 0.2rem;
  border: 0;
  border-radius: var(--border-radius-sm);
`;

const StyledTruckContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 26.5rem;

  border: 1px solid var(--color-yellow-200);
  border-radius: var(--border-radius-sm);

  ${(props) =>
    props.$dragged &&
    css`
      background-color: var(--color-yellow-200);
      color: var(--color-yellow-200);
      border: 1px solid var(--color-yellow-200);
      opacity: 0.3;
    `}
`;

const StyledTruckLabel = styled.div`
  display: flex;
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
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background-color: var(--color-grey-200);
  gap: 1rem;
  padding: 0.2rem 0.8rem;
  border-radius: var(--border-radius-sm);
`;

export default function TruckContainer({
  truck,
  deleteTruck,
  updateTruck,
  orders,
}) {
  const [editMode, setEditMode] = useState(false);

  const ordersIds = useMemo(() => {
    return orders.map((order) => order.id);
  }, [orders]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({
    id: truck.id,
    data: { type: "truck", truck },
    disabled: editMode,
  });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  const checkedIfOrders = orders.length === 0;

  return (
    <StyledTruckContainer ref={setNodeRef} style={style} $dragged={isDragging}>
      <StyledTruckLabel
        {...attributes}
        {...listeners}
        onClick={() => {
          if (truck.id !== 0) setEditMode(true);
        }}
      >
        {!editMode && (
          <div>
            {truck.label === "Verfügbare Bestellungen" && truck.label}
            {truck.label !== "Verfügbare Bestellungen" && (
              <>
                <span>Fahrer: </span>
                {truck.label}
              </>
            )}
          </div>
        )}

        {editMode && (
          <div>
            <span>Fahrer: </span>
            <Input
              type="text"
              value={truck.label}
              onChange={(e) =>
                updateTruck({ id: truck.id, label: e.target.value })
              }
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          </div>
        )}
        {truck.id !== 0 && (
          <StyledDeleteButton onClick={() => deleteTruck(truck.id)}>
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
