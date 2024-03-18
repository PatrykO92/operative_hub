import { useMutation } from "@tanstack/react-query";
import { updateMultipleOrders as updateMultipleOrdersApi } from "../services/apiOrdersList";
import toast from "react-hot-toast";

export default function useUpdateMultipleOrders() {
  const { mutate: updateMultipleOrders, isPending } = useMutation({
    mutationFn: (orders) => updateMultipleOrdersApi(orders),
    onSuccess: () => {
      toast.success("LKW-Ladeauftrag erfolgreich gespeichert");
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateMultipleOrders, isPending };
}
