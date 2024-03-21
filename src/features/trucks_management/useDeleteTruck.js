import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { removeTruckById } from "../../services/apiTruckManagement";

export function useDeleteTruck() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingTruck, mutate: deleteTruck } = useMutation({
    queryKey: ["trucks"],
    mutationFn: removeTruckById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trucks"] });
      toast.success("LKW erfolgreich gelöscht");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeletingTruck, deleteTruck };
}
