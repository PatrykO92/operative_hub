import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrderToList } from "../services/apiOrdersList";
import toast from "react-hot-toast";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { mutate: createOrder, isPending: isCreating } = useMutation({
    mutationFn: addOrderToList,
    onSuccess: () => {
      toast.success("Neue Bestellung erfolgreich hinzugefügt");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createOrder, isCreating };
}
