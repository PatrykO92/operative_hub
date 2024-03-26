import styled from "styled-components";
import Table from "../../ui/Table";

const Cell = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  padding: 0.5rem 0;
`;

export default function ListOfUsersRow({ user }) {
  return (
    <Table.Row>
      <Cell>{user.full_name}</Cell>
      <Cell>{user.app_role}</Cell>
    </Table.Row>
  );
}
