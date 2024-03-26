import styled from "styled-components";
import Table from "../../ui/Table";
import supabase from "../../services/supabase";
import { useQuery } from "@tanstack/react-query";

const Cell = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

function MaintenanceRow({ entry, fullList }) {
  const { created_at, type, who, machine } = entry;

  //TO REFRACTOR

  // Fetch user's name based on machine ID
  const { data: machineData, isLoading: isMachineLoading } = useQuery({
    queryKey: ["machine", machine],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("full_name")
        .eq("id", machine)
        .single(); // Assuming there's only one user with the given machine ID
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

  return (
    <>
      <Table.Row>
        <Cell>{new Date(created_at).toLocaleDateString()}</Cell>
        <Cell>{type}</Cell>
        <Cell>{who}</Cell>
        {fullList && (
          <Cell>
            {isMachineLoading
              ? "Loading..."
              : machineData?.full_name || "Unknown"}
          </Cell>
        )}
      </Table.Row>
    </>
  );
}

export default MaintenanceRow;
