import { useQuery } from "@tanstack/react-query";
import { getColorsList } from "../services/apiColorsList";
import toast from "react-hot-toast";

export default function useGetColors() {
  const { data: colors, isLoading: colorsLoading } = useQuery({
    queryKey: ["colors"],
    queryFn: getColorsList,
    onError: (err) => toast.error(err.message),
  });

  return { colors, colorsLoading };
}
