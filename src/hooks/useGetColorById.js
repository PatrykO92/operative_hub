import { useQuery } from "@tanstack/react-query";
import { getColorById } from "../services/apiColorsList";
import toast from "react-hot-toast";

export function useGetColorById(color_id) {
  const { isLoading: isLoadingColor, data: fetchedColor } = useQuery({
    queryKey: [color_id],
    queryFn: () => getColorById(color_id),
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoadingColor, fetchedColor };
}
