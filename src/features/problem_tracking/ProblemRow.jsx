import { styled } from "styled-components";

import SpinnerMini from "../../ui/SpinnerMini";
import Table from "../../ui/Table";
import useGetUserById from "../authentication/useGetUserById";

const Cell = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

export default function ProblemRow({ problem }) {
  const { created_at, title, description, who_reported, solved } = problem;

  const { user, isUserLoading } = useGetUserById(who_reported);

  return (
    <Table.Row>
      <Cell>{new Date(created_at).toLocaleString()}</Cell>
      <Cell>{isUserLoading ? <SpinnerMini /> : user?.full_name}</Cell>
      <Cell>{title}</Cell>
      <Cell>{description}</Cell>
      <Cell>{solved ? "Ja" : "Nein"}</Cell>
    </Table.Row>
  );
}
