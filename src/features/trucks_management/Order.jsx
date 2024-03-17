import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled, { css } from "styled-components";
import { useGetColorById } from "../../hooks/useGetColorById";
import SpinnerMini from "../../ui/SpinnerMini";
import SquareColor from "../../ui/SquareColor";

const StyledOrder = styled.div`
  display: grid;
  grid-template-columns:
    minmax(5rem, 0.4fr) minmax(7rem, 0.4fr) minmax(20rem, 1.5fr)
    minmax(20rem, 1.5fr) minmax(10rem, 0.4fr) minmax(2rem, 0.1fr);
  align-items: center;
  padding: 0.5rem;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-300);
  cursor: grab;

  ${(props) =>
    props.$dragged &&
    css`
      opacity: 0.3;
    `}

  &:hover {
    border: 1px solid var(--color-grey-900);
  }
`;

const Cell = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  padding: 0.5rem 0;
`;

export default function Order({ order }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({
    id: order.id,
    data: { type: "order", order },
  });
  const style = { transition, transform: CSS.Transform.toString(transform) };
  const { isLoadingColor, fetchedColor } = useGetColorById(order.color);

  if (isLoadingColor) return <SpinnerMini />;

  return (
    <StyledOrder
      $dragged={isDragging}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Cell>{order.project_number}</Cell>
      <Cell>{order.truck_side_nr}</Cell>
      <Cell>{order.client_name}</Cell>
      <Cell>{order.construction_site}</Cell>
      <Cell>{order.project_date}</Cell>
      <Cell>
        <SquareColor
          height="2rem"
          width="2rem"
          $main={fetchedColor.main_color}
          $secondary={fetchedColor.secondary_color}
        />
      </Cell>
    </StyledOrder>
  );
}
