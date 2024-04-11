import Row from "../ui/Row";
import Heading from "../ui/Heading";
import ColorList from "../features/settings/ColorList";

export default function Settings() {
  return (
    <>
      <Heading as="h1">Einstellungen</Heading>

      <Row>
        <ColorList />
      </Row>
    </>
  );
}
