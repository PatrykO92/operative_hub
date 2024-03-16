import styled from "styled-components";

import SpinnerMini from "../../ui/SpinnerMini";
import { useGetColorById } from "../../hooks/useGetColorById";
import SquareColor from "../../ui/SquareColor";
import Table from "../../ui/Table";

const Cell = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  padding: 0.5rem 0;
`;

function OperatorTableRow({ order }) {
  const {
    client_name,
    color: color_id,
    construction_site,
    packed_extra,
    project_date,
    project_number,
    truck_side_nr,
  } = order;

  const { isLoadingColor, fetchedColor } = useGetColorById(color_id);

  if (isLoadingColor) return <SpinnerMini />;

  return (
    <>
      <Table.Row>
        <Cell>{project_number}</Cell>
        <Cell>{truck_side_nr}</Cell>
        <Cell>{client_name}</Cell>
        <Cell>{construction_site}</Cell>
        <Cell>{project_date}</Cell>
        <Cell>{packed_extra ? "Ja" : "Nein"}</Cell>
        <Cell>
          <SquareColor
            $main={fetchedColor.main_color}
            $secondary={fetchedColor.secondary_color}
          />
        </Cell>
      </Table.Row>
    </>
  );
}

export default OperatorTableRow;