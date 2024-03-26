import ListOfUsers from "../features/authentication/ListOfUsers";
import Heading from "../ui/Heading";

function NewUsers() {
  return (
    <>
      <Heading as="h1">Benutzer</Heading>
      <ListOfUsers />
    </>
  );
}

export default NewUsers;
