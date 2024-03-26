import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import { useListOfUsers } from "./useListOfUsers";
import ListOfUsersRow from "./ListOfUsersRow";

export default function ListOfUsers() {
  const { users, isLoading } = useListOfUsers();

  if (isLoading) return <Spinner />;

  return (
    <Table $columns="1fr 1fr">
      <Table.Header>
        <div>Full_name</div>
        <div>App_role</div>
      </Table.Header>
      <Table.Body
        data={users}
        render={(user) => <ListOfUsersRow key={user.id} user={user} />}
      />
    </Table>
  );
}
