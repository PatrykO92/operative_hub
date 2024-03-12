import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editOrderApi } from "../../services/apiOrdersList";
import toast from "react-hot-toast";

export function useEditOrder() {
  const queryClient = useQueryClient();
  const { mutate: editOrder, isPending: isEditing } = useMutation({
    mutationFn: editOrderApi,
    onSuccess: () => {
      toast.success("Bestellung erfolgreich bearbeitet");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editOrder, isEditing };
}
