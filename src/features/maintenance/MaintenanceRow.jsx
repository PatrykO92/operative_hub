import styled from "styled-components";
import Table from "../../ui/Table";
import useGetUserById from "../authentication/useGetUserById";

const Cell = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

function MaintenanceRow({ entry, fullList }) {
  const { created_at, type, who, user_id } = entry;

  const { user, isUserLoading } = useGetUserById(user_id);

  return (
    <>
      <Table.Row>
        <Cell>{new Date(created_at).toLocaleDateString()}</Cell>
        <Cell>{type}</Cell>
        <Cell>{who}</Cell>
        {fullList && (
          <Cell>
            {isUserLoading ? "Loading..." : user?.full_name || "Unknown"}
          </Cell>
        )}
      </Table.Row>
    </>
  );
}

export default MaintenanceRow;
