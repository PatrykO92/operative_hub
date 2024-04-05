import styled from "styled-components";
import Table from "../../ui/Table";
import { StyledSelect } from "../../ui/Select";
import useUpdateUserRole from "./useUpdateUserRole";
import { useState } from "react";

const Cell = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-700);
  font-family: "Sono";
  margin-top: 0.5rem;
`;

export default function ListOfUsersRow({ user }) {
  const { updateUserRole, isUpdating } = useUpdateUserRole();
  const [value, setValue] = useState(user.app_role);

  function onChange(e) {
    setValue(e.target.value);
    updateUserRole(
      { id: user.id, newRole: e.target.value },
      { onError: () => setValue(user.app_role) }
    );
  }

  return (
    <Table.Row>
      <Cell>{user.full_name}</Cell>
      <Cell>
        <StyledSelect disabled={isUpdating} value={value} onChange={onChange}>
          <option value="not_assigned">Nicht zugeordnet</option>
          <option value="information_board">Informationsbildschirm</option>
          <option value="operator">Maschinenbediener</option>
          <option value="crane">Kranfahrer</option>
          <option value="foreman">Vorarbeiter</option>
          <option value="mechanic">Mechaniker</option>
          <option value="supervisor">Supervisor</option>
          <option value="admin">Admin</option>
        </StyledSelect>
      </Cell>
      <Cell></Cell>
    </Table.Row>
  );
}
