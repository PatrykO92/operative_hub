import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeOrderById } from "../../services/apiOrdersList";
import { useQueryClient } from "@tanstack/react-query";

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingOrder, mutate: deleteOrder } = useMutation({
    queryKey: ["orders"],
    mutationFn: removeOrderById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Bestellung erfolgreich gelöscht");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeletingOrder, deleteOrder };
}
