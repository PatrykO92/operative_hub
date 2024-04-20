import Heading from "../ui/Heading";
import Info from "../ui/Info";
import TestInfo from "../ui/TestInfo";

export default function Dashboard() {
  return (
    <>
      <TestInfo />
      <Heading as="h1">Willkommen im Operative Hub</Heading>
      <Info />
    </>
  );
}
