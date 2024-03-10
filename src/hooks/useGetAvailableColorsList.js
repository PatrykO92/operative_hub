import { useQuery } from "@tanstack/react-query";
import { getAllAvailableColorsList } from "../services/apiColorsList";
import toast from "react-hot-toast";

export default function useGetAvailableColorsList() {
  const { data: availableColors, isLoading: colorsLoading } = useQuery({
    queryKey: ["colors"],
    queryFn: getAllAvailableColorsList,
    onError: (err) => toast.error(err.message),
  });

  return { availableColors, colorsLoading };
}
