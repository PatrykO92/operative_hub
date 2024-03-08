import styled from "styled-components";

import { HiPencil, HiTrash } from "react-icons/hi2";
import Spinner from "../../ui/Spinner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { removeOrderById } from "../../services/apiOrdersList";
import { getColorById } from "../../services/apiColorsList";
import CircleColor from "../../ui/CircleColor";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 0.4fr 1.5fr 1.5fr 0.4fr 0.4fr 0.4fr 0.4fr 0.1fr;
  column-gap: 0.4rem;
  align-items: center;
  padding: 0.5rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Cell = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

function OrderRow({ order }) {
  const {
    id: order_id,
    client_name,
    color: color_id,
    construction_site,
    packed_extra,
    project_date,
    project_numer,
    truck_loaded,
    truck_side_nr,
  } = order;

  const { isLoading: isDeleting, mutate } = useMutation({
    queryKey: ["orders"],
    mutationFn: (id) => removeOrderById(id),
  });

  const { isLoading, data: color } = useQuery({
    queryKey: ["colors"],
    queryFn: () => getColorById(color_id),
  });

  if (isLoading) return <Spinner />;

  return (
    <>
      <TableRow role="row">
        <Cell>{project_numer}</Cell>
        <Cell>{truck_side_nr}</Cell>
        <Cell>{client_name}</Cell>
        <Cell>{construction_site}</Cell>
        <Cell>{project_date}</Cell>
        <Cell>{packed_extra ? "Ja" : "Nein"}</Cell>
        <Cell>
          <CircleColor
            $main={color.main_color}
            $secondary={color.secondary_color}
          />
        </Cell>
        <Cell>{truck_loaded ? "Ja" : "Nein"}</Cell>
        <div>
          <button>
            <HiPencil />
          </button>
          <button onClick={() => mutate(order_id)} disabled={isDeleting}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
    </>
  );
}

export default OrderRow;
