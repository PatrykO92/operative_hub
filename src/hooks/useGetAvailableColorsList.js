import { useQuery } from "@tanstack/react-query";
import { getAllAvailableColorsList } from "../services/apiColorsList";

export default function useGetAvailableColorsList() {
  const {
    data: availableColors,
    isLoading: colorsLoading,
    error: colorsLoadingError,
  } = useQuery({
    queryKey: ["colors"],
    queryFn: getAllAvailableColorsList,
  });

  return { availableColors, colorsLoading, colorsLoadingError };
}
