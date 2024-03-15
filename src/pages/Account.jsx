import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Aktualisieren Sie Ihr Konto</Heading>

      <Row>
        <Heading as="h3">Benutzerdaten aktualisieren</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Kennwort aktualisieren</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
