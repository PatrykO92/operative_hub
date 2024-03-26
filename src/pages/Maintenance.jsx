import MaintenanceList from "../features/maintenance/MaintenanceList";
import Heading from "../ui/Heading";

export default function Maintenance() {
  return (
    <>
      <Heading as="h1">Maschinenwartung</Heading>
      <MaintenanceList fullList={true} />
    </>
  );
}
