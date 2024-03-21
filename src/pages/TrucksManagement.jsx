import styled from "styled-components";
import TruckManagmentOperations from "../features/trucks_management/TruckManagmentOperations";
import TrucksManagementPanel from "../features/trucks_management/TrucksManagementPanel";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const StyledTrucksManagment = styled.div`
  position: sticky;
  top: -2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-grey-100);
`;

export default function TrucksManagement() {
  return (
    <>
      <StyledTrucksManagment>
        <Heading as="h1">LKW-Management</Heading>
        <TruckManagmentOperations />
      </StyledTrucksManagment>
      <Row>
        <TrucksManagementPanel />
      </Row>
    </>
  );
}
