import styled from "styled-components";
import MaintenanceList from "./MaintenanceList";
import AddNewMaintenance from "./AddNewMaintenance";

const StyledMaintenance = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem;
  min-width: 70rem;
`;

const StyledMaintenanceList = styled.div`
  max-height: 20rem;
  overflow-y: scroll;
  padding: 0.3rem;
`;

export default function MachineMaintenance() {
  return (
    <StyledMaintenance>
      <StyledMaintenanceList>
        <MaintenanceList />
      </StyledMaintenanceList>
      <AddNewMaintenance />
    </StyledMaintenance>
  );
}
