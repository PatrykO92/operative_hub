import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getMaintenanceList } from "../../services/apiMaintenance";

export default function useGetMaintenanceList() {
  const { data: maintenance_list, isLoading: maintenanceLoading } = useQuery({
    queryKey: ["maintenance"],
    queryFn: getMaintenanceList,
    onError: (err) => toast.error(err.message),
  });

  return { maintenance_list, maintenanceLoading };
}
