import { useQuery } from "@tanstack/react-query";
import { getTrucksManagementList } from "../../services/apiTruckManagement";

export default function useGetTrucksList(refetch = false) {
  const {
    data: trucksList,
    isLoading: isLoadingTrucksList,
    error: loadingTrucksError,
  } = useQuery({
    queryKey: ["trucks"],
    queryFn: getTrucksManagementList,
    refetchInterval: refetch ? 5000 : false,
  });

  return { trucksList, isLoadingTrucksList, loadingTrucksError };
}
